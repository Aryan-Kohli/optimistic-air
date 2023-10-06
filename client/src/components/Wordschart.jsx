import React from "react";
import { Chart } from "react-google-charts";

function WordsChart({ percentage }) {
  const data = [
    ["Task", "Percentage"],
    ["Depressed", Math.floor(percentage)],
    ["Normal", 100 - percentage],
  ];

  return (
    <div>
      <h2 id="Overallresulthead">Overall Result</h2>
      <Chart
        width={"400px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          pieHole: 0.4, // Adjust the size of the pie hole (0 to 1)
          colors: ["red", "#008000"], // Green for result, gray for remaining
          backgroundColor: "white",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default WordsChart;
