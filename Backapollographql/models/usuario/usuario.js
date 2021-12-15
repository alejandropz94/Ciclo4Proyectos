import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = Schema({
    correo:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
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
},
    {   
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
     }
);

userSchema.virtual('proyectosLiderados', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'lider',
  });

const User = model('User', userSchema);

export { User };



