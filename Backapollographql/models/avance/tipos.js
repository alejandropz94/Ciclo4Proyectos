import { gql } from "apollo-server-express";

const tiposAvance = gql`
    type Query {
        getAllAvances: [Avance]
    }

    type Usuario {
        _id: ID
        identificacion: String
        nombre: String
        apellido: String
        correo: String       
        estado: Enum_estadoUsuario
        rol: Enum_rol
      }

    type Objetivo {
        descripcion: String
        tipo: String
    }      

    type Project {
        _id: ID
        nombre: String!
        presupuesto: Int!
        fechaInicio: String!
        fechaFin: String
        estado: String
        fase: String
        lider: Usuario
        objetivos: [Objetivo]
    }

    type Avance {
        _id: ID
        fecha: String!
        descripcion: String!
        observaciones: [String]
        proyecto: Project
        creador: Usuario
    }

    input AvanceInput {
        fecha: String!
        descripcion: String!
        observaciones: [String]
        proyecto: ID
        creador: ID
    }

    type Mutation {
        crearAvance(input: AvanceInput): Avance
        borrarAvance(_id: ID): Avance
        actualizarAvance(_id: ID, input: AvanceInput): Avance
    }
`;

export { tiposAvance };