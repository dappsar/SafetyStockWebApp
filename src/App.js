
import React, { useState,useEffect } from 'react';
import { Route,Switch } from "wouter";

import firebaseApp from './firebase/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';

import Home from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import Page404 from './Pages/Page404'
import Loading from './Pages/loading'
import './appStyle.css'
 
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

function App() {
    
    const [userParams, setUserParams] = useState({})
    const [loading,setLoading] = useState(false)

    async function getParams(uid){
        const docRef = doc(firestore, `usuarios/${uid}`)
        const docSnap = getDoc(docRef)
        return ((await docSnap).data())
    }

useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
    },1000)
},[])

useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
        if (user){
            console.log(user.uid)
            getParams(user.uid).then((crudeParams)=> {
                console.log(crudeParams)
                setUserParams(crudeParams)
            })
        }
        else setUserParams({})
    })
    },[])

    return (
        <div className='body'>
            {loading ? <Loading/>:
            <Switch>
            <Route path='/' component={()=>(<Home/>)}></Route>
            <Route path='/login' component={()=>(<LoginPage/>)}></Route>
            <Route path='/signup' component={()=>(<SignupPage />)}></Route>
            <Route >{()=>(<Page404/>)}</Route>
            </Switch>
            }
        </div>
    );
}
export default App;
