import "./App.css";
import {Route,Routes} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Login from "./Components/login";
import GetMealByCategory from "./Components/MealsCategory";
import AllMenue from "./Components/allMenue/AllMenue";
import MealPage from "./Components/MealPage";
import Register from "./Components/Register/Register";
import Cart from "./Components/cart/Cart"
import Dashboard from "./Components/AdminPanel/Component/Dashboard";
import UsersManagement from "./Components/AdminPanel/UserManagment";
import Edit from "./Components/AdminPanel/Component/EditMeal.js/Edit";
import MainPage from "./Components/MainPage";
import UserList from "./Components/AdminPanel/Component/UserList/UserList";
import MealList from "./Components/AdminPanel/MealList/MealList";
import NewProduct from "./Components/AdminPanel/Component/AddProduct/AddProduct";
import NewUser from "./Components/AdminPanel/Component/AddUser/AddUser";
import ChartLine from "./Components/AdminPanel/Charts/Line/Line";
import Analytic from "./Components/AdminPanel/Component/Analytic/Analytic";
import PAyment from "./Components/CheckoutForm";
function App() {
  return <div className="App">
  <Navbar/>
  <Routes>
    <Route path="/" element={<MainPage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/:name" element={<GetMealByCategory/>}/>
    <Route path="/menu" element={<AllMenue/>}/>
    <Route path="/meals/:id" element={<MealPage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/adminpanel" element={<Dashboard/>}/>
    <Route path="/usersmanagment" element={<UsersManagement/>}/>
    <Route path="/edit-meals/:id" element={<Edit/>}/>
    <Route path="/users" element={<UserList/>}/>
    <Route path="/meals" element={<MealList/>}/>
    <Route path="/addMeale" element={<NewProduct/>}/>
    <Route path="/addUser" element={<NewUser/>}/>
    <Route path="/chart" element={<Analytic/>}/>
    <Route path="/pay" element={<PAyment/>}/>


    <Route path="/f" element={<ChartLine/>}/>



  </Routes>
  
  
  </div>;
}

export default App;
