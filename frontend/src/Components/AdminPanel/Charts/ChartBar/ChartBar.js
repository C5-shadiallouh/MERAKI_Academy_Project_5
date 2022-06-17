import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"

import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/*const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "White",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
}; */

const ChartBar = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    let name = [];
    axios
      .get(`http://localhost:5000/users`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        result.data.result.map((element) => {
          console.log(element);
          name.push(element.firstName);
        });
        setChartData({
          labels:["","max"],

          datasets: [
            {
              label: "عدد الاشخاص في الموقع",
              data:  [0,name.length],
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

       
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
  <div  className="ccchart">

      <h3> عدد زوار الموقع</h3>



      {
        <>
          {
            <Bar
              data={chartData}
              options={{
                title: {
                  display: true,
                  text: "معدل التسجيل في الموقع ",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          }
        </>
      }
</div>
  );
};

export default ChartBar;