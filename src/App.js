
import React, { useState,useEffect } from 'react';
import { Route,Switch } from "wouter";

import firebaseApp from './firebase/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';

import Home from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import Page404 from './Pages/Page404'
import './appStyle.css'
 
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

console.log(firestore)

function App() {
    
    const [userParams, setUserParams] = useState(null)

    const userUid = onAuthStateChanged(auth, (user) =>{
        if (user) console.log(user.uid)
    })

    useEffect(()=>{        
        const usuarios = doc(firestore, "usuarios/N4MLdeQQjwNeKoLsw6l2vcThVNJ2")
        .then(()=>console.log(usuarios))
    },[])

    return (
        <div className='body'>
            
            <Switch>
            <Route path='/' component={()=>(<Home/>)}></Route>
            <Route path='/login' component={()=>(<LoginPage/>)}></Route>
            <Route path='/signup' component={()=>(<SignupPage />)}></Route>
            <Route >{()=>(<Page404/>)}</Route>
            </Switch>

        </div>
    );
}
export default App;
