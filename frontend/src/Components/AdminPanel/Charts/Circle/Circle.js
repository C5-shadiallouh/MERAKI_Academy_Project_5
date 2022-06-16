import {React,useState,useEffect} from "react";
import axios from "axios";
import { Pie, Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

/* const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [65, 59, 80, 81, 56],
    },
  ],
}; */

const Circle = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    let name = [];
    let price = [];
    axios
      .get(`http://localhost:5000/meals`)
      .then((result) => {
        console.log(result);
        result.data.result.map((element) => {
          console.log(element);
          name.push(element.meal_name);
          price.push(element.meal_price);
        });
        setChartData({
          labels: name,

          datasets: [
            {
              label: "السعر",
              data: price,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        console.log(name);
        console.log(price);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div className="circle" style={{width:"30%" ,height:"30%",position:"absolute",left:"0%"}}>
      <Pie
        data={chartData}
        options={{
          title: {
            display: true,
            text: "معدل المبيعات في الموقع",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
      <br/>
<h2 style={{position:"absolute" ,left:"20%"}}>تحليل كمية المبيعات</h2>
<br/>
<br/>
      <Doughnut
        data={chartData}
        options={{
          title: {
            display: true,
            text: "معدل التسجيل في الموقع  ",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
      <br/>
      <h2 style={{position:"absolute" ,left:"25%"}}>تحليل عدد الزوار</h2>
    </div>
    
  );
};

export default Circle;
