
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
import './appStyle.css'
 

function App() {
    const auth = getAuth(firebaseApp)
    const firestore = getFirestore(firebaseApp)
    var pathname = window.location.pathname

    const [userParams, setUserParams] = useState({})
    const [loading,setLoading] = useState(false)

    async function getParams(uid){
        const docRef = doc(firestore, `usuarios/${uid}`)
        const docSnap = getDoc(docRef)
        return ((await docSnap).data())
    }

    useEffect(()=>{
        pathname = window.location.pathname
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },2000)
    },[])

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

    console.log(userParams)

    return (
        <div className='body'>
            {loading && (pathname==='/') ? <Loading/>:
            <Switch>
            <Route path='/' component={()=>(<Home name = {userParams.nombre} admin = {userParams.admin}/>)}></Route>
            <Route path='/login' component={()=>(<LoginPage/>)}></Route>
            <Route path='/signup' component={()=>(<SignupPage />)}></Route>
            <Route >{()=>(<Page404/>)}</Route>
            </Switch>
            }
        </div>
    );
}
export default App;
