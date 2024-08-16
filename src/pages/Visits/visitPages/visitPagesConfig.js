import {  visitsCharts_frequency,visitCharts_interest,visitCharts_summary, visitCharts_time,  exampleCharts2 } from './visitsChartsConfig';
import { visitLive_getMap } from '../../../modules/Visits/visits_actions';
export const pagesConfig = [
  {
    path: '/visitorSummary',
    title: 'Resumen del visitante',
    chartsConfig:visitCharts_summary,
    components: ["chartOptions", "DataOverviewTable", "GraphRenderer"],
  },
  {
    path: '/visitTime',
    title: 'Tiempo',
    chartsConfig: visitCharts_time,
    components: ["GraphRenderer", "periodSelecter"]
  },
  {
    path: '/visitFrequency',
    title: 'Frecuencia de visitas',
    chartsConfig: visitsCharts_frequency,
    components: ["chartOptions", "DataOverviewTable", "GraphRenderer"],

  },
  {
    path: '/visitorInterest',
    title: 'Interés del visitante',
    chartsConfig: visitCharts_interest,
    components: [ "GraphRenderer"],

  },
  {
    path: '/live',
    title: 'Live',
    chartsConfig: [],
    components: ["iframe", "GraphRenderer"],
    iframe: visitLive_getMap,
  },
  {
    path: '/example',
    title: 'Example',
    chartsConfig: exampleCharts2,
    components: ["chartOptions", "GraphRenderer", "periodSelecter", "dateSelecter"],
  },
 
];