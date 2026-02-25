import { NextRequest, NextResponse } from "next/server";

type StatusType =
  | "UP"
  | "DOWN"
  | "TIMEOUT"
  | "DNS_ERROR"
  | "HTTP_ERROR";

type CheckResponse = {
  domain: string;
  status: StatusType;
  statusCode?: number;
  responseTime?: number;
  error?: string;
};

function normalizeUrl(domain: string): string {
  if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
    return `https://${domain}`;
  }
  return domain;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain, expectedStatus = 200 } = body;

    if (!domain) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      );
    }

    const url = normalizeUrl(domain);
    const start = Date.now();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(url, {
        method: "HEAD", // mais leve que GET
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const responseTime = Date.now() - start;

      // ✅ Se respondeu qualquer coisa, servidor está online
      if (response.status >= 100) {
        return NextResponse.json({
          domain,
          status:
            response.status === expectedStatus
              ? "UP"
              : "HTTP_ERROR",
          statusCode: response.status,
          responseTime,
        } satisfies CheckResponse);
      }

      return NextResponse.json({
        domain,
        status: "DOWN",
      } satisfies CheckResponse);
    } catch (error: unknown) {
      clearTimeout(timeout);

      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json({
          domain,
          status: "TIMEOUT",
          error: "Request timed out",
        } satisfies CheckResponse);
      }

      if (error instanceof Error && (error.cause as { code?: string })?.code === "ENOTFOUND") {
        return NextResponse.json({
          domain,
          status: "DNS_ERROR",
          error: "DNS not found",
        } satisfies CheckResponse);
      }

      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json({
        domain,
        status: "DOWN",
        error: errorMessage,
      } satisfies CheckResponse);
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}