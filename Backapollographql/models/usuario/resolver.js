import {User} from "./usuario.js";

const resolverUsuario = {


    Query:{
        Usuarios: async () =>{
            const users = await User.find();
            return users;
        },
        Usuario: async (parent, args) =>{
            const usuario = await User.findOne({_id: args._id})
            return usuario;
        }
    },
    Mutation: {
        crearUsuario: async (parent, args) => {
            const newUsuario = await User.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol
            });

            if(Object.keys(args).includes('estado')){
                newUsuario.estado = args.estado;
            }

            return newUsuario;
        },
        eliminarUsuario: async (parent, args) =>{
           const usuarioEliminado =  await User.findByIdAndDelete({_id: args._id})
           return usuarioEliminado;
        },
        editarUsuario: async (parent, args) =>{
            const usuarioEditado = await User.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                estado: args.estado,
                password: passw
            },
            { new: true }
            );
            console.log(usuarioEditado)
            return usuarioEditado;
        }
    }

}
 export {resolverUsuario};