import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const test_data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const options = {
  plugins: {
    title: {
      display: true,
      text: "Budget",
      fontSize: 30,
    },
  },
};
function MonthlyPie({ data, entering }) {
  const [state, setState] = useState(null);
  let processedData = {};
  useEffect(() => {
    // if (!entering) {
    processedData = {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => parseFloat(item.totalValue)),
          backgroundColor: data.map((item) => item.color),
          borderColor: data.map((item) => item.color),
        },
      ],
    };
    setState(processedData);
    // }
  }, [data]);

  return (
    <>
      <div>
        <Pie data={state} options={options} />
      </div>
    </>
  );
}

export default MonthlyPie;
