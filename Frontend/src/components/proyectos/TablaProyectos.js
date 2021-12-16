import React, { useState, useEffect } from 'react'
import '../../styles/estilos.css'
import { Fragment } from 'react/cjs/react.production.min';
import FilaTabla from './FilaTabla';
import {
    ApolloClient,
    InMemoryCache,
    gql, 
} from "@apollo/client";
import jwtDecode from "jwt-decode";

import notie from 'notie';
import 'notie/dist/notie.css';

function TablaProyectos() {

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
    // const httpLink = new HttpLink({
    //     uri: '/graphql'
    //   });

    //   const authLink = setContext((_, { headers }) => {
    //       console.log(headers);
    //     const token = localStorage.getItem('token');
    //     return {
    //       headers: {
    //         ...headers,
    //         authorization: token ? `Bearer ${token}` : "",
    //       }
    //     }
    //   });
    const client = new ApolloClient({
        uri: `${process.env.REACT_APP_API_URL}/graphql`,
        cache: new InMemoryCache()
    });    


    const QUERY_GETPROJECT = gql`
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
      }`;
    const UPDATE_PROJECT = gql`
      mutation UpdateProject($id: ID, $input: ProjectUpdate) {
        updateProject(_id: $id, input: $input) {
          _id
          nombre
          presupuesto
          fechaInicio
          fechaFin
          estado
          fase
        }
      }`;

      const CREATE_PROJECT = gql`
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
      }`;
    const [idProyectoEditar, setIdProyectoEditar] = useState("");

    function getDataEditar(val) {
        setIdProyectoEditar(val);
    }

    useEffect(() => {
        getProyecto();
    }, [idProyectoEditar]);

    const [nombre, setNombre] = useState("");
    const [presupuesto, setPresupuesto] = useState();
    const [fechaInicio, setFechaInicial] = useState("");
    const [fechaFin, setFechaFinal] = useState("");
    const [estado, setEstado] = useState("");
    const [fase, setFase] = useState("");
    const [tituloModal, setTituloModal] = useState("");
    const [editar, setEditar] = useState(false);

    const handleCerrar = e => {
        setIdProyectoEditar("");
        setFechaFinal("");
        setEstado("");
        setFase("");
        setNombre("");
        setPresupuesto("");
        setFechaInicial("");
    }

    const handleSubmit = e => {
        e.preventDefault();
        const proyecto = {
            nombre,
            presupuesto: Number(presupuesto),
            fechaInicio: fechaInicio == "" ? null : fechaInicio,
            fechaFin: fechaFin == "" ? null : fechaFin,
            estado,
            fase
        };
        proyecto["lider"] = localStorage.getItem("id");
        if (editar) {
            client.mutate({
                mutation: UPDATE_PROJECT,
                variables: {
                    id: idProyectoEditar,
                    input: proyecto
                }
            }).then(result => {
                document.querySelector('.closeModalProyecto').click();
                notie.alert({
                    type: 'success',
                    text: "Proyecto actualizado correctamente",
                });
                setTimeout(() => { window.location.href = "/proyectos" }, 1500);
            }).catch(error => {
                console.log(error);
            });
        }else{
            client.mutate({
                mutation: CREATE_PROJECT,
                variables: {
                    input: proyecto
                }
            }).then(result => {
                document.querySelector('.closeModalProyecto').click();
                notie.alert({
                    type: 'success',
                    text: "Proyecto ingresado correctamente",
                });
                setTimeout(() => { window.location.href = "/proyectos" }, 1500);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const getProyecto = async function () {
        setEditar(true);
        if (idProyectoEditar !== null && idProyectoEditar !== "") {
            setTituloModal("Actualizar proyecto");
            try {
                client
                    .query({
                        query: QUERY_GETPROJECT,
                        variables: { _id: idProyectoEditar }
                    })
                    .then(result => {
                        let proyecto = result.data.getProject;
                        setNombre(proyecto.nombre);
                        setPresupuesto(proyecto.presupuesto);
                        setFase(proyecto.fase);
                        setEstado(proyecto.estado);
                        if(proyecto.fechaInicio != null) {
                            let dateString = new Date(Number(proyecto.fechaInicio)).toISOString().split("T")[0];
                            setFechaInicial(dateString);
                        }
                        if(proyecto.fechaFin != null) {
                            let dateString2 = new Date(Number(proyecto.fechaFin)).toISOString().split("T")[0];
                            setFechaFinal(dateString2);
                        }
                    }).catch(e => console.log(e));
            } catch (error) {
                console.log(error);
            }
        } else {
            setTituloModal("Registrar proyecto");
            setEditar(false);
        }
    }

    let isDisabled = false;
    if (editar && (fechaInicio === "" || estado === "" || fase === "")) {
        isDisabled = true;
    } else if (!editar && (nombre == "" || presupuesto == "" || fechaInicio === "" || estado === "" || fase === "")) {
        isDisabled = true;
    }
    else {
        isDisabled = false;
    }
    return (
        <Fragment>
            <div className="col-xl-10 col-md-10">
                <h1 className="text-center mt-5 mb-5 pb-4">Gestión de Proyectos</h1>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-10">
                        <div className="row">
                            <div className="col-auto">
                                {
                                
                                (usuario.rol == "LIDER") ?                                 <button
                                className="btn btn-success mb-3"
                                data-bs-toggle="modal"
                                data-bs-target="#modalProyecto"
                            >
                                Crear Proyecto
                            </button> : ""
                                }

                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Presupuesto</th>
                                    <th scope="col">Lider</th>
                                    <th scope="col">F. Inicio</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Fase</th>
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
                id="modalProyecto"
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
                                    className="btn-close closeModalProyecto"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCerrar}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="mb-3">
                                            <label htmlFor="nombree" className="form-label">Nombre:</label>
                                            <input type="text" className="form-control" id="nombree"
                                                onChange={e => setNombre(e.target.value)}
                                                value={nombre} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3">
                                            <label htmlFor="presupuesto" className="form-label">Presupuesto:</label>
                                            <input type="number" className="form-control" id="presupuesto"
                                                onChange={e => setPresupuesto(e.target.value)}
                                                value={presupuesto} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="fechaInicio" className="form-label">Fecha inicio:</label>
                                            <input type="date" className="form-control" id="fechaInicio"
                                                onChange={e => setFechaInicial(e.target.value)}
                                                value={fechaInicio} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="fechaFin" className="form-label">Fecha fin:</label>
                                            <input type="date" className="form-control" id="fechaFin"
                                                onChange={e => setFechaFinal(e.target.value)}
                                                value={fechaFin} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="estado" className="form-label">Estado:</label>
                                            <select className="form-select" onChange={e => setEstado(e.target.value)}
                                                value={estado}>
                                                <option disabled selected value="">Seleccione</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="fase" className="form-label">Fase:</label>
                                            <select className="form-select" onChange={e => setFase(e.target.value)}
                                                value={fase}>
                                                <option disabled selected value="">Seleccione</option>
                                                <option value="Iniciado">Iniciado</option>
                                                <option value="En Desarrollo">En Desarrollo</option>
                                                <option value="Terminado">Terminado</option>
                                                <option value="Null">Null</option>
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

export default TablaProyectos