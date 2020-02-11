import React, { useEffect, useState, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

import Chart from './Chart';

const ChartContainer = (props) => {
  // Destructure props
  const { data, props: chartProps } = props;

  // Setup
  const container = useRef();
  const [chart, updateChart] = useState(null);
  const debouncedResizer = useMemo(() => {
    if(chart){
      return debounce(() => chart.draw(), 250);
    }
  }, [chart]);


  // Initalize
  useEffect(() => {
    const newChart = new Chart(
      container.current,
      chartProps,
      data
    );
    updateChart(newChart);
  }, []);


  // Mount Chart
  useEffect(() => {
    if(chart){
      chart.selection(container.current);
      window.addEventListener('resize', debouncedResizer);

      setTimeout(() => {
        chart.draw()
      }, 50);

      return () => window.removeEventListener('resize', debouncedResizer);
    }
  }, [debouncedResizer, chart]);


  // On Update Data
  useEffect(() => {
    if(chart){
      chart.data(data);
      setTimeout(() => {
        chart.draw()
      }, 50);
    }
  }, [data]);


  // On Update Props
  useEffect(() => {
    if(chart){
      chart.props(chartProps);
      setTimeout(() => {
        chart.draw()
      }, 50);
    }
  }, [chartProps]);

  return (
    <div id='chart' ref={container} />
  );
};

export default ChartContainer;
