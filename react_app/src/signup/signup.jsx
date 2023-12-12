import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function SignUp({stateChanger}) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    async function createUser(){
        let userObject = {
            username : userName,
            password : password,
            email : email
        }
    
        const response = await fetch('/api/auth/create', {
            method: 'POST',
            body: JSON.stringify(userObject),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',} 
        
        });
        if(response.ok){
            const user = await response.json();
            var object = {
                username: user.username,
                id: user.id,
            }
            localStorage.setItem('userObject', JSON.stringify(object));
            stateChanger(localStorage.getItem('userObject'));
            navigate('/home');
        }
    }



  return (
    <main>
      <div id="lscontainer">
        <form id= "login-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Sign Up</h2>
            <div className="form-content">
            <input type="text" id="username" required = "text" placeholder="Username" 
            onChange={(e) => setUserName(e.target.value)}/>
            <input type="email"id = "email" required = "email" placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" id = "password" required="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}/>
            <NavLink to='/'>Return to Login</NavLink>
            <br/>
            <button id='loginbutton' className="button" type='submit' onClick={() => createUser()}>Sign Up</button>
            <br/>
            </div>
        </form>
    </div>
    </main>
  );
}