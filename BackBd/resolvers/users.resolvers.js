import user from "../models/user";

export const resolvers = {
    Query: {
        Usuarios: async () =>{
            const users = await user.find();
            return users;
        },
        Usuario: async (parent, args) =>{
            const usuario = await user.findOne({_id: args._id})
            return Usuario;
        }
    },
    Mutation: {
        crearUsuario: async (parent, args) => {
            const newUsuario = await user.create({
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
           const usuarioEliminado =  await user.findByIdAndDelete({_id: args._id})
           return usuarioEliminado;
        },
        editarUsuario: async (parent, args) =>{
            const usuarioEditado = await user.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                estado: args.estado
            });
            return usuarioEditado;

        }
    }
}