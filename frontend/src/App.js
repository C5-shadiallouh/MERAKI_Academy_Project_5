import "./App.css";
import {Route,Routes} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Login from "./Components/login";
import GetMealByCategory from "./Components/MealsCategory";
import AllMenue from "./Components/allMenue/AllMenue";
import MealPage from "./Components/MealPage";
function App() {
  return <div className="App">
  <Navbar/>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/:name" element={<GetMealByCategory/>}/>
    <Route path="/menu" element={<AllMenue/>}/>
    <Route path="/meals/:id" element={<MealPage/>}/>
<<<<<<< HEAD
=======
  
>>>>>>> 6720da6fcfb5bf335c2ba8d7762c72712af567f3
  </Routes>
  
  
  </div>;
}

export default App;
