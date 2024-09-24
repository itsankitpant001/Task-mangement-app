import { useEffect, useState } from 'react';
import './LoginRegister.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    useEffect(()=>{
        if(window.localStorage.getItem("token"))
        {
            navigate("/")
        }
    })
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
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

        try {
            const response= await axios.post("http://localhost:8000/login", formData)
            console.log(response)
            window.localStorage.setItem("id",response.data.Id)
            window.localStorage.setItem("token",response.data.token)
            if(response.data.token){navigate("/")}
            else{
                alert("Invalid credentials")
            }
            
            
        } catch (error) {
            console.log(error)
        }
        
    };

    return (
        <div className="register-container">
            <h2>Login</h2>
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

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
