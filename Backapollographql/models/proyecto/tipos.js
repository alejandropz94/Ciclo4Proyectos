import { gql } from "apollo-server-express";

const tiposProyecto = gql`
    type Query {
        getAllProjects: [Project],
        getProjectsByLider(_id: ID): [Project]
        getProject(_id: ID): Project

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

    input ProjectUpdate {
        nombre: String
        presupuesto: Int
        fechaInicio: String
        fechaFin: String
        estado: String
        fase: String
        lider: ID
        objetivos: [ObjetivoInput]

    }

    type Mutation {
        createProject(input: ProjectInput): Project
        deleteProject(_id: ID): Project
        updateProject(_id: ID, input: ProjectUpdate): Project
    }
`;

export { tiposProyecto };