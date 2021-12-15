import React, { useEffect, useState} from 'react'
import '../../styles/estilos.css'
import { Fragment } from 'react/cjs/react.production.min';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {Link} from 'react-router-dom'
import { ELIMINAR_USUARIO } from '../../services/Usuarios.service';
import { useMutation } from '@apollo/client'
import {useNavigate} from 'react-router-dom'

function ListUsuarios() {

    const navigate = useNavigate();
    const [eliminarUsuario, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(ELIMINAR_USUARIO);

    const eliminar = (e) =>{
        let id = e.target.getAttribute("_id");
        eliminarUsuario({
            variables: {id},
        });
    }

    useEffect(() => {
        navigate("/usuarios")
      }, [eliminarUsuario]);


    const client = new ApolloClient({
        uri: `${process.env.REACT_APP_API_URL}/graphql`,
        cache: new InMemoryCache()
    });
    const GET_USUARIOS = gql`
    query Query {
        Usuarios {
        _id
        nombre
        apellido
        correo
        identificacion
        rol
        estado
        } 
    }
`;
    useEffect(() => {
        getUsuarios();
    }, []);

    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async function () {
        try {
            client
                .query({
                    query: GET_USUARIOS
                })
                .then(result => {
                    setUsuarios(result.data.Usuarios)
                });
        } catch (error) {
            console.log(error);
        }
    }    
    return (
        <Fragment>
            <div className="col-xl-10 col-md-10">
                <h1 className="text-center mt-5 mb-5 pb-4">Gestión Usuarios</h1>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-10">
                        <div className="row">
                            <div className="col-4 mb-4">
                                <input type="text" class="form-control" id="campoBuscar" placeholder="Buscar usuario"
                                />
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Identificacion</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Estado</th>
                                    <th scope="colgroup">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {usuarios.map((u, index) => {
                                    return (
                                        <tr key={u._id}>
                                        <td>{index}</td>
                                        <td>{u.nombre}</td>
                                        <td>{u.apellido}</td>
                                        <td>{u.correo}</td>
                                        <td>{u.identificacion}</td>
                                        <td>{u.rol}</td>
                                        <td>{u.estado}</td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <Link to={`/usuarios/editar/${u._id}`}>
                                                    <svg _id={u._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mx-1" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg>
                                                </Link>

                                                <span _id={u._id} className="btn btn" onClick={eliminar}>

                                                    <svg _id={u._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>

                                                </span>

                                                {/* <Link onClick={() => eliminar(u._id)}>
                                                    <svg _id={u._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mx-1" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg>
                                                </Link> */}

                                            </div>
                                        </td>
                                        <td>
                                        </td>
                                        </tr>
                                    );
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListUsuarios