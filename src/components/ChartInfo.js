// src/components/ChartInfo.js
import React, { useState, useEffect } from 'react';
import { fetchChartAnalysis } from '../utils/chatGptApi';

const ChartInfo = ({ title, description, data, idSite, storedAnalysis, setStoredAnalysis, metric }) => {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (showMore && !storedAnalysis[idSite]?.[metric]) {
        setLoading(true);
        setError('');
        try {
          const result = await fetchChartAnalysis({ title, description, data, idSite });
          setStoredAnalysis(prev => ({
            ...prev,
            [idSite]: {
              ...prev[idSite],
              [metric]: result
            }
          }));
        } catch (err) {
          setError('Error al obtener el análisis. Por favor, inténtelo de nuevo más tarde.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAnalysis();
  }, [showMore, storedAnalysis, data, description, title, idSite, metric, setStoredAnalysis]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const analysis = storedAnalysis[idSite]?.[metric] || '';

  return (
    <div className="chart-info">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleShowMore}>
        {showMore ? 'Mostrar menos' : 'Mostrar más'}
      </button>
      {showMore && (
        <div className="detailed-info">
          <h4>Análisis Detallado</h4>
          {loading ? (
            <p>Cargando...</p>
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
