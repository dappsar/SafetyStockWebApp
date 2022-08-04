import { React, useState } from 'react';

import firebaseApp from '../firebase/credenciales';
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import Header from '../Components/header'

import { subcategorias } from '../data/data';

export default function HerramientasPage(props){
    
    const firestore = getFirestore(firebaseApp)
    const storage = getStorage(firebaseApp)

    const form = document.getElementById('formHerramienta') 

    const [nombre,setNombre] = useState('')
    const [ubicacion,setUbicacion] = useState('')
    const [codigo,setCodigo] = useState('')
    const [cantidad,setCantidad] = useState('')
    const [cat1,setCat1] = useState('')
    const [cat2,setCat2] = useState('')
    const [cat3,setCat3] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const herraminetaInsumo = {
        nombre: nombre,
        ubicacion:ubicacion,
        codigo:codigo,
        cantidad:cantidad,
        cat1:cat1,
        cat2:cat2,
        cat3:cat3
    }

    async function addTool(){

        try{
            await setDoc(doc(firestore, `herramientasInsumos`, codigo),herraminetaInsumo)   //carga los datos a firestore
        }
        catch (error) {
            setErrorMessage(error)
        }
    }

    function SubmitHandler(event){
        event.preventDefault()
        addTool()
        form.reset()
    }
    
    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Agregar herramienta o insumo nuevo</h1>
            <form id = 'formHerramienta' onSubmit={SubmitHandler}>
                <label>
                    Nombre
                    <input 
                    type="name" 
                    id='nombre'
                    required = {true}
                    onChange={(e)=>{setNombre(e.target.value)}}/>
                </label>
                <label>
                    Cantidad
                    <input 
                    type="number" 
                    id='cantidad'
                    required = {true}
                    onChange={(e)=>{setCantidad(e.target.value)}}/>
                </label>
                <label>
                    Código de barras
                    <input 
                    type="text" 
                    id='codigo'
                    required = {true}
                    value={props.barcode}
                    onChange={(e)=>{setCodigo(e.target.value)}}/>
                </label>
                <label>
                    Ubicación
                    <input 
                    type="text" 
                    id='text'
                    required = {true}
                    onChange={(e)=>{setUbicacion(e.target.value)}}/>
                </label>

                <label>
                    Categoría
                <select name="cat1" id="cat1" required = {true} onChange={(e)=>{setCat1(e.target.value)}}>
                    <option value="none">Seleccione una catgoría</option>
                    <option value="herramientas">Herramientas</option>
                    <option value="electronica">Electronica</option>
                    <option value="electricidad">Electricidad</option>
                    <option value="pinturas">Pinturas</option>
                    <option value="ferreteria">Ferretería</option>
                </select>
                </label>
                
                {cat1 && <label>
                Subcategoría
                <select name="cat2" id="cat2" required = {true} onChange={(e)=>{setCat2(e.target.value)}}>
                <option value="none">Seleccione una subcatgoría</option>
                    {subcategorias.map(item => {
                        if (cat1 === item.parent) return <option key={item.key} value={item.text}>{item.text}</option>
                    }
                    )}
                </select>
                </label>}
                
                {cat2 && <label>
                Subcategoría    
                <select name="cat3" id="cat3" onChange={(e)=>{setCat3(e.target.value)}}>
                <option value="none">Seleccione una subcatgoría</option>
                    {subcategorias.map(item => {
                        if (cat2 === item.parent) return <option key={item.key} value={item.text}>{item.text}</option>
                    }
                    )}
                </select>
                </label>}
                
                <input type="submit" value="Cargar"/>
            </form>
            {errorMessage ? <div>{errorMessage}</div> : <span></span>}
        </div>
    )
}