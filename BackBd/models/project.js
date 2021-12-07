import { Schema, model } from 'mongoose';
import user from './user';
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
        ref: user
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

export default model('Project', projectSchema);