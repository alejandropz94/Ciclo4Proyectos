import React from 'react'
import { useAuth } from '../../context/authContext'
import Head from '../shared/Head'
import TopHeader from '../shared/TopHeader'
import ListUsuarios from './ListUsuarios'

function MainUsuarios(){
        return (
            <div>
                <Head />
                <main>
                    <div className="container-fluid">
                        <div className="row flex-nowrap">
                            
                            <TopHeader/>             
                            <ListUsuarios></ListUsuarios>
                            
                        </div>
                    </div>
    
                </main>
            </div>
        )

}

export default MainUsuarios
