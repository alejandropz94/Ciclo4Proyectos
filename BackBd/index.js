const { dbConnection } = require('./bd/db');
const project = require('./models/project');
const user = require('./models/user');

const crearProyecto = async () =>{

    const proyecto = await project.create({
        nombre: "Proyecto1",
        presupuesto:"1200000",
        fechaInicio: Date.now(),
        fechaFin: new Date('2022/02/10'),
        lider: '6199894b64c2d5ce785eb570',
        objetivos:[
            {descripcion:"Este es un objetivo General", tipo:"General"},
            {descripcion:"Este es un objetivo Especifico 1", tipo:"Especifico"},
            {descripcion:"Este es un objetivo Especifico 2", tipo:"Especifico"}
        ]
    })
}

const main = async () =>{
    
    await dbConnection();
    //await crearProyecto();

    const buscarProyecto = await project.find({id: "619b2e647bf78476fddb76cc"}).populate("lider");
    console.log('PROYECTO',JSON.stringify(buscarProyecto));
    // await project.create({
    //     nombre: "Proyecto1",
    //     presupuesto:"1200000",
    //     fechaInicio: Date.now(),
    //     fechaFin: new Date('2022/02/10'),
    //     lider: '6199894b64c2d5ce785eb570'
    // })
    // .then((p) =>{
    //     console.log('Proyecto Creado', p);
    // })
    // .catch((e)=>{
    //     console.log('Error en la creacion del proyecto', e);
    // })

    //Consultar Proyecto
    // const proyecto = await project.find({nombre: 'Proyecto1'}).populate('lider');
    // console.log("Proyecto", proyecto);

    

}

main();

/* ===== User ====== */

//CREAR UN USUARIO
    // await user.create({
    //     correo:"prueba@gmail.com",
    //     identificacion:"789654",
    //     nombre:"otro",
    //     apellido:"apellido otro",
    //     rol:"Lider"
    // })
    // .then((u) => {
    //     console.log('usuario Creado', u);
    // })
    // .catch((e)=>{
    //     console.log('Error al crear usuario', e);

    // })
    //OBENER USUARIO
    // await user.find({rol:"Lider"})
    // .then((u) => {
    //     console.log('Usuarios', u);
    // })
    // .catch((e) => {
    //     console.log('Error al obtener usuario', e);
    // })

    //Actualizar Usuario
    // await user.findOneAndUpdate({identificacion:'12345'},
    // {
    //     nombre:'Nuevo Nombre',
    //     apellido:'Nuevo Apellido',
    //     rol:'Administrador'
    // })
    // .then((u)=>{
    //     console.log("Usuario Actualizado", u);
    // })
    // .catch((e)=>{
    //     console.log("Error al actualizar", e);
    // })

    //Eliminar Usuario
    // await user.findByIdAndDelete({identificacion:'12345'})
    // .then((u)=>{
    //     console.log("Usuario Eliminado", u);
    // })
    // .catch((e)=>{
    //     console.log("Error al eliminar", e);
    // })