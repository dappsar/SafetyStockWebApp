import { async } from '@firebase/util';
import {React,useState} from 'react';
import { getFirestore, doc, setDoc} from 'firebase/firestore'
import firebaseApp from '../firebase/credenciales';

import Header from '../Components/header'

import { subcategorias } from '../data/data';


// campos: nommbre, ubicacion, cantidad, marca, contenido, cat1,cat2,cat3, codigo 

//Categoria 1 
//Ferreteria, herramientas, electricidad, electronica, pinturas, epp, instrumentos electronicos,cables 

//categoria 2 
//Herramientas: Electricas, carpinteria, herreria, generales, albalineria, medicion, electronica, electricidad 

//ferreteria: Tornillas, tuercas,clavos,arandelas,remaches, tarugos, mechas, lijas 

//electricidad: codos,conectores,bastidores,cajas, tapas, etc 

// electronica: componentes de electronica, protoboards 

//pinturas: Al agua, solventes, esmalte sintetico, sellador, diluyente, enduido, barniz 

//Categoria 3: 
//Componentes de electronica: Resistores, capacitores, ciruitos integrados, socalos, reles, diodos, 
// bobinas, fusibles, interruptores, potenciometros, borneras, transistores, disipadores, motores, 
//finales de carrera, pulsadores, presets, pines

export default function HerramientasPage(props){
    
    const firestore = getFirestore(firebaseApp)

    const form = document.getElementById('formHerramienta') 

    const [nombre,setNombre] = useState('')
    const [ubicacion,setUbicacion] = useState('')
    const [codigo,setCodigo] = useState('')
    const [cantidad,setCantidad] = useState('')
    const [cat1,setCat1] = useState('')
    const [cat2,setCat2] = useState('')
    const [cat3,setCat3] = useState('')
    
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
            console.error("Error al subir la información a la base de datos: ", error);
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
                    onChange={(e)=>{setNombre(e.target.value)}}/>
                </label>
                <label>
                    Cantidad
                    <input 
                    type="number" 
                    id='cantidad'
                    onChange={(e)=>{setCantidad(e.target.value)}}/>
                </label>
                <label>
                    Código de barras
                    <input 
                    type="text" 
                    id='codigo'
                    value={props.barcode}
                    onChange={(e)=>{setCodigo(e.target.value)}}/>
                </label>
                <label>
                    Ubicación
                    <input 
                    type="text" 
                    id='text'
                    onChange={(e)=>{setUbicacion(e.target.value)}}/>
                </label>
                <label>
                    Categoría
                <select name="cat1" id="cat1" onChange={(e)=>{setCat1(e.target.value)}}>
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
                <select name="cat2" id="cat2" placeholder='subcategoria' onChange={(e)=>{setCat2(e.target.value)}}>
                <option value="none">Seleccione una subcatgoría</option>
                    {subcategorias.map(item => {
                        console.log('El item es', item.parent, 'y la categoria es', cat1)
                        if (cat1 === item.parent) return <option key={item.key} value={item.text}>{item.text}</option>
                    }
                    )}
                </select>
                </label>}

                <input type="submit" value="Cargar"/>
            </form>
            {/* {errorMessage ? <div>{errorMessage}</div> : <span></span>} */}
        </div>
    )
}