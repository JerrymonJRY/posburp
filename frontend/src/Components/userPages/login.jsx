import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from "react-router-dom";
import apiConfig from '../layouts/base_url';
import { useAuth } from './Auth';
function  Login() {

  const [email,setEmail]=useState()
  const [password,setPassword] =useState()
  const navigate = useNavigate();
  const { login } = useAuth();
  //const navigate = redirect();
 
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${apiConfig.baseURL}/api/user/login`, { email, password })
      .then((response) => {
        if (response.data) {
          // Destructure the data from the response
          const { _id, firstname, lastname, token } = response.data;
          
         
          localStorage.setItem('token', token);

        
          navigate('/dashboard');
        } else {
          // Handle login failure (if needed)
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };




 // const [email setEmail]

    return(
        <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src="../../assets/images/logo.svg" />
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input name="email" type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" onChange={(e) =>setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={(e) =>setPassword(e.target.value)} />
                    </div>
                    <div className="mt-3">
                      <input type='submit' className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" value="Sign in" />
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" /> Keep me signed in </label>
                      </div>
                      <a href="#" className="auth-link text-black">Forgot password?</a>
                    </div>
                  
                  
                  </form>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      
      </div>
    );

}

export default Login;