import { useEffect } from 'react';
import {NavLink,useLocation,useNavigate} from 'react-router-dom'
function Navbar() {
    const navigate=useNavigate()
        const logout=()=>{
            window.localStorage.clear("token")
            navigate('/login')
       }
    const location = useLocation();
  useEffect(() => {
   //whenever your page uses navigate it will refresh the navbar page
  }, [location]);
    const id=window.localStorage.getItem('id')
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        Task Management
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          {id ? <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">
              Home
            </NavLink>
          </li>:""}
          {id?<li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/important">
            Important-Task
            </NavLink>
          </li>:""}
          {id?<li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/complete">
            Completed-Task
            </NavLink>
          </li>:""}
          {id?<li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/incomplete">
            Incompleted-Task
            </NavLink>
          </li>:""}
          {!id?<li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/login">
            Login
            </NavLink>
          </li>:""}
          {!id?<li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/register">
            Register
            </NavLink>
          </li>:""}
          {id?<li className="nav-item">
            <button onClick={logout} className='btn btn-danger'>Logout</button>
          </li>:""}
        </ul>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Navbar