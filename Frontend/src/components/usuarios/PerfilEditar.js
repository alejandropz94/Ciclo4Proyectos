import React from 'react'
import Head from '../shared/Head'
import TopHeader from '../shared/TopHeader'
import EditarUsuario from './EditarUsuario'


function PerfilEditar(){
        return (
            <div>
                <Head />
                    <div className="">
                        <div className="container-fluid">
                            <div className="row flex-nowrap">     
                                <TopHeader/>             
                                <EditarUsuario></EditarUsuario>                 
                            </div>
                        </div>

                    </div>
            </div>
        )

}

export default PerfilEditar