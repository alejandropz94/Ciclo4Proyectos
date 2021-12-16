import React, { Fragment, useEffect } from 'react'
import '../../styles/estilos.css'
import useFormData from '../../hooks/useFormData'
import { useMutation } from '@apollo/client'
import { REGISTRO } from '../../services/Auth.service'
import {useNavigate} from 'react-router-dom'

import notie from 'notie';
import 'notie/dist/notie.css';

const Register = () => {

    const navigate = useNavigate();

    const { form, formData, updateFormData } = useFormData();

    const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REGISTRO);

    const submitForm = (e) => {
        e.preventDefault();
        registro({ variables: formData });
      };

    useEffect(()=>{
        console.log('Data Mutation', dataMutation);
        if(dataMutation){
            if(dataMutation.registro.token){
                notie.alert({
                    type: 'success',
                    text: "Registrado correctamente",
                });
                localStorage.setItem("token", dataMutation.registro.token);
                setTimeout(() => { window.location.href = "/auth/login" }, 1000);
            }
        }
    },[dataMutation])

    return (
        <Fragment>
            <main className="container contregister">
                <h2 className="text-center mt-4 mb-4">REGISTRO DE USUARIOS</h2>
                <div className="lreg">
                        <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                            <div className= "row">
                                <div className="col-md-4 mb-3">
                                    <label for="nombre" className="form-label">Nombres</label>
                                    <input type="text"
                                    name='nombre'
                                    className="form-control" id="nombre" placeholder="Nombre Completo"></input>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label for="apellido" className="form-label">Apellidos</label>
                                    <input type="text" 
                                    name="apellido"
                                    className="form-control" id="apellido" placeholder="Apellidos Completos"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label for="inputEmail" className="form-label">Email</label>
                                    <input type="email"
                                        name="correo"
                                        className="form-control" id="inputEmail"></input>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="identificacion" className="form-label">Identificacion</label>
                                    <input type="text" className="form-control"
                                        name="identificacion"
                                        id="identificacion">
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <label for="rol" className="form-label">Rol</label>
                                    <select id="rol" name="rol" className="form-select">
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
                            </div>
                            <div className="col-12">
                                <button type="submit" 
                                className="btn btn-primary">Registrar</button>
                            </div>
                        </form>
                </div>

            </main>
        </Fragment>
        
    )
}

export default Register
