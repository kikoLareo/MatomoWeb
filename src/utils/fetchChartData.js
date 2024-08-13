// src/utils/fetchChartData.js
export const fetchChartData = async (charts, idSite) => {
    await Promise.all(
      charts.map(async (chartItem) => {
        console.log('Fetching data for chart:', chartItem, idSite);
        await chartItem.getData(idSite);
        console.log('Fetched data for chart:', chartItem);
      })
    );
    return charts;
  };