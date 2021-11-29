const { Schema, model } = require('mongoose');
const project = require('./project');
const user = require('./user');

const advanceSchema = Schema({
    fecha:{
        type:Date,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    observaciones:[
        {
            type:String
        },
    ],
    proyecto:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:project
    },
    creador:{
        type:Schema.Types.ObjectId,
        ref:user,
        required:true
    }
})

module.exports = model('Advance', advanceSchema);
