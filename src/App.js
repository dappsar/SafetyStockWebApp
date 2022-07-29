
import React from 'react';
import { Route,Switch } from "wouter";
import Home from './Pages/homePage'
import LoginPage from './Pages/loginPage'
import Signup from './Pages/signupPage'
import Page404 from './Pages/Page404'
import './appStyle.css'
 
function App() {

    return (
        <div className='body'>
            <Switch>
            <Route path='/' component={Home}></Route>
            <Route path='/login' component={LoginPage}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route >{Page404}</Route>
            </Switch>

        </div>
    );
}
export default App;
