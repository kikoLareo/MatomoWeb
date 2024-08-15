import {  visitsCharts_frequency,visitCharts_interest,visitCharts_summary, visitCharts_time, exampleCharts } from './visitsChartsConfig';

export const pagesConfig = [
  {
    path: '/visitorSummary',
    title: 'Visitas - Resumen del visitante',
    chartsConfig:visitCharts_summary,
    components: ["chartOptions", "DataOverviewTable", "GraphRenderer"],
  },
  {
    path: '/visitTime',
    title: 'Visitas - Tiempo',
    chartsConfig: visitCharts_time,
    components: ["GraphRenderer", "periodSelecter"]
  },
  {
    path: '/visitFrequency',
    title: 'Visitas - Frecuencia de visitas',
    chartsConfig: visitsCharts_frequency,
    components: ["chartOptions", "DataOverviewTable", "GraphRenderer"],

  },
  {
    path: '/visitorInterest',
    title: 'Visitas - Interés del visitante',
    chartsConfig: visitCharts_interest,
    components: [ "GraphRenderer"],

  },
  {
    path: '/example',
    title: 'Example',
    chartsConfig: exampleCharts,
    components: ["chartOptions", "DataOverviewTable", "GraphRenderer", "periodSelecter", "dateSelecter"],
  },
 
];