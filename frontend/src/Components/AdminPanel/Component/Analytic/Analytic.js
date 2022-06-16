import ChartBar from "../../Charts/ChartBar/ChartBar"
import SideBar from "../Dashboard/SideBar/SideBar"
import Circle from "../../Charts/Circle/Circle"
import ChartLine from "../../Charts/Line/Line"

const Analytic=()=>{

    return (
        <div  className="analytic" style={{ color:"black"}}>
            <SideBar/>
            <Circle/>
            <ChartLine style={{position:"absolute",top:"0%"}}/>
        </div>
    )
}
export default Analytic