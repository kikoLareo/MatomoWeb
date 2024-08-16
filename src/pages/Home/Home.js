import React, { useState, useEffect, useContext } from 'react';
import { setTitle } from '../../components/Header';
import { IdSiteContext } from '../../contexts/idSiteContext';
import DataOverviewTable from '../../components/tableComponent';
// import GraphRenderer from '../../utils/GraphRenderer';
import { homeCharts, homeIframes } from './homePageConfig';

const Home = () => {

  // const [metricsData, setMetricsData] = useState({});
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);
  const [iframeHtml, setIframeHtml] = useState([]); // Estado para almacenar el iframe

  useEffect(() => {
    setTitle("Home");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      const data = {};
      for (const chart of homeCharts) {
        if (chart.getData) {
          try {
            const chartData = await chart.getData(idSite);
            console.log(chartData);
            data[chart.title] = chartData.metrics;
          } catch (error) {
            console.error(`Error fetching data for chart ${chart.title}:`, error);
          }
        } else {
          data[chart.title] = chart.metrics;
        }
      }
      // setMetricsData(data);
      setLoading(false);
    };
    fetchData();
  }, [idSite]);

  useEffect(() => {
    const loadIframe = async () => {
      if (homeIframes) {
        try {
          const iframeContent = await Promise.all(homeIframes.map(async (iframe) => {
            console.log(iframe);
            if (iframe.getData) {
              try {
                const iframeData = await iframe.getData(idSite);
                console.log(iframeData);
                return iframeData;
              } catch (error) {
                console.error(`Error fetching data for iframe ${iframe.title}:`, error);
                return null;
              }
            }
            return null;
          }));
          setIframeHtml(iframeContent.filter(content => content !== null)); // Almacena el HTML del iframe en el estado
        } catch (error) {
          console.error("Error loading iframes:", error);
        }
      }
    };
    loadIframe();
  }, [idSite]); // Ejecuta este efecto cuando idSite o pageConfig cambian

  const renderIframe = () => {
    if (iframeHtml.length > 0) {
      try {
        return iframeHtml.map((iframe, index) => (
          <div key={index} className="iframe-container" dangerouslySetInnerHTML={{ __html: iframe }} />
        ));
      } catch (error) {
        console.error("Error rendering iframe:", error);
      }
    }
    return null;
  };

  return (
    <div className="page">
      <div className="pageBody">
        <div className="visitsGraphs">
          {loading ? (
            <div>Loading data...</div>
          ) : (
            <>
              <div className="chartsInfo">
                {homeCharts.map((chartConfig, index) => (
                  <div key={index} className="data-overview-section">
                    <DataOverviewTable 
                      fetchDataFunction={chartConfig.function} 
                    />
                  </div>
                ))}
                {renderIframe()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;