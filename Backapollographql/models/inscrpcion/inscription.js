import mongoose from 'mongoose';
import { Project } from '../proyecto/proyecto.js';
import { User } from '../usuario/usuario.js';
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const inscriptionSchema = Schema({
    id: ObjectId,
    estado: {
        type: String,
        enum: ["Aceptado", "Rechazado"],
        required: true
    },
    fechaIngreso: {
        type: Date,
    },
    fechaEgreso: {
        type: Date
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: Project,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
})


const Inscription = model('Inscription', inscriptionSchema);

export { Inscription };
