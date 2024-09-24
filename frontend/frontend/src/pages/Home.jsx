import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
function Home() {
    const headers={id:window.localStorage.getItem("id"),authorization:window.localStorage.getItem("token")}
   
    let[data,setdata]=useState()
    const userid=window.localStorage.getItem("id");
    let[taskdata,settaskdata]=useState({
        title:'',
        disc:'',
        userid:userid
    })
    const navigate=useNavigate()


     //to get all tasks
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

    //Logout user
    const logout=()=>{
         window.localStorage.clear("token")
         navigate('/login')
    }
    //Delete task
    const handelDelete=async(id)=>{
       const response=await axios.delete(`http://localhost:8000/delete/task/${id}`,{headers})
       setdata(response.data.task)
    }
    //Complete task
    const handelComplete=async (id)=>{
      const response=await axios.put(`http://localhost:8000/update/comp/task/${id}`,taskdata)
      setdata(response.data.task)
    }
    //Important task
    const handelImportant=async (id)=>{
      const response=await axios.put(`http://localhost:8000/update/imp/task/${id}`,taskdata)
      setdata(response.data.task)

    }
    //Update task
    const handelUpdate=async (id)=>{
        const response=await axios.put(`http://localhost:8000/update/task/${id}`,taskdata,{headers}) 
        setdata(response.data.task)
        
    }

    //to create new task
    const handelOnchange=(e)=>{
        const {name,value}=e.target;
        settaskdata({...taskdata,[name]:value})
    }

    const handelsubmit=async(e)=>{
        e.preventDefault();

        try {
            const response=await axios.post("http://localhost:8000/",taskdata,{headers})
            setdata(response.data.updatedTask.task)
        
        } catch (error) {
            console.log(error)
        }
    }
    
        return (
            <>
            <div>
              <button onClick={()=>(navigate("/important"))}>Important-task</button>
              <button onClick={()=>(navigate("/completed"))}>Completed-task</button>
            <form onSubmit={handelsubmit}>
  <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Title
    </label>
    <input
      type="text"
      name='title'
      onChange={handelOnchange}
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
    Discription
    </label>
    <input
      type="text"
      onChange={handelOnchange}
      name='disc'
      className="form-control"
      id="exampleInputPassword1"
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  
</form>
<button onClick={logout} className="btn btn-danger">Logout</button>

            </div>
            <div className='row'>
                {data?.map((e,index)=>(
                    <div key={index} className='col-3'>
                        
                    <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{e.title}</h5>
            <p className="card-text">
              {e.disc}
            </p>
       <div onClick={()=>handelImportant(e._id)}>{e.important===true?<FaHeart color='red' fontSize='2em' />:<CiHeart color='black' fontSize='2em'/>}</div>
            <br></br>
           <button onClick={()=>handelComplete(e._id)} className={e.complete===false?"btn btn-danger":"btn btn-primary"}>
            {e.complete===false ? "In complete": "completed"}</button>
            <br></br>
            <button onClick={()=>handelDelete(e._id)} className='btn btn-danger'>Delete</button>
            <button onClick={()=>handelUpdate(e._id)} className='btn btn-success'>update</button>
          </div>
        </div>
        </div>
                ))}
</div>
            </>
          )
        }
 

export default Home