import "./style.css"

import { React, useState, useEffect } from "react";
import axios from "axios";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
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
        result.data.result.map((element) => {
          name.push(element.meal_name);
          price.push(element.category_id);
        });
        setChartData({
          labels: ["فلافل","حمص","فتة شامية"],

          datasets: [
            {
              label: "السعر",
              data: [30,50,20],
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
    <div className="circlen" style={{position:"absolute",right:"19rem" ,bottom:"17rem" ,height:"10rem"}}
     
    >
      <h2 style={{ position: "absolute", left: "20%" }}>الاصناف الاكثر مبيعا</h2>
      <br/>
      <br/>
      <Pie
        data={chartData} className="ccn" style={{height:"25rem", width:"25rem"}}
        options={{
          title: {
            display: true,
            text: "معدل المبيعات في الموقع",
            fontSize: 20,
          },
          legend: {
            display: true,
          },
        }}
      />
      <br />
      
      
    </div>
  );
};

export default Circle;
