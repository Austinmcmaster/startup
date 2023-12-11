import React, { useState } from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { UserData} from './userdata/userdata';
import { SignUp} from './signup/signup';

export default function App() {
  const[auth, setauth] = useState(localStorage.getItem('userObject'));

  function logout(){
    localStorage.removeItem('userObject');
    localStorage.removeItem('leaderboard');
    localStorage.removeItem('table');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
    setauth(null);
  }


  return (
    <BrowserRouter>
        <header>
            <h1>
            <img alt = "Time Logo" src = "https://www.freepngimg.com/thumb/clock/11-2-clock-free-png-image.png" width="50px"/>
            Time Analytics</h1>
            <nav>
                <ul>
                    {auth != null && (
                    <li><a>{JSON.parse(auth).username}</a></li>)}
                    {auth != null && (
                    <li><NavLink to={'home'}>Home Page </NavLink></li>)}
                    {auth != null && (
                    <li onClick={() => logout()}><NavLink to='/'>Logout</NavLink></li>)}
                     {auth != null && (
                    <li><NavLink to={'userdata'}>Data Page</NavLink></li>)}
                    <li><NavLink to={"https://github.com/Austinmcmaster/startup"}>GitHub Repository</NavLink></li>
                </ul>
            </nav>
        </header>

        <Routes>
            <Route path='/' element ={<Login stateChanger = {setauth}/>}></Route>
            <Route path='/home' element = {<Home/>}></Route>
            <Route path='/userdata' element = {<UserData/>}></Route>
            <Route path='/signup' element = {<SignUp stateChanger = {setauth}/>}></Route> 
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </BrowserRouter>
  );

  function NotFound(){
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
}