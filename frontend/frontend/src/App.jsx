import Navbar from "./component/Navbar"
import Completed from "./pages/Completd"
import Home from "./pages/Home"
import Important from "./pages/important"
import Incomplete from "./pages/Incomplete"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'

function App() {
  return (
   <>
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/important" element={<Important/>}/>
      <Route path="/complete" element={<Completed/>}/>
      <Route path="/incomplete" element={<Incomplete/>}/>
      <Route path="*" element={<Login/>}/>
    </Routes>
   </Router>
   </>
  )
}

export default App
