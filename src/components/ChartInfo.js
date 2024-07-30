import React, { useState, useEffect } from 'react';
import { fetchChartAnalysis } from '../utils/chatGptApi';

const ChartInfo = ({ title, description, data }) => {
  const [showMore, setShowMore] = useState(false);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    if (showMore && !analysis) {
      const fetchAnalysis = async () => {
        const result = await fetchChartAnalysis(data);
        setAnalysis(result);
      };
      fetchAnalysis();
    }
  }, [showMore, analysis, data]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="chart-info">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleShowMore}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>
      {showMore && (
        <div className="detailed-info">
          <h4>Detailed Analysis</h4>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ChartInfo;
