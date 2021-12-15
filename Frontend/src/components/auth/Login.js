import React, {useEffect, Fragment} from 'react'
import Mision from '../../assets/Mision.png'
import '../../styles/estilos.css'
import { Link, useNavigate } from 'react-router-dom'
import useFormData from '../../hooks/useFormData'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../services/Auth.service'
import { useAuth} from '../../context/authContext'


const Login = () => {

    const setToken = useAuth();
    const navigate = useNavigate();

    const { form, formData, updateFormData } = useFormData();

    const [login, { data: dataMutation, loading: mutationLoading }] = useMutation(LOGIN);

    const submitForm = e => {
        e.preventDefault();
        console.log("estas en el logiiin");
        login({ variables: formData });
    };

    useEffect(()=>{
        if(dataMutation){
            setToken(dataMutation.login.token);
            navigate('/proyectos')
        }
    },[dataMutation, setToken, navigate])

    return (
        <Fragment>
        <div className = "contlogin text-center">
            <div className = "container log pt-5 pb-5">
                <div>
                    <img
                        src={Mision}
                        alt="logo"
                        className="img-login mb-3"
                    ></img>
                    <h1 className="h3 mb-5 fw-normal">Iniciar Sesion</h1>

                    <div className="container pl-5">

                    <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label for="inputEmail" className="form-label">Email</label>
                                    <input type="email"
                                    name = "correo"
                                    className="form-control" id="inputEmail"></input>
                                </div>

                                <div className="col-md-6">
                                    <label for="inputPassword4" className="form-label">Password</label>
                                    <input type="password"
                                    name="password"
                                    className="form-control" id="inputPassword4"></input>
                                </div>

                            </div>

                            <div className="col-12 mt-4 mb-4">
                                <button type="submit"
                                className="btn btn-outline-primary">Iniciar</button>
                                
                            </div>

                        </form>
                       <span>¿Aún no tienes cuenta?</span>
                        <Link exact to="/auth/register" className="container--google mx-2">
                            registrarse
                        </Link>
                    </div>
                        <p className="mt-5 mb-3 text-muted">©MinTic 2021</p>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Login