import { React, useState, useEffect, useRef } from 'react';
import Barcode from 'react-barcode';

import { storage, firestore } from '../firebase/credenciales';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import ReactToPrint,{useReactToPrint} from "react-to-print";

import styles from './verTodasHerramientas.module.css'

export default function VerHerramientas(){
    
    const [herramientas,setHerramientas] = useState([{}])

    useEffect(()=>{
        fetchTools()
    },[])
    
    const fetchTools = async ()=>{
        const {docs} = await getDocs(collection(firestore, "herramientasInsumos"));
        const toolsArray = docs.map(tool =>({...tool.data()}))
        setHerramientas(toolsArray)
    };

    function handleDelete(uid){
        deleteDoc (doc(firestore,'herramientasInsumos',uid))
        .then(()=> {
            fetchTools()
        })
    }
    

    var pos = 0
    const componentRef = useRef({})
    const handlePrint = useReactToPrint({
      content: () => componentRef.current[pos]
    });


    const showTools = herramientas.map((singleHerramienta,index)=>{
        console.log(index)
        
        return(
        <div key={singleHerramienta.codigo}>
            <div>Nombre: {singleHerramienta.nombre}</div>
            <div>Categoría: {singleHerramienta.cat1 +', '+ singleHerramienta.cat2}</div>
            <div>Ubicación: {singleHerramienta.ubicacion}</div>
            <div>Cantidad: {singleHerramienta.cantidad}</div>
            <button onClick = {()=>handleDelete(singleHerramienta.codigo)}>Eliminar herramienta</button>

            <div className = {styles.barcode}><Barcode ref={(element) => componentRef.current[index] = element} value = {singleHerramienta.codigo}/></div>
            <button onClick={(index => {pos = index
                return handlePrint})}>Imprimir coddigo de barras</button>
            
            <br/>
            <br/>
        </div>
    )})
        
    return(
        <div>
            {showTools}
        </div>
    )
}