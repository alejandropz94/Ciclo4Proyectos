import { User } from "../../models/usuario/usuario.js"
import bcrypt from "bcrypt"
import { createToken } from "../../helpers/tokenHeper.js";

const resolversAutenticacion = {
    Mutation: {
        registro: async(parent, args) => {
            const salt = await bcrypt.genSalt(10);
            const passw = await bcrypt.hash(args.password, salt);

            const usuarioCreado = await User.create({
                nombre:args.nombre,
                apellido:args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                password: passw
            });
            console.log("Usuario Creado", usuarioCreado);
            return {
                token: createToken({
                    _id: usuarioCreado._id,
                    nombre:usuarioCreado.nombre,
                    apellido:usuarioCreado.apellido,
                    identificacion: usuarioCreado.identificacion,
                    correo: usuarioCreado.correo,
                    rol: usuarioCreado.rol,
                }),
                id: usuarioCreado._id
            }
        },
    },
}


export {resolversAutenticacion}