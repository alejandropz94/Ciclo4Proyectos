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
        enum:["Estudiante","Lider","Administrador"]
    },
    estado:{
        type:String,
        default:"Pendiente",
        enum:["Pendiente","Autorizado","No Autorizado"]
    }
})

module.exports = model('User', userSchema);