import {React,useState,useEffect, useId} from 'react';
import Header from '../../Components/header'

import firebaseApp from '../../firebase/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs  } from 'firebase/firestore';

export default function Profesores(props){
    
    const auth = getAuth(firebaseApp)
    const firestore = getFirestore(firebaseApp)

    const [users, setUsers] = useState([])

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {docs} = await getDocs(collection(firestore, "usuarios"));
            const usersArray = docs.map(singleUser =>({uid: singleUser.id, ...singleUser.data()}))
            setUsers(usersArray)
            };
        
        fetchUsers()
    },[])

    const usersList = users.map(user =>(
            <div key={user.uid}>
                <div>{'Nombre del profesor: ' + user.nombre + ' ' + user.apellido}</div>
                <div>{'Email del profesor: ' + user.email}</div>
                <div>{`¿Es administrador?:  ${user.email ? 'Si' : 'No'} `}</div>
                <button>Eliminar usuario</button>
                <br/>
                <br/>
                <br/>
            </div>
    ))

    return(
        <div>
            <Header name = {props.name} admin = {props.admin}/>
            <h1>Profesores Habilidatos</h1>
            {usersList}
        </div>
    )
}