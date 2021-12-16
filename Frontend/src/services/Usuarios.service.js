import { gql } from "@apollo/client";

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: String!
    $password: String!
    $rol: String!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
      password: $password
      rol: $rol
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const ELIMINAR_USUARIO = gql`
  mutation Mutation($id: String!) {
    eliminarUsuario(_id: $id) {
      nombre
    }
  }
`

const GET_USUARIOS = gql`
    query Query {
        Usuarios {
        nombre
        apellido
        correo
        identificacion
        rol
        estado
        } 
    }
`;


export {GET_USUARIOS, GET_USUARIO, EDITAR_USUARIO, ELIMINAR_USUARIO}