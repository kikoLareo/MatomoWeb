import {  visitsCharts_frequency,visitCharts_interest,visitCharts_summary, visitCharts_time } from './visitsChartsConfig';

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
    components: ["GraphRenderer"]
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
    components: ["chartOptions", "DataOverviewTable", "GraphRenderer"],

  }
 
];