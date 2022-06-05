import "./App.css";
import {Route,Routes} from 'react-router-dom'
import Navbar from "./Components/Navbar";
function App() {
  return <div className="App">
  <Navbar/>
  <Routes>
    <Route path="/login" element/>
  </Routes>
  
  
  </div>;
}

export default App;
