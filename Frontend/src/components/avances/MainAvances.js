import React from 'react'
import TopHader from '../shared/TopHeader'
import Head from '../shared/Head';
import TablaAvances from './TablaAvances';


function MainAvances() {
    return (
        <div>
            <Head></Head>
            <main>
                <div className="container-fluid">
                    <div className="row flex-nowrap">
                        <TopHader></TopHader>
                        <TablaAvances></TablaAvances>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default MainAvances