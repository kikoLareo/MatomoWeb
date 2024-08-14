import { exampleCharts2, visitsCharts_frequency,visitCharts_interest,visitCharts_summary } from './visitsChartsConfig';

export const pagesConfig = [
  {
    path: '/visotorSummary',
    title: 'Visitas - Resumen del visitante',
    chartsConfig: visitCharts_summary
  },
  {
    path: '/visitTime',
    title: 'Visitas - Tiempo',
    chartsConfig: exampleCharts2,
  },
  {
    path: '/visitFrequency',
    title: 'Visitas - Frecuencia de visitas',
    chartsConfig: visitsCharts_frequency,
  },
  {
    path: '/visitorInterest',
    title: 'Visitas - Interés del visitante',
    chartsConfig: visitCharts_interest
  }
 
];