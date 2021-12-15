import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache()
});

const QUERY_GETALLPRODUCTS = gql`
query GetAllProjects {
    getAllProjects {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      lider {
        _id
        nombre
      }
      fase
      objetivos {
        descripcion
        tipo
      }
    }
  }`
  ;

export const getProyectoss = async function () {
    try {
        await client
        .query({
            query: QUERY_GETALLPRODUCTS
        })
        .then(result => {console.log(result.data);});
    } catch (error) {
        throw new Error(error);
    }
}
