/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'react-apexcharts';

function Donut({ data }) {
  const state = {
    options: {},
    series: data.series,
    labels: data.labels
  };
  return (
    <div className="donut">
      <Chart options={state.options} series={state.series} type="donut" width="380" />
    </div>
  );
}

export default Donut;
