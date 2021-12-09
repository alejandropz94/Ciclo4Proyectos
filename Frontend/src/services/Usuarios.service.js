import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache()
});


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

// export const listUsuarios = async function () {
//     try {
//         await client
//         .query({
//             query: GET_USUARIOS
//         })
//         .then(result => {console.log(result.data);});
//     } catch (error) {
//         throw new Error(error);
//     }
// }

export {GET_USUARIOS}