import React, { useContext } from 'react';
import MediaAnalyticsGetSection from '../pages/chartsSections/mediaAnalyticsGet_Section';
import { IdSiteContext } from '../contexts/idSiteContext';

const Reproductions = () => {
  const { idSite } = useContext(IdSiteContext);

  return (
    <div className="reproductions">
      <MediaAnalyticsGetSection idSite={idSite} />
    </div>
  );
};

export default Reproductions;
