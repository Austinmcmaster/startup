import React from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { UserData} from './userdata/userdata';
import { SignUp} from './signup/signup';

export default function App() {
  return (
    <BrowserRouter>
        <header>
            <h1>
            <img alt = "Time Logo" src = "https://www.freepngimg.com/thumb/clock/11-2-clock-free-png-image.png" width="50px"/>
            Time Analytics</h1>
            <nav>
                <ul>
                    <li><a></a></li>
                    <li><NavLink to={'home'}>Home Page </NavLink></li>
                    <li><NavLink to='/'>Logout</NavLink></li>
                    <li><NavLink to={'userdata'}>Data Page</NavLink></li>
                    <li><NavLink to={"https://github.com/Austinmcmaster/startup"}>GitHub Repository</NavLink></li>
                </ul>
            </nav>
        </header>

        <Routes>
            <Route path='/' element ={<Login/>}></Route>
            <Route path='/home' element = {<Home/>}></Route>
            <Route path='/userdata' element = {<UserData/>}></Route>
            <Route path='/signup' element = {<SignUp/>}></Route> 
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </BrowserRouter>
  );

  function NotFound(){
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
}