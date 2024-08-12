// src/components/ChartInfo.js
import React, { useState, useEffect, useContext } from 'react';
import { fetchAndSaveAnalysis } from '../utils/gpt/fetchAndSave';
import { IdSiteContext } from '../contexts/idSiteContext';

const ChartInfo = ({ title, description, data, module, action }) => {
  const { idSite } = useContext(IdSiteContext);
  const [showMore, setShowMore] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (showMore && !analysis) {
      const fetchAnalysis = async () => {
        setLoading(true);
        setError('');
        try {
          const result = await fetchAndSaveAnalysis({ module, action, title, description, idSite, data });
          setAnalysis(result);
        } catch (err) {
          console.error(err);
          setError('Error fetching analysis. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchAnalysis();
    }
  }, [showMore, analysis, title, description, data, idSite, module, action]);

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
