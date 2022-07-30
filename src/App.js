
import React from 'react';
import { Route,Switch,useLocation } from "wouter";

import firebaseApp from './firebase/credenciales'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import Home from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import SignupPage from './Pages/signupPage'
import Page404 from './Pages/Page404'
import './appStyle.css'
import { async } from '@firebase/util';
 
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

function App() {

    const [, setLocation] = useLocation();
    const [admin,setAdmin] = React.useState(true)
    const [user, setUser] = React.useState(false)
    
    const userParams = undefined

    async function getParams(uid){
        const docRef = doc(firestore, `usuarios/${uid}`)
        const docCifrada = await getDoc(docRef)   
        const userParams = {
            name: docCifrada.data().nombre,
            admin: docCifrada.data().admin
        }
        return userParams
    }

    onAuthStateChanged(auth, (firebaseUser)=>{
        if(firebaseUser){
            setUser(firebaseUser)
            const userUid = firebaseUser.uid
            userParams = getParams(userUid)
            return userParams
        }
        else setUser(null)
    }) 

    console.log(userParams)


    return (
        <div className='body'>
            
            <Switch>
            <Route path='/' component={()=>(<Home admin = {admin} user = {userParams}/>)}></Route>
            <Route path='/login' component={()=>(<LoginPage/>)}></Route>
            <Route path='/signup' component={()=>(<SignupPage/>)}></Route>
            <Route >{()=>(<Page404/>)}</Route>
            </Switch>

        </div>
    );
}
export default App;
