// src/components/Dashboard.js
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import ChartComponent from '../components/ChartComponent';
// import { mediaAnalyticsFunctions } from '../modules/mediaAnalytics/mediaAnalytics';
// import { IdSiteContext } from '../contexts/idSiteContext';


const Dashboard = () => {
  // const { idSite } = useContext(IdSiteContext);
  // const [selectedCharts, setSelectedCharts] = useState([]);
  // const [chartData, setChartData] = useState({});

  // useEffect(() => {
  //   const fetchDataForCharts = async () => {
  //     try {
  //       const newChartData = {};
  //       for (const chartName of selectedCharts) {
  //         if (mediaAnalyticsFunctions[chartName]) {
  //           const { url, title } = mediaAnalyticsFunctions[chartName](idSite);
  //           const response = await axios.get(url);
  //           newChartData[chartName] = { data: response.data, title };
  //         }
  //       }
  //       setChartData(newChartData);
  //     } catch (error) {
  //       console.error('Error fetching data for charts:', error);
  //     }
  //   };

  //   fetchDataForCharts();
  // }, [selectedCharts, idSite]);



  return (
    <div className="dashboard">
      {/* <div className="options">
        <div className="optionsCharts">
          <h3>Select Charts:</h3>
          <div className="selecter">
            {chartOptions.map((chartName) => (
              <label key={chartName}>
                <input
                  type="checkbox"
                  checked={selectedCharts.includes(chartName)}
                  onChange={() => handleChartSelection(chartName)}
                />
                {mediaAnalyticsFunctions[chartName](idSite).title}
              </label>
            ))}
          </div>
        </div>
      </div> */}
      {/* <div className="graphDashBoard">
        {selectedCharts.map((chartName) => (
          <div key={chartName}>
            <h3>{chartData[chartName]?.title}</h3>
            <ChartComponent data={chartData[chartName]?.data || {}} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;
