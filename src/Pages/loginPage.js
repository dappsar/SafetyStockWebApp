import React, { useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useLocation } from 'wouter';

const auth = getAuth(firebaseApp)


export default function NavBar(){

    const [, setLocation] = useLocation();


    function submitHandler(event){
        event.preventDefault()

        const email = event.target.elements.email.value
        const password = event.target.elements.password.value

        signInWithEmailAndPassword(auth, email, password)
        alert("Sesion iniciada con exito")
    }
    
    return(
        <div>
            <h1>Login</h1>
            
            <form onSubmit={submitHandler}>
                <label>
                    Correo electrónico
                    <input type="email" id='email'/>
                </label>
                <label>
                    Contraseña
                    <input type="password" id='password'/>
                </label>
                <input type="submit" value="Iniciar sesión"/>
                <a href='/signup'>Registrate</a>
            </form>
        </div>
    )
}