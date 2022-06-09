import "./App.css";
import {Route,Routes} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Login from "./Components/login";
import GetMealByCategory from "./Components/MealsCategory";
import AllMenue from "./Components/allMenue/AllMenue";
import MealPage from "./Components/MealPage";
import Register from "./Components/Register/Register";
import Cart from "./Components/cart/Cart";
function App() {
  return <div className="App">
  <Navbar/>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/:name" element={<GetMealByCategory/>}/>
    <Route path="/menu" element={<AllMenue/>}/>
    <Route path="/meals/:id" element={<MealPage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/cart" element={<Cart/>}/>
  </Routes>
  
  
  </div>;
}

export default App;
