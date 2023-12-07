import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function Login() {
  const[email,setEmail] = React.useState('');
  const[password,setPassword] = React.useState('');
  const navigate = useNavigate();

  async function getUser(){
    const response = await fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
  });
    if(response.ok){
        const user = await response.json();
        var object = {
            username: user.username,
            id: user.id,
        }
        localStorage.setItem('userObject', JSON.stringify(object));
        navigate('/home');
    }
    else{
      const body = await response.json();
      const message = document.getElementById("errormsg");
      message.textContent = `⚠ Error: ${body.msg}`;
    }
  }

  return (
    <main>
      <div id="lscontainer">
        <form id= "login-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Login</h2>
              <div className="form-content">
                <input type="email"id = "email" required = "email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id = "password" required="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}/>
                <NavLink to='/signup'>Sign Up</NavLink>
                <a id="errormsg"></a>
                <br/>
                <button id='loginbutton' className="button" onClick={() => getUser()}>Login</button>
                <br/>
              </div>
        </form>
    </div>
    </main>
  );
}