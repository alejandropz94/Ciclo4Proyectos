import React, {Fragment, useEffect} from 'react'
import useFormData from '../../hooks/useFormData'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../styles/estilos.css'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USUARIO, EDITAR_USUARIO } from '../../services/Usuarios.service';
import {useNavigate} from 'react-router-dom'

const EditarUsuario = () => {

    const navigate = useNavigate();

    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();

    const { data: querydata, error: queryError,  loading: queryLoading} = useQuery(GET_USUARIO, {
        variables: { _id },
      });

      const [editarUsuario,{ data: mutationData, loading: mutationLoading, error: mutationError },
      ] = useMutation(EDITAR_USUARIO);

      const submitForm = (e) => {
        e.preventDefault();
        editarUsuario({
            variables: ({_id, ...formData}),
        });
      };

      useEffect(() => {
        if (mutationData) {
            navigate('/usuarios');
        }
      }, [mutationData]);

    //   useEffect(() => {
    //     if (mutationError) {
    //       toast.error('Error modificando el usuario');
    //     }
    
    //     if (queryError) {
    //       toast.error('Error consultando el usuario');
    //     }
    //   }, [queryError, mutationError]);

    if (queryLoading) return <div>Cargando....</div>;

    return (
        <Fragment>
            <main className="col-xl-10 col-md-10 ps-5">
                <h2 className="text-center mt-4 mb-4">EDICION DE USUARIOS</h2>
                <div className="row justify-content-md-center">

                        <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                            <div className= "row">
                                <div className="col-md-4 mb-3">
                                    <label for="nombre" className="form-label">Nombres</label>
                                    <input type="text"
                                    name="nombre"
                                    defaultValue={querydata.Usuario.nombre}
                                    required
                                    className="form-control" id="nombre"></input>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label for="apellido" className="form-label">Apellidos</label>
                                    <input type="text" 
                                    name="apellido"
                                    defaultValue={querydata.Usuario.apellido}
                                    required
                                    className="form-control" id="apellido" placeholder="Apellidos Completos"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label for="inputEmail" className="form-label">Email</label>
                                    <input type="email"
                                        name="correo"
                                        defaultValue={querydata.Usuario.correo}
                                        required
                                        className="form-control" id="inputEmail"></input>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="identificacion" className="form-label">Identificacion</label>
                                    <input type="text" className="form-control"
                                        name="identificacion"
                                        defaultValue={querydata.Usuario.identificacion}
                                        required
                                        id="identificacion">
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <label for="rol" className="form-label">Rol</label>
                                    <select id="rol" name="rol"
                                    defaultValue={querydata.Usuario.rol}
                                    required
                                    className="form-select">
                                        <option selected>ESTUDIANTE</option>
                                        <option>LIDER</option>
                                        <option>ADMINISTRADOR</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label for="inputPassword4" className="form-label">Password</label>
                                    <input type="password" 
                                    name="password"
                                    className="form-control" id="inputPassword4"></input>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="estado" className="form-label">Estado</label>
                                    <select id="rol" name="estado"
                                    defaultValue={querydata.Usuario.estado}
                                    required
                                    className="form-select">
                                        <option>PENDIENTE</option>
                                        <option>AUTORIZADO</option>
                                        <option>NO_AUTORIZADO</option>
                                    </select>
                                </div>
                               
                            </div>
                            <div className="col-12">
                                <button type="submit" 
                                className="btn btn-outline-success mx-1">Confirmar</button>
                                <Link to={"/usuarios"}
                                className="btn btn-outline-info">Regresar</Link>
                            </div>
                        </form>
                </div>

            </main>
        </Fragment>
        
    )
}

export default EditarUsuario



   

   

