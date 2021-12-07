import { gql } from "apollo-server-express";

const tiposInscripcion = gql`
    type Query {
        getAllInscripciones: [Inscripcion]
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

    type Inscripcion {
        _id: ID
        estado: String!
        fechaIngreso: String
        fechaEgreso: String
        proyecto: Project
        usuario: Usuario
    }

    input InscripcionInput {
        estado: String!
        fechaIngreso: String
        fechaEgreso: String
        proyecto: ID
        usuario: ID
    }

    input InscripcionUpdate {
        estado: String
        fechaIngreso: String
        fechaEgreso: String
        proyecto: ID
        usuario: ID
    }    

    type Mutation {
        crearInscripcion(input: InscripcionInput): Inscripcion
        borrarInscripcion(_id: ID): Inscripcion
        actualizarInscripcion(_id: ID, input: InscripcionUpdate): Inscripcion
    }
`;

export { tiposInscripcion };