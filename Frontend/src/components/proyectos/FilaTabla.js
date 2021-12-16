import React, { useEffect, useState } from 'react'
import '../../styles/estilos.css'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import jwtDecode from "jwt-decode";

function FilaTabla(props) {
    const client = new ApolloClient({
        uri: `${process.env.REACT_APP_API_URL}/graphql`,
        cache: new InMemoryCache()
    });

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const usuario = {
      _id: decoded._id,
      nombre: decoded.nombre,
      apellido: decoded.apellido,
      identificacion: decoded.identificacion,
      correo: decoded.correo,
      rol: decoded.rol,
    };

    const QUERY_GETALLPROJECTS = gql`
    query Query {
        getAllProjects {
          _id
          nombre
          presupuesto
          fechaInicio
          fechaFin
          estado
          fase
          lider {
            _id
            nombre
            apellido
          }
          objetivos {
            descripcion
            tipo
          }
        }
      }`;    
    
    const QUERY_GETPROJECTSBYLIDER = gql`
    query Query($id: ID) {
        getProjectsByLider(_id: $id) {
          _id
          nombre
          presupuesto
          fechaInicio
          fechaFin
          estado
          fase
          objetivos {
            descripcion
            tipo
          }
          lider {
            _id
            nombre
            apellido
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
            if(usuario.rol == "LIDER") {
                client
                .query({
                    query: QUERY_GETPROJECTSBYLIDER,
                    variables: { id: localStorage.getItem("id")}
                })
                .then(result => {
                    console.log(result);
                    setProyectos(result.data.getProjectsByLider);
                });
            }else if (usuario.rol == "ADMINISTRADOR" || usuario.rol == "ESTUDIANTE") {
                client
                .query({
                    query: QUERY_GETALLPROJECTS
                })
                .then(result => {
                    console.log(result);
                    setProyectos(result.data.getAllProjects);
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
    const {id, sendDataEditar} = props;
    const handleEditar = e => {
        let id = e.target.getAttribute("_id");
        sendDataEditar(id);
    }
    return (
        proyectos.map((proyecto, index) => (
            <tr key={proyecto._id}>
                <td>{proyecto._id}</td>
                <td>{proyecto.nombre}</td>
                <td>{proyecto.presupuesto}</td>
                <td>{proyecto.lider.nombre} {proyecto.lider.apellido}</td>
                <td>{new Date(Number(proyecto.fechaInicio)).toLocaleDateString("en-US")}</td>
                <td>{proyecto.estado}</td>
                <td>{proyecto.fase}</td>
                <td>
                    <div className="btn-group btn-group-sm">
                        <span _id={proyecto._id} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProyecto" onClick={handleEditar}>
                            <svg _id={proyecto._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16" onClick={handleEditar}>
                                <path _id={proyecto._id} d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </span>
                    </div>

                </td>
            </tr>
        ))
    );
}

export default FilaTabla
