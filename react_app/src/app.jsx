import React, { useState } from 'react';
import './app.css';

import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { UserData} from './userdata/userdata';
import { SignUp} from './signup/signup';
import {Welcome} from './welcome/welcome';

export default function App() {
  const[auth, setauth] = useState(localStorage.getItem('userObject'));
  const authenticated = localStorage.getItem('userObject') !== null;

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
        <footer>
          <div>
          <p>Author: Austin McMaster</p>
          </div>
        </footer>

        <Routes>
            <Route path='/' element ={authenticated ? <Welcome/> :<Login stateChanger = {setauth}/>}></Route>
            <Route path='/home' element = {authenticated ? <Home/> : <Navigate to='/'/>}> </Route>
            <Route path='/userdata' element = {authenticated ? <UserData/>: <Navigate to='/'/> }></Route>
            <Route path='/signup' element = {<SignUp stateChanger = {setauth}/>}></Route>
            <Route path='/welcome' element = {<Welcome/>}></Route> 
            <Route path='*' element={authenticated ? <Navigate to='/welcome'/> : <Navigate to='/'/>}></Route>
        </Routes>
    </BrowserRouter>
  );

  function NotFound(){
    return (
    <main>
      <a>Path unknown return to home</a>
    </main>
  )};
}