import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../data'
import Chart from 'react-apexcharts'
import './style.scss'

import Loader from '../Loader'

const ApexChart = (country) => {
  const [dailyData, setDailyData] = useState([]);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    const fetchCountryDailyData = async () => {
      setLoader(true);
      const data = await fetchDailyData(country.country);
      setDailyData(data);
      setLoader(false)
    }
    fetchCountryDailyData();
  }, [country])

  return (
    <>
    {loader && <Loader />}
      <section className="watcher-chart-container">
        <Chart
          className="chart"
          options={{
            colors:['#eeff00', '#b80101', '#00ff00'],
            chart: {
              type: "area"
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "smooth"
            },
            xaxis: {
              type: "datetime",
              categories: dailyData.map(item => item.Date)
            },
            tooltip: {
              x: {
                format: "dd/MM/yy HH/mm"
              }
            }
          }}
          series={[
            {
              name: "Cases",
              data: dailyData.map(item => item.Confirmed)
            },
            {
              name: "Deaths",
              data: dailyData.map(item => item.Deaths)
            },
            {
              name: "Recovered",
              data: dailyData.map(item => item.Recovered)
            },
          ]}

          height={350}
        />
      </section>
    </>
  )
}

export default ApexChart