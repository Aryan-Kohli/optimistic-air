import React from "react";
import { Chart } from "react-google-charts";

export default function emotionChart({ emotiondata }) {
  const data = [["Emotion", "Frequency"]];
  emotiondata.forEach((emotion) => {
    const existingRow = data.find((row) => row[0] === emotion);
    if (existingRow) {
      existingRow[1]++;
    } else {
      data.push([emotion, 1]);
    }
  });
  // React.useEffect(() => {
  //   chartdata({ percentage: percentage, emotiondata: emotiondata });
  // }, []);
  return (
    <div>
      <h2 id="Emotionsresulthead">Your Emotions</h2>
      <Chart
        width={"400px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          backgroundColor: "white",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
