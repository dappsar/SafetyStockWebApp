import {React,useState,useEffect} from 'react';
import Header from '../../Components/header'

import { getFirestore, collection, getDocs} from 'firebase/firestore';
import firebaseApp from '../../firebase/credenciales';

import styles from './faltantes.module.css'

export default function Faltantes(props){

    const firestore = getFirestore(firebaseApp)

    const [faltantes,setFaltantes] = useState([])

    useEffect(()=>{
        const obtenerFaltantes = async ()=>{
            const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
            const faltantes = docs.map(singleTool =>({uid: singleTool.id, ...singleTool.data()}))
            setFaltantes(faltantes)
            };
        
        obtenerFaltantes()
    },[])

    const allFaltantes = faltantes.map(faltante=>{
        if(faltante.cantidadIdeal < faltante.cantidad && faltante.cantidad!== ''){
            return(
                <div key = {faltante.codigo}>
                    <div>Nombre: {faltante.nombre}</div>
                    <div>Categoría: {faltante.cat1} </div>
                    <div>Cantidad actual: {faltante.cantidad}</div>
                    <div>Cantidad mínima: {faltante.cantidadMinima}</div>
                    <div>Cantidad a comprar: {faltante.cantidadIdeal - faltante.cantidad}</div>
                    <br/>
                </div>
            )
        }
    })


    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Lista de materiales a comprar</h1>
            {allFaltantes}
        </div>
    )
}