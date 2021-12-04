import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Query {
        getAllProjects: [Project]
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

    input ObjetivoInput {
        descripcion: String
        tipo: String
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

    input ProjectInput {
        nombre: String!
        presupuesto: Int!
        fechaInicio: String!
        fechaFin: String
        estado: String
        fase: String
        lider: ID
        objetivos: [ObjetivoInput]

    }

    type Mutation {
        createProject(input: ProjectInput): Project
        deleteProject(_id: ID): Project
        updateProject(_id: ID, input: ProjectInput): Project
    }
`;

export {typeDefs};