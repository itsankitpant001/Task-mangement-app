import Completed from "./pages/Completd"
import Home from "./pages/Home"
import Important from "./pages/important"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/important" element={<Important/>}/>
      <Route path="/completed" element={<Completed/>}/>
    </Routes>
   </Router>
   </>
  )
}

export default App
