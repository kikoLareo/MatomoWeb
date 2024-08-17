import {Live_getCounter } from "../../modules/Live/Live-actions";
import { visitLive_getMap } from "../../modules/Live/Live-actions";
import { visitsSummary_get } from "../../modules/Visits/visits_actions";

import { MediaAnalytics_getCurrentMostPlays,MediaAnalytics_getCurrentSumTimeSpent,MediaAnalytics_getCurrentNumPlays } from "../../modules/mediaAnalytics/mediaAnalytics";
import { titles } from "../../utils/dictionaryMetrics/metricsTitles";

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
            "visits": "Visits",
            "actions": "Actions",
            "visitors": "Visitors",
            "visitsConverted": "Visits Converted",
        },
        data: [],
        params: ["lastMinutes"],
        fetchDataFunction: Live_getCounter,
        async getData(idSite ,lastMinutes = 30) {
            this.data = await Live_getCounter(idSite, lastMinutes);
            getLabels(this);

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
            params: ["period", "date"],
            data : [],
            fetchDataFunction: visitsSummary_get,
            async getData(idSite){ 
              this.data = await visitsSummary_get(idSite, this.period, this.date)
              if(this.data.info.metadata){
                this.description = this.data.info.metadata.documentation;
                this.title = this.data.info.metadata.name;
                this.metrics = this.data.info.columns? this.data.info.columns : this.data.info.metadata.metrics || this.metrics;
                getLabels(this);

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
            params: ["period", "date"],
            data : [],
            fetchDataFunction: visitsSummary_get,
            async getData(idSite){ 
              this.data = await visitsSummary_get(idSite, this.period, this.date)
              getLabels(this);

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
            "value": "Plays",
        },
        data: [],
        params: ["lastMinutes"],
        fetchDataFunction: MediaAnalytics_getCurrentNumPlays,
        async getData(idSite, lastMinutes = 180) {
            this.data = await MediaAnalytics_getCurrentNumPlays(idSite, lastMinutes);
            getLabels(this);

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
            "value": "Time Spent",
        },
        data: [],
        params: ["lastMinutes"],
        fetchDataFunction: MediaAnalytics_getCurrentSumTimeSpent,
        async getData(idSite, lastMinutes = 180) {
            this.data = await MediaAnalytics_getCurrentSumTimeSpent(idSite, lastMinutes);
            getLabels(this);

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
            getLabels(this);
            console.log('Fetched data for chart:', this, this.data);
            return this;
            }
        }
    
]

const getLabels = (chart) => {
    var labels = [];
    if (Array.isArray(chart.data.value)) {
        labels = chart.data.value[0].map(item => item.label? item.label : chart.metrics.value);
    } else if (typeof chart.data.value === 'object') {
        labels = Object.keys(chart.data.value);
    } else {
        labels = Object.keys(chart.metrics);
    }
    console.log('labels', labels);

    if(chart.data.info){
        labels.map(label => {
            if(chart.data.info.columns[label]){
                return chart.data.info.columns[label];
            }else if(chart.data.info.metadata.metrics[label]){
                return chart.data.info.metadata.metrics[label];
            }else if(chart.metrics[label]){
                return chart.metrics[label];
            }else if(titles[label]){
                return titles[label];
            }else return label;
        });
    }
}
// export const homeCharts_MediaSection_MostPlays = 