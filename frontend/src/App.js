import "./App.css";
import {Route,Routes} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
function App() {
  return <div className="App">
  <Navbar/>
  <Routes>
    <Route path="/login" element={<Login/>}/>
  </Routes>
  
  
  </div>;
}

export default App;
