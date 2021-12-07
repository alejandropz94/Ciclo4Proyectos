import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { User } from '../usuario/usuario.js'
const ObjectId = Schema.ObjectId;

const projectSchema = Schema({
    id: ObjectId,
    nombre: {
        type: String,
        required: true
    },
    presupuesto: {
        type: Number,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Inactivo"
    },
    fase: {
        type: String,
        enum: ["Iniciado", "En Desarollo", "Terminado", "Null"],
        default: "Null"
    },
    lider: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    objetivos: [
        {
            descripcion: {
                type: String,
                required: true
            },
            tipo: {
                type: String,
                required: true,
                enum: ["General", "Especifico"]
            }
        },
    ]
});

const Project = model('Project', projectSchema);

export { Project };
