import React from 'react';
import { NavLink } from 'react-router-dom';

export function SignUp() {
  return (
    <main>
      <div id="lscontainer">
        <form id= "login-form">
            <h2>Login</h2>
            <div className="form-content">
            <input type="text" id="username" required = "text" placeholder="Username"/>
            <input type="email"id = "email" required = "email" placeholder="Email"/>
            <input type="password" id = "password" required="password" placeholder="Password"/>
            <NavLink to='/'>Return to Login</NavLink>
            <br/>
            <button id='loginbutton' className="button" type="submit">Login</button>
            <br/>
            </div>
        </form>
    </div>
    </main>
  );
}