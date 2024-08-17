import {Live_getCounter } from "../../modules/Live/Live-actions";
import { visitLive_getMap } from "../../modules/Live/Live-actions";
import { visitsSummary_get } from "../../modules/Visits/visits_actions";

import { MediaAnalytics_getCurrentMostPlays,MediaAnalytics_getCurrentSumTimeSpent,MediaAnalytics_getCurrentNumPlays } from "../../modules/mediaAnalytics/mediaAnalytics";

export const homeCharts_LiveSection =
    {
        title: 'Live - Counter',
        description: 'Get the live counter information.',
        action: "getCounter",
        module: 'Live',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {
            "visits": "Visitas",
            "actions": "Acciones",
            "visitors": "Visitantes",
            "visitsConverted": "Visitantes Convertidos",
        },
        data: [],
        params: ["lastMinutes"],
        fetchDataFunction: Live_getCounter,
        async getData(idSite ,lastMinutes = 30) {
            this.data = await Live_getCounter(idSite, lastMinutes);
            return this;
        }
    };

  export const homeIframes = [
    {
        title: 'Visits - Live',
        description: 'Get the live visits information.',
        action: "getLive",
        module: 'VisitsLive',
        period: 'day',
        date: 'today',
        type: 'iframe',
        metrics: {},
        data : [],

        fetchDataFunction: visitLive_getMap,
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
            params: ["period"],
            data : [],

            fetchDataFunction: visitsSummary_get,
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
            period: 'day',
            date: '2024-03-01,yesterday',
            type: 'lineal',
            metrics: {
              "nb_visits": "Visitas",
            },
            params: ["period"],
            data : [],

            fetchDataFunction: visitsSummary_get,
            async getData(idSite){ 
              this.data = await visitsSummary_get(idSite, this.period, this.date)
              console.log('Fetched data for chart:', this, this.data);
              return this;
            }
} ;

export const homeCharts_MediaSection = [
    {
        title: 'Media - Current Number of Plays',
        description: 'Get the current number of plays in the last 180 minutes.',
        action: "getCurrentNumPlays",
        module: 'MediaAnalytics',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {
            "value": "Reproducciones",
        },
        data: [],
        params: ["lastMinutes"],

        fetchDataFunction: MediaAnalytics_getCurrentNumPlays,
        async getData(idSite, lastMinutes = 180) {
            this.data = await MediaAnalytics_getCurrentNumPlays(idSite, lastMinutes);

            return this;
        }
    },
    {
        title: 'Media - Current Sum Time Spent',
        description: 'Get the current sum of time spent in the last 180 minutes.',
        action: "getCurrentSumTimeSpent",
        module: 'MediaAnalytics',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {
            "value": "Tiempo de reproducción",
        },
        data: [],
        params: ["lastMinutes"],
        fetchDataFunction: MediaAnalytics_getCurrentSumTimeSpent,
        async getData(idSite, lastMinutes = 180) {
            this.data = await MediaAnalytics_getCurrentSumTimeSpent(idSite, lastMinutes);
            return this;
        }
    },
    {

        title: 'Media - Current Most Plays',
        description: 'Get the current most plays in the last 180 minutes.',
        action: "getCurrentMostPlays",
        module: 'MediaAnalytics',
        period: 'day',
        date: 'today',
        type: 'table',
        metrics: {"value": "Plays"},
        data: [],
        params: ["lastMinutes"],
        fetchDataFunction: MediaAnalytics_getCurrentMostPlays,
        async getData(idSite, lastMinutes = 180, filter_limit = '5') {
            this.data = await MediaAnalytics_getCurrentMostPlays(idSite, lastMinutes, filter_limit);
            console.log('Fetched data for chart:', this, this.data);
            return this;
            }
        }
    
]


