
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        //check wether the user is logged in or not
        const isAuntheticated=localStorage.getItem("token")
        if(isAuntheticated)
        {
            navigate("/")
        }
       },[])
   const [formData, setFormData] = useState({
        username: '',
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

        try {
            const response= await axios.post("http://localhost:8000/login", formData)
            console.log(response)
            window.localStorage.setItem("id",response.data.Id)
            window.localStorage.setItem("token",response.data.token)
            console.log(response)
           
            if(!response.data.token){
                alert("Invalid credentials")
            }
            else{
                navigate("/")
            }  
        } catch (error) {
            console.log(error)
        } 
    };
    return (
        <div>
        <form onSubmit={handelSubmit}>
        <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
              Username
        </label>
        <input
              type="text"
              onChange={handelOnchange}
              name='username'
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

export default Login;
