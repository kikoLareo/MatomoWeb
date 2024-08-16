import {Live_getCounter, Live_getLastVisitsDetails, Live_getMostRecentVisitsDateTime } from "../../modules/Live/Live-actions";
import { visitLive_getMap } from "../../modules/Visits/visits_actions";

export const homeCharts = [
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
        function: Live_getCounter,
        async getData(idSite ,lastMinutes = 30) {
            this.data = await Live_getCounter(idSite, lastMinutes);
            return this;
        }
    },
    {
        title: 'Live - Last Visits Details',
        description: 'Get the last visits details.',
        action: "getLastVisitsDetails",
        module: 'Live',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {},
        data: [],
        async getData(idSite) {
            this.data = await Live_getLastVisitsDetails(idSite, this.period, this.date);
            return this;
        }
    },
    {
        title: 'Live - Most Recent Visits DateTime',
        description: 'Get the most recent visits date and time.',
        action: "getMostRecentVisitsDateTime",
        module: 'Live',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {},
        data: [],
        async getData(idSite) {
            this.data = await Live_getMostRecentVisitsDateTime(idSite);
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