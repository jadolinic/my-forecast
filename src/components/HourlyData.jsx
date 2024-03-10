import React, { useContext } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Context from "../context/Context";

const HourlyData = () => {
  const { chart, selectedDate, dataLoaded } = useContext(Context);

  let seriesArray = [
    {
      name: "Temperature °C ",
      data: chart,
    },
  ];

  const today = new Date();

  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  // Format into YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`; // spremamo trenutni dan u kojem se nalazimo
  const plotLineObject =
    selectedDate > formattedDate // radimo provjeru ukoliko dan koji smo odabrali iz kartice je veći od trenutnog i vraća crvenu liniju
      ? {}
      : {
          color: "red",
          width: 2,
          value: new Date().getHours() + "." + new Date().getMinutes(),
          zIndex: 5,
        };

  let options = {
    title: {
      text: "Temperature for the next 24 hours",
    },
    xAxis: {
      plotLines: [plotLineObject],
      tickLength: 10,
      tickWidth: 1,
      tickColor: "black",
      tickmarkPlacement: "on",
      title: {
        text: "Time (hours)",
      },
      categories: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: seriesArray,
  };

  if (dataLoaded !== undefined && dataLoaded) {
    return (
      <div className="highchart">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          className="chart"
        />
      </div>
    );
  }
};

export default HourlyData;
