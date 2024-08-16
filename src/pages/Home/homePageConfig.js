import {Live_getCounter } from "../../modules/Live/Live-actions";
import { visitLive_getMap } from "../../modules/Live/Live-actions";

export const homeCharts_LiveSection = [
    {
        title: 'Live - Counter',
        description: 'Get the live counter information.',
        action: "getCounter",
        module: 'Live',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {
            "visits": "Visits",
            "actions": "Actions",
            "visitors": "Visitors",
            "visitsConverted": "Visits Converted",
        },
        data: [],
        function: Live_getCounter(),
        async getData(idSite ,lastMinutes = 30) {
            this.data = await Live_getCounter(idSite, lastMinutes);
            return this;
        }
    },
  ];

  export const homeIframes = [
    {
        title: 'Visits - Live',
        description: 'Get the live visits information.',
        action: "getLive",
        module: 'VisitsLive',
        period: 'day',
        date: 'today',
        type: 'iframe',
        metrics: {
         
        },
        data : [],
        function: visitLive_getMap,
        async getData(idSite){
          this.data = await visitLive_getMap(idSite)
            return this.data;
        } 
      },  
    ];