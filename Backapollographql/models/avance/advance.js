import mongoose from 'mongoose';
import { Project } from '../proyecto/proyecto.js';
import { User } from '../usuario/usuario.js';
const { Schema, model } = mongoose;
const ObjectId = Schema.ObjectId;

const advanceSchema = Schema({
    id: ObjectId,
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    observaciones: [
        {
            type: String
        },
    ],
    proyecto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Project
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
})

const Advance = model('Advance', advanceSchema);

export { Advance };
