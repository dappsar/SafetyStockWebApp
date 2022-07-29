import React from 'react';
import bootstrap from 'bootstrap'
import './headerStyle.css'

export default function NavBar(){

    const [admin,setAdmin] = React.useState(true)
    const [logged, setLogged] = React.useState(false)

    const AdminHeader = (
    <header className='header'>
        <div className='header--titleLogo'>
        <h2 className='header--title'>Safety Stock</h2>
        <img className='header--logo' src='' alt='Logo'></img>
        </div>
        <ul className='header--links'>
            <li>
                <a href='busqueda'>Buscar</a>
            </li>
            <li>
                <a href='herramientas'>Herramientas</a>
            </li>
            <li>
                <a href='profesores'>Profesores</a>
            </li>
            <li>
                <a href='faltantes'>Faltantes</a>
            </li>
            <li>
                <a href='Historial'>Historial</a>
            </li>
        </ul>
        <p className='header--account'>Mi cuenta</p>
    </header>
    )

    const UserHeader = (
    <div className='header'>
        <ul>
            <li>
                <a href='busqueda'>Buscar</a>
            </li>
            <li>
                <a href='mis-herramientas'>Mis herramientas</a>
            </li>
            <li>
                <a href='historial/name'>Mi historial</a>
            </li>
            <li>
                <a href='historial/name'>Mi cuenta</a>
            </li>
        </ul>
    </div>
    )

    return(
        <header>{admin ? AdminHeader : UserHeader}</header>
    )
}