import React from 'react';
import Header from '../Components/header'

export default function HerramientasPage(props){
    
    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
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