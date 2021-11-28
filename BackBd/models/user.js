const { Schema, model } = require('mongoose');

const userSchema = Schema({
    correo:{
        type: String,
        required: true,
        unique:true
    },
    identificacion:{
        type:String,
        required: true,
        unique:true
    },
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true,
        enum:["ESTUDIANTE","LIDER","ADMINISTRADOR"]
    },
    estado:{
        type:String,
        default:"PENDIENTE",
        enum:["PENDIENTE","AUTORIZADO","NO_AUTORIZADO"]
    }
})

module.exports = model('User', userSchema);