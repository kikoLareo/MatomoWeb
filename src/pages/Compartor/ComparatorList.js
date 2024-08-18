// comparisonChartsConfig.js
import { fetchData } from '../../utils/fetchDataHelper';
import {  visitCharts_summary,  visitsCharts_frequency } from '../Visits/visitPages/visitsChartsConfig';
import { MediaAnalytics_get } from '../../modules/mediaAnalytics/mediaAnalytics';
import { getBaseUrl } from '../../modules/common/common';




export const mediaAnalyticsCharts = [
  {
    title: 'Video Analytics',
    description: 'Shows the titles of videos and their statistics.',
    action: 'get',
    module: 'API',
    method: 'MediaAnalytics.get',
    period: 'day',
    date: '2024-03-01,yesterday',
    type: 'line',
    metrics: {
      finish_rate  : "Ratio de finalización",
      nb_finishes  : "Finalizaciones",
      nb_impressions  : "Impresiones",
      nb_plays  : "Reproducciones",
      nb_unique_visitors_impressions  : "Visitantes únicos (impresiones)",
      nb_unique_visitors_plays  : "Visitantes únicos (reproducciones)",
      play_rate  : "Ratio de reproducción",
      sum_total_audio_impressions  : "Total de impresiones de audio",
      sum_total_audio_plays  : "Total de reproducciones de audio",
      sum_total_time_watched  : "Tiempo total de visualización",
      sum_total_video_impressions  : "Total de impresiones de vídeo",
      sum_total_video_plays  : "Total de reproducciones de vídeo" 
    
    },
    data: [],
    labels: [],
    params: ["period"],
    fetchDataFunction: MediaAnalytics_get,
    async getData(idSite, period = this.period, date = this.date) {
        this.data = await fetchData(idSite, { module: this.module, action: this.action, url: getBaseUrl(this.module ,this.method, { idSite, period, date }) });
        if (this.data.info.metadata) {
            this.description = this.data.info.metadata.documentation;
            this.title = this.data.info.metadata.name;
        }
      console.log('Fetched data for chart:', this, this.data);
      return this;
    }
  },
];

export const comparisonChartsConfig = [...mediaAnalyticsCharts,...visitCharts_summary,...visitsCharts_frequency];

console.log('comparisonChartsConfig:', comparisonChartsConfig);