// src/components/LiveWidget.js

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LiveActions } from "../../modules/Live/Live-actions";

import { IdSiteContext } from "../../contexts/idSiteContext";



const LiveWidget = () => {
    const {idSite} = useContext(IdSiteContext);
  const [widgetHtml, setWidgetHtml] = useState('');
     
  useEffect(() => {
    const fetchWidgetHtml = async () => {
      try {
        const response = await axios.get(LiveActions.widget(idSite).url, {
          headers: {
            'Content-Type': 'text/html',
          },
        });
        setWidgetHtml(response.data);
      } catch (error) {
        console.error('Error fetching widget HTML:', error);
      }
    };

    fetchWidgetHtml();
  }, [idSite]);

  return (
    <div
      className="live-widget"
      dangerouslySetInnerHTML={{ __html: widgetHtml }}
    />
  );
};

export default LiveWidget;
