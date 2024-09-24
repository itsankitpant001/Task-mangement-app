import { useEffect, useState } from 'react';
import './LoginRegister.css';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        

        const response= await axios.post("http://localhost:8000/signin", formData)
        console.log(response.data)
        if(response){
            navigate("/login")
        }
        
        
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />

                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
