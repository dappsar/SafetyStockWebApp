import { React, useState, useEffect, useRef } from 'react';
import Barcode from 'react-barcode';

import { storage, firestore } from '../firebase/credenciales';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import ReactToPrint from "react-to-print";

import styles from './verTodasHerramientas.module.css'

export default function VerHerramientas(){
    //var pos = 0
    const itemsRef = useRef([])
    const [herramientas, setHerramientas] = useState([{}])

    useEffect(()=>{
        fetchTools()
        itemsRef.current = itemsRef.current.slice(0, herramientas.length);
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

    const Tool = ({ tool, index }) => {
        return(
            <div key={tool.codigo}>
                <div>Nombre: {tool.nombre}</div>
                <div>Categoría: {tool.cat1 +', '+ tool.cat2}</div>
                <div>Ubicación: {tool.ubicacion}</div>
                <div>Cantidad: {tool.cantidad}</div>
                <button onClick = {()=>handleDelete(tool.codigo)}>Eliminar herramienta</button>
                <ReactToPrint
                    trigger={() => (<button>Imprimir codigo de barras</button>)}
                    content={() => {return itemsRef.current[index]}}
			    />
                <div key={tool.codigo} className = {styles.barcode}>
                    <Barcode 
                        key={tool.codigo}
                        ref={(el) => (itemsRef.current[index] = el)}
                        value = {tool.codigo || ''} 
                    />
                </div>
               <br/>
                <br/>
            </div>
        )
    }


    const Tools = () => {
        return (
            herramientas.map((item, index) => <Tool key={item.codigo} tool={item} index={index} />)
        )
    }
        
    return (
        <Tools/>
    )
}