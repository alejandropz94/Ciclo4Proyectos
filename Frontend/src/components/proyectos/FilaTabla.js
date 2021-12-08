import React, { useEffect, useState } from 'react'
import '../../styles/estilos.css'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

function FilaTabla(props) {
    const client = new ApolloClient({
        uri: `${process.env.REACT_APP_API_URL}/graphql`,
        cache: new InMemoryCache()
    });
    const QUERY_GETALLPROJECTS = gql`
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

    useEffect(() => {
        getProyectos();
    }, []);

    const [proyectos, setProyectos] = useState([]);

    const getProyectos = async function () {
        try {
            client
                .query({
                    query: QUERY_GETALLPROJECTS
                })
                .then(result => {
                    setProyectos(result.data.getAllProjects)
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        proyectos.map((proyecto, index) => (
            <tr key={proyecto._id}>
                <td>{proyecto._id}</td>
                <td>{proyecto.nombre}</td>
                <td>{proyecto.presupuesto}</td>
                <td>{proyecto.lider.nombre}</td>
                <td>{proyecto.fechaInicio}</td>
                <td>{proyecto.estado}</td>
                <td>{proyecto.fase}</td>
            </tr>
        ))
    );
}

export default FilaTabla
