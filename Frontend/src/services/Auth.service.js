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
        }
`
export {REGISTRO}
