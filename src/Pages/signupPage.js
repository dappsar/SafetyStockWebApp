import React, { useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc} from 'firebase/firestore'
import { useLocation } from 'wouter';

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

export default function NavBar(){

    const [, setLocation] = useLocation();

    async function RegistrarUsuario(nombre, apellido, curso, email, password){
        const infoUsuario  = await createUserWithEmailAndPassword(auth,email,password) 
        .then((usuarioFirebase)=>{
            return usuarioFirebase
        })
        console.log(infoUsuario)
        
        const docRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`)   
        setDoc(docRef,{
            nombre: nombre,
            apellido: apellido,
            curso: curso,
            email: email,
            admin: false
        })

        setLocation('/')
    }

    function SubmitHandler(event){
        event.preventDefault()
        
        const nombre = event.target.elements.nombre.value
        const apellido = event.target.elements.apellido.value
        const curso = event.target.elements.curso.value
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value

        RegistrarUsuario(nombre, apellido, curso, email, password)
        console.log(email,password)
    }

    return(
        <div>
            <h1>Registrate</h1>
            
            <form onSubmit={SubmitHandler}>
                <label>
                    Nombre
                    <input type="name" id='nombre'/>
                </label>
                <label>
                    Apellido
                    <input type="surname" id='apellido'/>
                </label>
                <label>
                    Curso
                    <input type="text" id='curso'/>
                </label>
                <label>
                    Correo electrónico
                    <input type="email" id='email'/>
                </label>
                <label>
                    Contraseña
                    <input type="password" id='password'/>
                </label>
                <input type="submit" value="Registrarse"/>
                <a href='/login'>Iniciar sesion</a>
            </form>
        </div>
    )
}