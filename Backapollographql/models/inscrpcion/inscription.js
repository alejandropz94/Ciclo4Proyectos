const { Schema, model } = require('mongoose');
const project = require('./project');
const user = require('./user');

const inscriptionSchema = Schema({
    estado:{
        type:String,
        enum:["Aceptado","Rechazado"],
        required:true
    },
    fechaIngreso:{
        type:Date,
        required:true
    },
    fechaEgreso:{
        type:Date,
        required:true
    },
    proyecto:{
        type:Schema.Types.ObjectId,
        ref:project,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: user,
        required:true
    }
})

module.exports = model("inscription", inscriptionSchema);