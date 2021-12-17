import React, { useState, useEffect } from 'react'
import '../../styles/estilos.css'
import { Fragment } from 'react/cjs/react.production.min';
import FilaTabla from './FilaTabla';
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import jwtDecode from "jwt-decode";

import notie from 'notie';
import 'notie/dist/notie.css';

function TablaAvances() {

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

    const client = new ApolloClient({
        uri: `${process.env.REACT_APP_API_URL}/graphql`,
        cache: new InMemoryCache()
    });
    const [proyectos, setProyectos] = useState([]);
    
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

    const QUERY_GETAVANCE = gql`
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
      }`;


    const CREATE_ADVANCE = gql`
    mutation Mutation($input: AvanceInput) {
        crearAvance(input: $input) {
          _id
          fecha
          descripcion
          observaciones
          proyecto {
            _id
          }
          creador {
            _id
          }
        }
      }`;
    const [idAvanceEditar, setIdAvanceEditar] = useState("");

    function getDataEditar(val) {
        setIdAvanceEditar(val);
    }

    useEffect(() => {
        getAvance();
    }, [idAvanceEditar]);

    useEffect(() => {
        getProyectos();
    }, []);

    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState();
    const [observaciones, setObservaciones] = useState("");
    const [proyecto, setProyecto] = useState("");
    const [tituloModal, setTituloModal] = useState("");
    const [editar, setEditar] = useState(false);

    const handleCerrar = e => {
        setIdAvanceEditar("");
        setFecha("");
        setDescripcion("");
        setObservaciones("");
        setProyecto("");
    }

    const getProyectos = async function () {
        try {
            client
            .query({
                query: QUERY_GETALLPROJECTS
            })
            .then(result => {
                console.log(result);
                setProyectos(result.data.getAllProjects);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const avance = {
            fecha,
            descripcion,
            observaciones,
            proyecto
        };
        avance["creador"] = localStorage.getItem("id");
        if (!editar) {
            client.mutate({
                mutation: CREATE_ADVANCE,
                variables: {
                    input: avance
                }
            }).then(result => {
                document.querySelector('.closeModalAvance').click();
                notie.alert({
                    type: 'success',
                    text: "Avance ingresado correctamente",
                });
                setTimeout(() => { window.location.href = "/avances" }, 1500);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const getAvance = async function () {
        setEditar(true);
        if (idAvanceEditar !== null && idAvanceEditar !== "") {
            setTituloModal("Actualizar avance");
            try {
                client
                    .query({
                        query: QUERY_GETAVANCE,
                        variables: { id: idAvanceEditar }
                    })
                    .then(result => {
                        let avance = result.data.getAvance;
                        setDescripcion(avance.descripcion);
                        setObservaciones(avance.observaciones);
                        setProyecto(avance.proyecto.nombre);
                        if (avance.fecha != null) {
                            let dateString = new Date(Number(avance.fecha)).toISOString().split("T")[0];
                            setFecha(dateString);
                        }
                    }).catch(e => console.log(e));
            } catch (error) {
                console.log(error);
            }
        } else {
            setTituloModal("Registrar avance");
            setEditar(false);
        }
    }

    let isDisabled = false;
    return (
        <Fragment>
            <div className="col-xl-10 col-md-10">
                <h1 className="text-center mt-5 mb-5 pb-4">Gestión de Avances</h1>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-10">
                        <div className="row">
                            <div className="col-auto">
                                {
                                    (usuario.rol == "ESTUDIANTE") ?                                 <button
                                    className="btn btn-success mb-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalAvance"
                                >
                                    Crear Avance
                                </button> : ""
                                }

                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col">Proyecto</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <FilaTabla sendDataEditar={getDataEditar}></FilaTabla>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade"
                id="modalAvance"
                tabindex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="principalBody">
                            <div className="modal-header">
                                <h5 className="modal-title" id="tituloModal">{tituloModal}</h5>
                                <button
                                    type="button"
                                    className="btn-close closeModalAvance"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCerrar}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="mb-3">
                                            <label htmlFor="fecha" className="form-label">Fecha:</label>
                                            <input type="date" className="form-control" id="fecha"
                                                onChange={e => setFecha(e.target.value)}
                                                value={fecha} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="descripcion" className="form-label">Descripción:</label>
                                            <input type="text" className="form-control" id="descripcion"
                                                onChange={e => setDescripcion(e.target.value)}
                                                value={descripcion} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="observaciones" className="form-label">Observaciones:</label>
                                            <input type="text" className="form-control" id="observaciones"
                                                onChange={e => setObservaciones(e.target.value)}
                                                value={observaciones} />
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col">
                                            <label htmlFor="proyecto" className="form-label">Proyecto:</label>
                                            <select className="form-select" onChange={e => setProyecto(e.target.value)}
                                                value={proyecto}>
                                                <option disabled selected value="">Seleccione</option>
                                                {
                                                proyectos.map((proyecto,index )=> (
                                                    <option value={proyecto._id}>{proyecto.nombre}</option>
                                                ))
                                            }    
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCerrar} data-bs-dismiss="modal">Cerrar</button>
                                    <input type="submit" className="btn btn-primary" disabled={isDisabled} value="Guardar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TablaAvances