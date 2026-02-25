import { NextResponse } from "next/server"
import os from "os"
import si from "systeminformation"

/**
 * GET /api/server-info
 * Returns system information about the current server.
 */
export async function GET(): Promise<NextResponse> {
  try {
    /**
     * Get CPU information
     */
    const cpu = await si.cpu()

    /**
     * Get current CPU usage percentage
     */
    const cpuLoad = await si.currentLoad()

    /**
     * Get memory information
     */
    const memory = await si.mem()

    /**
     * Get disk information
     */
    const disks = await si.fsSize()

    /**
     * Build response object
     */
    const response = {
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores,
        speed: cpu.speed,
        currentLoad: cpuLoad.currentLoad
      },
      memory: {
        total: memory.total,
        free: memory.free,
        used: memory.used,
        active: memory.active
      },
      disk: disks.map((disk) => ({
        fs: disk.fs,
        type: disk.type,
        size: disk.size,
        used: disk.used,
        available: disk.available,
        use: disk.use
      })),
      os: {
        platform: os.platform(),
        arch: os.arch(),
        uptime: os.uptime(),
        hostname: os.hostname()
      }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error: unknown) {
    /**
     * Proper error handling without using "any"
     */
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Unknown server error" },
      { status: 500 }
    )
  }
}