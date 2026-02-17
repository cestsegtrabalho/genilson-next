import { Schema, model } from 'mongoose';

const historicoCursoSchema = new Schema({
    tituloCurso: { type: String, required: false},
    name: {type: String, required: false},
    email: {type: String, required: false},
    whatsapp: {type: String, required: false},
    cpf: {type: String, required: false},
}, {timestamps: true});

const historicoCursoModel = model('historicocursos', historicoCursoSchema);

export default historicoCursoModel; 