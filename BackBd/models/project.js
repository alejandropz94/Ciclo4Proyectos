const { Schema, model } = require('mongoose');
const user = require('./user');

const projectSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    presupuesto:{
        type:Number,
        required: true
    },
    fechaInicio:{
        type:Date,
        required: true
    },
    fechaFin:{
        type:Date,
        required: true
    },
    estado:{
        type:String,
        enum:["Activo","Inactivo"],
        default:"Inactivo"
    },
    fase:{
        type:String,
        enum:["Iniciado","En Desarollo","Terminado", "Null"],
        default:"Null"
    },
    lider:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:user
    },
    objetivos:[
        {
            descripcion:{
                type:String,
                required:true
            },
            tipo:{
                type:String,
                required:true,
                enum:["General","Especifico"]
            }
        },
    ]
})

module.exports = model('Project', projectSchema);