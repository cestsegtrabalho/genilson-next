import { Schema, model } from 'mongoose'

const gabaritoSchema = new Schema({
    titulo: {
        type: String,
        required: false
    },
    conteudogabarito: {
        type: String,
        required: false
    },
}, {timestamps: true})

const gabaritoModel = model('gabarito', gabaritoSchema)

export default gabaritoModel