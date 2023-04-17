import React, { Component } from 'react'

import { useState } from 'react'
import { Toast, toast } from 'react-toastify'
import { login } from '../services/userservices';
import '../css/forms.css'
import { URL } from '../services/helper';
import Navbar from './Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Logo } from './Widget/Logo';


export default class Login extends Component {
  render() {
    return <Like />;
  }
}


export function Like() {

  const [loginData, setLoginData] = useState({

    userName: '',
    password: '',

  })

  const [curentUserId, setCurentUserId] = useState ([])

  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));

  const [error, setError] = useState({

    error: {},
    isError: false
  })

  // use to print changes in field on console

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const handleChange = (event, property) => {
    let actualValue = event.target.value
    setLoginData({ ...loginData, [property]: actualValue })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginData)

    //validation
    if (loginData.userName.trim() == '' || loginData.password.trim() == '')
      toast.error("UserName and Password is Required.....");

      
    //submit to server
    login(loginData).then((response) => {
      console.log("Response");
      if (response == null) {
        toast.error("Login failed.");
      } else {
        console.log(response)
        let user = JSON.parse(JSON.stringify(response));
        setCurentUserId(user.userId)
        console.log(user.userId)

        toast.success("Login Successfully.")
        toast.info("Wellcome "+user.firmName)

        localStorage["curUser"] = (JSON.stringify(user));


       setTimeout(() => { window.location.href = URL + "/dashboard" }, 2000);
      }
    }).catch(error => {
      console.log(error)
      toast.error("Login failed.");
    })
    return;
  }


  return (

    <>
      <Navbar />
      <div className='row'>
        <div className='col'>
          <Logo />
        </div>
        <div className='col align-content-left'>

          <div className="innerForm">
            <form action='post' onSubmit={handleFormSubmit}>
              <h2 >Sign In</h2>
              <div className="mb-3">
                <label>User Name</label>
                <input type="text" className="form-control" placeholder="Enter UserName" id='userName'
                  onChange={(e) => handleChange(e, 'userName')} value={loginData.userName} />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" id='password'
                  onChange={(e) => handleChange(e, 'password')} value={loginData.password} />
              </div>
              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>

              <div className='row'>
                <div className='col'>
                  <Link to="/signup">Sign-up</Link>
                </div>
                <div className='col text-left'>

                </div>
                <div className='col text-center '>
                  <Link to="/forgot">Forgot Password ? </Link>
                </div>
              </div>

            </form>
          </div>

        </div>




      </div>
    </>
  )
}
