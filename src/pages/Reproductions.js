import React, { useContext, useEffect } from 'react';
import MediaAnalyticsGetSection from '../pages/chartsSections/mediaAnalyticsGet_Section';
import { IdSiteContext } from '../contexts/idSiteContext';
import { setTitle } from '../components/Header';

const Reproductions = () => {
  const { idSite } = useContext(IdSiteContext);

  useEffect(() => {
    setTitle("Reproducciones");
  }, []);


  return (
    <div className="reproductions">
      <MediaAnalyticsGetSection idSite={idSite} />
    </div>
  );
};

export default Reproductions;
