import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      beginAtZero: false,
    },
  },
};

const WeatherChart = ({ data }) => {
  if (!data || !data.list) {
    return <div>Loading...</div>;
  }

  console.log(data);

  const temps = data.list.map((el) => el.main.temp);
  const labels = [
    "12:00",
    "15:00",
    "18:00",
    "21:00",
    "00:00",
    "03:00",
    "06:00",
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temps,
        fill: true,
        borderColor: "#808080",
        tension: 0.2,
        borderWidth: 2,
        pointBackgroundColor: "#808080",
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherChart;
