import React from 'react'
import TopHader from '../shared/TopHeader'
import Head from '../shared/Head';
import TablaProyectos from './TablaProyectos';

function MainProyectos() {
    return (
        <div>
            <Head></Head>
            <main>
                <div className="container-fluid">
                    <div className="row flex-nowrap">
                        <TopHader></TopHader>
                        <TablaProyectos></TablaProyectos>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default MainProyectos