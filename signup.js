import React, { Component, useState } from 'react'
import { signUp } from '../services/userservices'
import { toast } from 'react-toastify';
import { URL } from '../services/helper';
import Navbar from './Navbar/Navbar';


export default class SignUp extends Component {
  render() {
    return <Like />;
  }
}

function Like() {


  const [data, setData] = useState({

    firmName: '',
    userPhone: '',
    userName: '',
    password: '',

  })

  const submitForm = (event) => {
    event.preventDefault()

    if(error.isError){
      toast.error("Invalid Data.....")
      return;
    }
    console.log(data);

    //call server api for sending data
    signUp(data).then((resp) => {
      console.log(resp)
    
      console.log("success")
     toast.success("User Registered Successfully.... User ID "+resp.userId)
     //createBrowserHistory.push("/login");
     setTimeout(() => {  window.location.href = URL+"/login" }, 2000);

     

     setData ({
      firmName: '',
      userPhone: '',
      userName: '',
      password: '',
    });

    }).catch((error) => {
      console.log(error)
      console.log("Error")

      //handle errors

      setError({
        errors : error,
        isError : true
      })
    });
  }

  const [error, setError] = useState({

    errors: {},
    isError: false
  })

  // use to print changes in field on console

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value })
  }

  return (
        <>
    
    <Navbar />
    <div className="innerForm">

    <form action='post' onSubmit={submitForm}>
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label>Firm Name</label>

        {/* use to print field data on screen */}
        {/* {JSON.stringify(data)} */}

        <input type="text" className="form-control" placeholder="Enter Firm name"
          id='firmName' onChange={(e) => handleChange(e, 'firmName')} value={data.firmName}
          // onInvalid = {error.errors?.response?.data?.firmName ? true : false } 
          />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input type="text" className="form-control" placeholder="Enter Phone Number"
          id='userPhone' onChange={(e) => handleChange(e, 'userPhone')} value={data.userPhone} />
      </div>
      <div className="mb-3">
        <label>User Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter User Name"
          id='userName' onChange={(e) => handleChange(e, 'userName')} value={data.userName} />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Enter password"
          id='password' onChange={(e) => handleChange(e, 'password')} value={data.password}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        <a href="/login">Already registered  Sign in?</a>
      </p>
    </form>
    </div>

    </>

  )
}

