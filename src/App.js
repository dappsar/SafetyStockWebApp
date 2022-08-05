
import React, { useState,useEffect } from 'react';
import { Route,Switch } from "wouter";

import firebaseApp from './firebase/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import Home from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import Page404 from './Pages/Page404'
import Loading from './Pages/loading'
import Herramientas from './Pages/Admin/herramientas'
import Profesores from './Pages/Admin/profesores';
import Faltantes from './Pages/Admin/faltantes';
import Historial from './Pages/Admin/historial';

import NotAllowed from './Components/notAllowed';

import './appStyle.css'
 

function App() {

    const auth = getAuth(firebaseApp)
    const firestore = getFirestore(firebaseApp)
    
    var pathname = window.location.pathname

    const [userParams, setUserParams] = useState({})
    const [loading,setLoading] = useState(false)
    var nombre = userParams.nombre
    var admin = userParams.admin

    const [scanned, setScanned] = useState('')
    var barcode = ''
    var interval;

    async function getParams(uid){
        const docRef = doc(firestore, `usuarios/${uid}`)
        const docSnap = getDoc(docRef)
        return ((await docSnap).data())
    }

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },2000)
    },[pathname])

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if (user){
                getParams(user.uid).then((crudeParams)=> {
                    setUserParams(crudeParams)
                })
            }
            else setUserParams({})
        })
    },[])
    
    document.addEventListener('keydown',(event)=>{
        
        if (interval) clearInterval(interval);
        if(event.code === 'Enter'){
            if(barcode) handleBarcode(barcode)
            barcode = ''
            return;
        }
        if (event.key !=='Shift') barcode+= event.key
        interval = setInterval(()=> barcode= '', 20);
    })

    function handleBarcode(scannedBarcode){
        setScanned(scannedBarcode)
    }

    return (
        <div className='body'>
            {loading && (pathname!=='/signup' && pathname!=='/login') ? <Loading/>:
            <Switch>
                <Route path='/' component={()=>(<Home name = {nombre} admin = {admin}/>)}></Route>
                <Route path='/login' component={()=>(<LoginPage/>)}></Route>
                <Route path='/signup' component={()=>(<SignupPage />)}></Route>

                    {/* Admin pages */}
            
                <Route 
                    path={'/herramientas'} 
                    component={()=>admin ? (<Herramientas name = {nombre} admin = {admin} barcode = {scanned}/>) : <NotAllowed />}
                ></Route>
                <Route 
                    path={'/profesores'} 
                    component={()=>admin ? (<Profesores name = {nombre} admin = {admin}/>) : <NotAllowed />}
                ></Route>
                <Route 
                    path={'/faltantes'} 
                    component={()=>admin ? (<Faltantes name = {nombre} admin = {admin} />) : <NotAllowed />}
                ></Route>
                <Route 
                    path={'/historial'} 
                    component={()=>admin ? (<Historial name = {nombre} admin = {admin}/>) : <NotAllowed />}
                ></Route>
                
                <Route >{()=>(<Page404/>)}</Route>
            </Switch>
            }
        </div>
    );
}
export default App;
