import React from 'react';
import { SpinnerCircular } from 'spinners-react';
import './loadingPage.css'

export default function Loading(){
    return(
        <div className='loading--container'>
            <SpinnerCircular className='loading' size={50} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.35)" />
        </div>
    )
}