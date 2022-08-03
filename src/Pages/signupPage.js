import React, { useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc} from 'firebase/firestore'
import { useLocation } from 'wouter';

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

export default function NavBar(){

    const [, setLocation] = useLocation();
    
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')    
    const [errorMessage ,setErrorMessage] = useState(null)

    const usuario = { 
        nombre: nombre,
        apellido: apellido,
        email: email,
        admin: false
    }

    async function RegistrarUsuario(nombre, apellido, email, password){
        const user  = await createUserWithEmailAndPassword(auth,email,password) //crea el usuario en Firebase Auth
            .then((usuarioFirebase)=>{
                return usuarioFirebase.user
            })

        try{
            await setDoc(doc(firestore, `usuarios`, user.uid),usuario)   //carga los datos a firestore
            setLocation('/')
        }
        catch (error) {
            console.error("Error al subir la información a la base de datos: ", error);
        }
    }

    function SubmitHandler(event){
        event.preventDefault()
        RegistrarUsuario(nombre, apellido, email, password) //funcion para registrar usuarios y subirlos a la base de datos con todos sus campos
        .catch((error) => { //si en RegistrarUsuario() surge un error...
            if(error.code === 'auth/invalid-email') setErrorMessage("Formato de email incorrecto")
            if(error.code === 'auth/weak-password') setErrorMessage("La contraseña es demasiado débil")
            if(error.code === 'auth/email-already-in-use') setErrorMessage("El email ya está en uso") 
          });
    }

    return(
        <div>
            <h1>Registrate</h1>
            <form onSubmit={SubmitHandler}>
                <label>
                    Nombre
                    <input 
                    type="name" 
                    id='nombre'
                    onChange={(e)=>{setNombre(e.target.value)}}/>
                </label>
                <label>
                    Apellido
                    <input 
                    type="surname" 
                    id='apellido'
                    onChange={(e)=>{setApellido(e.target.value)}}/>
                </label>
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
                <input type="submit" value="Registrarse"/>
                <a href='/login'>Iniciar sesion</a>
            </form>
            {errorMessage ? <div>{errorMessage}</div> : <span></span>}
        </div>
    )
}