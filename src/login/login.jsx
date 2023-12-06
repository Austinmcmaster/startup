import React from 'react';
import { NavLink } from 'react-router-dom';

export function Login() {
  return (
    <main>
      <div id="lscontainer">
        <form id= "login-form">
            <h2>Login</h2>
              <div className="form-content">
                <input type="email"id = "email" required = "email" placeholder="Email"/>
                <input type="password" id = "password" required="password" placeholder="Password"/>
                <NavLink to='/signup'>Sign Up</NavLink>
                <a id="errormsg"></a>
                <br/>
                <button id='loginbutton' className="button" type="submit">Login</button>
                <br/>
              </div>
        </form>
    </div>
    </main>
  );
}