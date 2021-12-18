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

it('create user', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation($nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!, $rol: Enum_rol!, $password: String!) {
        crearUsuario(nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo, rol: $rol, password: $password) {
            correo
        }
      }
      `,
      variables: {
        nombre: 'test ciclo 4',
        apellido: 'test',
        identificacion: 'test',
        correo: 'testing@testing.com',
        rol: 'ADMINISTRADOR',
        password: 'test',
      },
    });
  
    assert.equal(result.data.crearUsuario.correo, 'testing@testing.com');
  });


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

  it('Consulta Usuario', async () => {
    const result = await server.executeOperation({
      query: gql`
        query Usuario($id: String!) {
            Usuario(_id: $id) {
            nombre
            identificacion
            correo
            }
        
        }
      `,
      variables: {
        id : "61bb7e68309a05653aa5b284"
      },
    });
  
    assert.equal(result.data.Usuario.nombre, 'Alejandro');
  });

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
  
    assert.notEqual(result.data.getAllProjects.length, 0);
  });

  it('Eliminar Usuario', async () => {
    const result = await server.executeOperation({
      query: gql`
        mutation Mutation($id: String!) {
          eliminarUsuario(_id: $id) {
            correo
          }
        }
      `,
      variables: {
        id : "61bd3aab427cc0b859f87f07"
      },
    });
  
    assert.equal(result.data.eliminarUsuario.correo, 'testing@testing.com');
  });
 
  it('Proyecto por id', async () => {
    const result = await server.executeOperation({
      query: gql`
      query GetProject($_id: ID) {
          getProject(_id: $_id) {
            _id
            nombre
            presupuesto
            fechaInicio
            fechaFin
            estado
            fase
          }
        }`,
        variables: {
          _id : "61bb7e01309a05653aa5b279"
        }
    });
  
    assert.equal(result.data.getProject.nombre, 'proyecto');
  });

it('Proyecto por lider', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Query($id: ID) {
        getProjectsByLider(_id: $id) {
          _id
          nombre
        }
      }`,
      variables: {
        id : "61bb7de9309a05653aa5b272"
      }
  });
  assert.equal(result.data.getProjectsByLider[0].nombre, 'proyecto');
});

it('Crear proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`
    mutation Mutation($input: ProjectInput) {
      createProject(input: $input) {
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        lider {
          _id
        }
      }
    }`,
    variables: {
      input: {
        nombre: "Proyecto test",
        presupuesto: 10000000,
        fechaInicio: "11/12/2021",
        estado: "Activo",
        fase: "Null",
        lider: "61bb7e68309a05653aa5b284"
      }
  }
  });
  assert.equal(result.data.createProject.nombre, 'Proyecto test');
});

it('Avance por id', async () => {
  const result = await server.executeOperation({
    query: gql`
    query GetAvance($id: ID) {
        getAvance(_id: $id) {
          _id
          fecha
          descripcion
          observaciones
          proyecto {
            _id
            nombre
          }
          creador {
            _id
            nombre
          }
        }
      }`,
      variables: {
        id : "61bbe6253b36e81648d7bda9"
      }
  });
  assert.equal(result.data.getAvance.descripcion, 'avance 002');
});