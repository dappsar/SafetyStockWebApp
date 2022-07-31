import React, { useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useLocation } from 'wouter';

export default function NavBar(){
    
    const auth = getAuth(firebaseApp)
    
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage ,setErrorMessage] = useState(null)

    function submitHandler(event){
        event.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((respuesta) => {
            (console.log("Se ha iniciado sesion correctamente, el UID del usuario es: ", respuesta.user.uid)) //EL UID!!!  respuesta.user.uid
            
            setLocation('/') 
            }
        )
        .catch((error) => { //en caso de que signInWithEmailAndPassword() de algun error...
            if(error.code === 'auth/wrong-password') setErrorMessage("Contraseña incorrecta")
            if(error.code === 'auth/user-not-found') setErrorMessage("El usuario no está registrado")
        })
    }
    
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Correo electrónico
                    <input 
                    type="email" 
                    id='email'
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <label>
                    Contraseña
                    <input 
                    type="password" 
                    id='password'
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                </label>
                <input 
                type="submit" 
                value="Iniciar sesión"
                />
            <a href='/signup'>Registrate</a>
            </form>
            {errorMessage ? <div>{errorMessage}</div> : <span></span>}

        </div>
    )
}