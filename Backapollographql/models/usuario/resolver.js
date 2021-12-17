import {User} from "./usuario.js";
import bcrypt from "bcrypt"
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
                rol: args.rol,
                password: args.password
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
            const salt = await bcrypt.genSalt(10);
            const passw = await bcrypt.hash(args.password, salt);
            
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
            
            return usuarioEditado;
        }
    }

}
 export {resolverUsuario};