import { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Register = () => {
    useEffect(()=>{
        if(window.localStorage.getItem("token"))
        {
            navigate("/")
        }
    })
    
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handelOnchange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handelSubmit =async (e) => {
        e.preventDefault();

        const response= await axios.post("http://localhost:8000/signin", formData)
        alert(response.data.message)
        if(response.data.message=="Sign in success"){
            navigate("/login")
        }  
    };

    return  (
        <div>
    <form onSubmit={handelSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
          Username
    </label>
    <input
          name='username'
          onChange={handelOnchange}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
    <div id="emailHelp" className="form-text">
    </div>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
    </label>
    <input
          type="email"
          onChange={handelOnchange}
          name='email'
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
    <div id="emailHelp" className="form-text">
    </div>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
          Password
    </label>
    <input
          type="password"
          onChange={handelOnchange}
          name='password'
          className="form-control"
          id="exampleInputPassword1"
        />
    </div>
    <div className="mb-3 form-check">
    
    
    </div>
    <button type="submit" className="btn btn-primary">
    Submit
    </button>
    </form>
    </div>
      )
};

export default Register;
