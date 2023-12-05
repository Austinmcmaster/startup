import React from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { UserData} from './userdata/userdata';

export default function App() {
  return (
    <BrowserRouter>
        <header class="header">
            <h1>
            <img alt = "Time Logo" src = "https://www.freepngimg.com/thumb/clock/11-2-clock-free-png-image.png" width="50px"/>
            Time Analytics</h1>
            <ul class="main-nav">
                <li><a></a></li>
                <li><a><NavLink to={'home'}>Home Page </NavLink></a></li>
                <li><a><NavLink to='/'>Logout</NavLink></a></li>
                <li><a><NavLink to={'userdata'}>Data Page</NavLink></a></li>
                <li><a><NavLink to={"https://github.com/Austinmcmaster/startup"}>GitHub Repository</NavLink></a></li>
            </ul>
        </header>

        <Routes>
            <Route path='/' element ={<Login/>}></Route>
            <Route path='/home' element = {<Home/>}></Route>
            <Route path='/userdata' element = {<UserData/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}