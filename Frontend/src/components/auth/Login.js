import React from 'react'
import Mision from '../../assets/Mision.png'
import '../../styles/estilos.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className = "contlogin text-center">
            <div className = "container log pt-5 pb-5">
                <form>
                    <img
                        src={Mision}
                        alt="logo"
                        className="img-login mb-3"
                    ></img>
                    <h1 className="h3 mb-5 fw-normal">Iniciar Sesion</h1>

                    <div className="container pl-5">

                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label for="inputEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="inputEmail"></input>
                                </div>

                                <div className="col-md-6">
                                    <label for="inputPassword4" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword4"></input>
                                </div>

                            </div>

                            <div className="col-12 mt-4 mb-4">
                                <button type="submit" className="btn btn-outline-primary">Iniciar</button>
                                
                            </div>

                        </form>
                       ¿Aún no tienes cuenta?
                        <Link exact to="/auth/register" className="container--google">
                            registrarse
                        </Link>
                    </div>
                        <p className="mt-5 mb-3 text-muted">©MinTic 2021</p>
                </form>
            </div>
        </div>
    )
}

export default Login