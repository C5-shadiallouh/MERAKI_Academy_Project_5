import ChartBar from "../../Charts/ChartBar/ChartBar"
import SideBar from "../Dashboard/SideBar/SideBar"
import ChartLine from "../../Charts/Line/Line"

const Analytic=()=>{

    return (
        <div  className="analytic">
            <SideBar/>
            <div className="mmm"><h2>hksnsn</h2></div>
            <div className="ccline">
            <ChartLine/>
            </div>
            <div className="ccbar">
            <ChartBar/>
            </div>
        </div>
    )
}
export default Analytic
/* media */