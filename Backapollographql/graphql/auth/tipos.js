import {gql} from 'apollo-server-express'

const tiposAutenticacion = gql`

type Token{
    token:String
    id:String
}

type Mutation{
    registro(
        nombre: String!
        apellido: String!
        identificacion: String!
        correo: String!
        rol: Enum_rol!
        estado: Enum_estadoUsuario
        password: String!
    ): Token!

    login(
        correo: String!
        password: String!
    ): Token!

    validateToken(
        token:String!
    ):Token!
}
`;

export{ tiposAutenticacion}