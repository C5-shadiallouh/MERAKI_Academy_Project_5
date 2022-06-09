import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setCart } from "../../redux/reducers/cart/cart"


const Cart=()=>{

    const {carts}=useSelector((state)=>{
        return {
            carts:state.carts.carts
        }
        console.log(carts)
    })

    return (
        <div>
            <h3>سلة التسوق</h3>
        </div>
    )
}
export default Cart