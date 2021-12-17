import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { gql } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';
import dbConnection from './bd/db.js';
import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();
await dbConnection();

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
});

// it('create user', async () => {
//     const result = await server.executeOperation({
//       query: gql`
//       mutation Mutation($nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!, $rol: Enum_rol!, $password: String!) {
//         crearUsuario(nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo, rol: $rol, password: $password) {
//             correo
//         }
//       }
//       `,
//       variables: {
//         nombre: 'test ciclo 4',
//         apellido: 'test',
//         identificacion: 'test',
//         correo: 'testing@testing.com',
//         rol: 'ADMINISTRADOR',
//         password: 'test',
//       },
//     });
  
//     assert.equal(result.data.crearUsuario.correo, 'testing@testing.com');
//   });


  it('Consultar Usuarios', async () => {
    const result = await server.executeOperation({
      query: gql`
        query Query {
        Usuarios {
            nombre
            apellido
            correo
            identificacion
        } 
       }
      `,
    });
  
    assert.equal(result.data.Usuarios.length, 4);
  
    assert.equal(result.data.Usuarios[0].nombre, 'Luis');
  });

//   it('Consulta Usuario', async () => {
//     const result = await server.executeOperation({
//       query: gql`
//         query Usuario($id: String!) {
//             Usuario(_id: $id) {
//             nombre
//             identificacion
//             correo
//             }
//         }
//       `,
//       variables: {
//         id: {
//             id : "61bb7e68309a05653aa5b284"
//         },
//       },
//     });
  
//     assert.equal(result.data.Usuario.nombre, 'Alejandro');
//   });

it('Consultar Proyectos', async () => {
    const result = await server.executeOperation({
      query: gql`
        query GetAllProjects {
            getAllProjects {
            nombre
            presupuesto
            _id
            }
        }
      `,
    });
  
    assert.equal(result.data.getAllProjects[0].nombre, 'proyecto');
  });


