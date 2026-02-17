import { Schema, model } from 'mongoose';

const historicoProvaSchema = new Schema({
    tituloProva: { type: String, required: false},
    name: {type: String, required: false},
    email: {type: String, required: false},
    whatsapp: {type: String, required: false},
    cpf: {type: String, required: false},
}, {timestamps: true});

const historicoProvaModel = model('historicoprovas', historicoProvaSchema);

export default historicoProvaModel;