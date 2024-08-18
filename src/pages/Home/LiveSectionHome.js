
// LiveSectionHome.js
import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { homeIframes } from './homePageConfig';
import DataOverviewTable from '../../components/tableComponent';
import { homeCharts_LiveSection } from './homePageConfig';
const LiveSectionHome = () => {
  const { idSite } = useContext(IdSiteContext);
  const [iframeHtml, setIframeHtml] = useState([]);


  useEffect(() => {
    const loadIframe = async () => {
      if (homeIframes) {
        try {
          const iframeContent = await Promise.all(homeIframes.map(async (iframe) => {
            if (typeof iframe.getData === 'function') {
              try {
                const iframeData = await iframe.getData(idSite);
                return iframeData;
              } catch (error) {
                console.error(`Error fetching data for iframe ${iframe.title}:`, error);
                return null;
              }
            }
            return null;
          }));
          setIframeHtml(iframeContent.filter(content => content !== null));
        } catch (error) {
          console.error("Error loading iframes:", error);
        }
      }
    };
    loadIframe();
  }, [idSite]);

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
    <div className="LiveSection" style={{ width: "35vw" }}>
      <h1>Live Overview</h1>
      <div className="LiveGraph">
          <div className="data-overview-section">
            <DataOverviewTable chartConfig={homeCharts_LiveSection} />
          </div>
          {renderIframe()}
       </div>
    </div>
  );
};

export default LiveSectionHome;