import React, { useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useLocation } from 'wouter';

import styles from './loginPage.module.css'

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
            if(error.code === 'auth/wrong-password') setErrorMessage("contraseña incorrecta")
            if(error.code === 'auth/user-not-found') setErrorMessage("el usuario no está registrado")            
            if(error.code === 'auth/invalid-email') setErrorMessage("el email o la contraseña son inválidos")
        })
  }

    return(
        
        <form  onSubmit={submitHandler}> {/*className={styles.form}*/}
        <div >Safety Stock</div> {/*className={styles.subtitle}*/}
        <div >Inicia sesión para continuar</div> {/*className={styles.subtitle}*/}

        <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <input id="email" className={styles.input} type="email" placeholder=" "  onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className={styles.cut}></div>
        <label to="email" className={styles.placeholder}>Email</label>
        </div>
        
        <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <input id="password" className={styles.input} type="password" placeholder=" " onChange={(e)=>{setPassword(e.target.value)}} />
        <div className={styles.cut}></div>
        <label to="password" className={styles.placeholder}>Contraseña</label>
        </div>

        <button type="submit" className={styles.submit} >Iniciar sesión</button>
        <a className={styles.formLink} href='/signup'>¿Aún no tenés cuenta? Registrate</a>
        {errorMessage ? <div className={styles.errorMessage}>Error, {errorMessage}</div> : <span></span>}
    </form>


    )
}