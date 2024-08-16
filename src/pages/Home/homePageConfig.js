import {Live_getCounter } from "../../modules/Live/Live-actions";
import { visitLive_getMap } from "../../modules/Live/Live-actions";
import { visitsSummary_get } from "../../modules/Visits/visits_actions";

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
    

    export const homeCharts_VisitsSection_Overview = [
        {
            title: 'Visits - Summary',
            description: 'Get the summary of visits.',
            action: "get",
            module: 'VisitsSummary',
            period: 'year',
            date: 'yesterday',
            type: 'lineal',
            metrics: {
              "nb_visits": "Visitas",
            },
            data : [],
            function: visitsSummary_get,
            async getData(idSite){ 
              this.data = await visitsSummary_get(idSite, this.period, this.date)
              if(this.data.info.metadata){
                this.description = this.data.info.metadata.documentation;
                this.title = this.data.info.metadata.name;
                this.metrics = this.data.info.columns? this.data.info.columns : this.data.info.metadata.metrics || this.metrics;

              }
              console.log('Fetched data for chart:', this, this.data);
      
              return this;
            }
        }
    ];
    
export const  homeCharts_VisitsSection_Evolution = 
        {
            title: 'Visits - Evolution',
            description: 'Get the evolution of visits over time.',
            action: "get",
            module: 'VisitsSummary',
            period: 'year',
            date: '2024-03-01,yesterday',
            type: 'line',
            metrics: {
              "nb_visits": "Visitas",
            },
            data : [],
            function: visitsSummary_get,
            async getData(idSite){ 
              this.data = await visitsSummary_get(idSite, this.period, this.date)
              console.log('Fetched data for chart:', this, this.data);
              return this;
            }
        } ;