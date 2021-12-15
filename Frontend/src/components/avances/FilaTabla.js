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

    const QUERY_GETAVANCEBYLIDER = gql`
    query Query($id: ID) {
        getAvanceByCreador(_id: $id) {
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
            apellido
          }
        }
      }`
        ;

    useEffect(() => {
        getAvances();
    }, []);

    const [avances, setAvances] = useState([]);

    const getAvances = async function () {
        try {
            client
                .query({
                    query: QUERY_GETAVANCEBYLIDER,
                    variables: { id: localStorage.getItem("id") }
                })
                .then(result => {
                    console.log(result);
                    setAvances(result.data.getAvanceByCreador);
                });
        } catch (error) {
            console.log(error);
        }
    }
    const { id, sendDataEditar } = props;
    const handleEditar = e => {
        let id = e.target.getAttribute("_id");
        sendDataEditar(id);
    }
    return (
        avances.map((avance, index) => (
            <tr key={avance._id}>
                <td>{avance._id}</td>
                <td>{new Date(Number(avance.fecha)).toLocaleDateString("en-US")}</td>
                <td>{avance.descripcion}</td>
                <td>{avance.observaciones}</td>
                <td>{avance.proyecto.nombre}</td>
                <td>
                    <div className="btn-group btn-group-sm">
                        <span _id={avance._id} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalAvance" onClick={handleEditar}>
                            <svg _id={avance._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16" onClick={handleEditar}>
                                <path _id={avance._id} d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </span>
                    </div>

                </td>
            </tr>
        ))
    );
}

export default FilaTabla
