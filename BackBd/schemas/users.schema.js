import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "../resolvers/users.resolvers";

const typeDefs = `

    enum Enum_estadoUsuario{
        PENDIENTE
        AUTORIZADO
        NO_AUTORIZADO
    }

    enum Enum_rol{
        ESTUDIANTE
        LIDER
        ADMINISTRADOR
    }

    type Usuario {
        _id: ID!
        nombre: String!
        apellido: String!
        identificacion: String!
        correo: String!
        rol: Enum_rol!
        estado: Enum_estadoUsuario
    }

    type Query{
        Usuarios: [Usuario]
        Usuario(_id:String!): Usuario
    }

    type Mutation{
        createUser(
            nombre: String!
            apellido: String!
            identificacion: String!
            correo: String!
            rol: Enum_rol!
            estado: Enum_estadoUsuario
        ):Usuario

        eliminarUsuario(_id:String!):Usuario

        editarUsuario(
            _id: String!
            nombre: String!
            apellido: String!
            identificacion: String!
            correo: String!
            rol: Enum_rol!
            estado: Enum_estadoUsuario
        ):Usuario
    }


`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});