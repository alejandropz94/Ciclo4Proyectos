import React, { useEffect, useState} from 'react'
import '../../styles/estilos.css'
import { Fragment } from 'react/cjs/react.production.min';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

function ListUsuarios() {
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
                                        {/* <td>
                                            <Link to={`/usuarios/editar/${u._id}`}>
                                            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                                            </Link>
                                        </td> */}
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