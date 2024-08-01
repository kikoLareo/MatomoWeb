// src/components/ChartInfo.js
import React, { useState, useEffect } from 'react';
import { fetchChartAnalysis } from '../utils/chatGptApi';

const ChartInfo = ({ title, description, data, idSite, storedAnalysis, setStoredAnalysis, metric }) => {
  const [showMore, setShowMore] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (showMore && !storedAnalysis[metric]) {
      const fetchAnalysis = async () => {
        setLoading(true);
        setError('');
        try {
          const result = await fetchChartAnalysis(data);
          setAnalysis(result);
          setStoredAnalysis((prev) => ({ ...prev, [metric]: result }));
        } catch (err) {
          setError('Error fetching analysis. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchAnalysis();
    } else {
      setAnalysis(storedAnalysis[metric]);
    }
  }, [showMore, storedAnalysis, data, metric, setStoredAnalysis]);

  return (
    <div className="chart-info">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => setShowMore((prev) => !prev)}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>
      {showMore && (
        <div className="detailed-info">
          <h4>Detailed Analysis</h4>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>{analysis}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartInfo;
