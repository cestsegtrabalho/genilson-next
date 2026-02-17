// Connecting MongoDB With Mongoose

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Connecting MongoDB to Mongoose
const connectMongoDBWithMongoose = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cestseg.ri4nmuc.mongodb.net/?retryWrites=true&w=majority&appName=CestSeg"`, {
    }).then(() => {
        console.log('Conectado ao MongoDB')
    }).catch((error) => {
        console.log('Erro ao conectar ao MongoDB ' + error)
    })
    
}

export default connectMongoDBWithMongoose;