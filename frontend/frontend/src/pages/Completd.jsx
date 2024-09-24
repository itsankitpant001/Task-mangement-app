
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Completed() {
    const headers={id:window.localStorage.getItem("id")}
    const navigate=useNavigate()
    let[data,setdata]=useState()

    const fetchdata= async ()=>{
        try {
         const response=await axios.get("http://localhost:8000/getalltask",{headers}) 
        
         setdata(response.data.task);
        } catch (error) {
         console.log(error)
        }
    }
    useEffect(()=>{
        //check wether the user is loged in or not
          if(!window.localStorage.getItem("token"))
          {
              navigate('/login')
          }
        fetchdata()     
      },[])

    return (
        <>
          <div className='row'>
                {data?.filter(e=>e.complete===true).map((e,index)=>(
                    <div key={index} className='col-3'>
                        
                    <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{e.title}</h5>
            <p className="card-text">
              {e.disc}
            </p>
           Important<input type="checkbox" name="" id="" />
            <br></br>
          </div>
        </div>
        </div>
                ))}
</div>
        </>
    )
}

export default Completed
