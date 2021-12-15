import {gql} from '@apollo/client'

const REGISTRO = gql`
    mutation Registro(
            $nombre: String!,
            $apellido: String!,
            $identificacion: String!, 
            $correo: String!,
            $rol: Enum_rol!,
            $password: String!
        ){
        registro(
            nombre: $nombre,
            apellido: $apellido,
            identificacion: $identificacion,
            correo: $correo, 
            rol: $rol, 
            password: $password
            ){
                token,
                id
            }
        }`;

const LOGIN = gql`
mutation Mutation($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
    }
  }

`
export {REGISTRO, LOGIN}
