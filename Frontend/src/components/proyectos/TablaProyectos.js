import React from 'react'
import '../../styles/estilos.css'
import { Fragment } from 'react/cjs/react.production.min';
import FilaTabla from './FilaTabla';
function TablaProyectos() {
    return (
        <Fragment>
            <div className="col-xl-10 col-md-10">
                <h1 className="text-center mt-5 mb-5 pb-4">Gestión de Proyectos</h1>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-10">
                        <div className="row">
                            <div className="col-auto">
                                <button
                                    className="btn btn-success mb-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalProducto"
                                >
                                    Crear Proyecto
                                </button>
                            </div>
                            <div class="col-4 offset-md-5 offset-lg-5">
                                <input type="text" class="form-control" id="campoBuscar" placeholder="Buscar proyecto"
                                />
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
                                </tr>
                            </thead>
                            <tbody>
                                <FilaTabla></FilaTabla>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TablaProyectos