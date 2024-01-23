import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { publicActions } from "../../redux/actions";
const Chart = ({ name, getSeenList, seenList, client, userData }) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (client) {
      getSeenList({ clientId: userData?._id });
    } else {
      getSeenList();
    }
  }, [client]);

  useEffect(() => {
    if (seenList?.length) {
      console.log(seenList);
      let val = [];
      seenList.map((item) => {
        val.push([new Date(item[0]).getTime(), item[1]]);
      });
      setValue(val);
    }
  }, [seenList]);
  let values = {
    series: [
      {
        name: "بازدید",
        data: value,
        // function generateDayWiseTimeSeries(s, count) {
        //     var values = [
        //       4,3,10,9,29,19,25,9,12,7,19,5,13,9,17,2,7,5
        //     ]
        //     var i = 0;
        //     var series = [];
        //     var x = new Date().getTime();
        //     while (i < 10) {
        //       series.push([x, values[i]]);
        //       x += 86400000;
        //       i++;
        //     }
        //     return series;
        //   }()
      },
    ],
    options: {
      colors: ["#8EDC18"],
      chart: {
        type: "area",
        stacked: false,
        height: "100%",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      grid: {
        column: {
          colors: ["#F44336", "#E91E63", "#9C27B0"],
        },
      },
      dataLabels: {
        enabled: false,

        style: {
          colors: ["#F44336", "#E91E63", "#9C27B0"],
        },
      },
      markers: {
        size: 0,
      },
      title: {
        text: "تعداد بازدید",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        title: {
          text: "Seen",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,

        x: {
          format: "dd MMM yyyy",
        },

        y: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    },
  };
  return (
    <div
      id="chart"
      className="w-full h-full bg-gray-950 p-3 rounded-lg shadow-lg"
    >
      <ReactApexChart
        options={values.options}
        series={values.series}
        type="area"
        height={600}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  seenList: state.publicState.seenList,
  userData: state.userState.userData,
  client: state.userState.client,
});
const mapDispatchToProps = {
  getSeenList: publicActions.getSeenData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
