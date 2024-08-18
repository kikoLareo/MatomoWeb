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
    period: 'year',
    date: 'yesterday',
    type: 'line',
    metrics: {
      "nb_plays": "Reproducciones",
      "nb_unique_visitors": "Visitantes Únicos",
      "nb_impressions": "Impresiones"
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
            this.metrics = this.data.info.columns || this.data.info.metadata.metrics || this.metrics;
        }
      this.labels = this.data.value.map(item => item.label);
      console.log('Fetched data for chart:', this, this.data);
      return this;
    }
  },
];

export const comparisonChartsConfig = [...mediaAnalyticsCharts,...visitCharts_summary,...visitsCharts_frequency];

console.log('comparisonChartsConfig:', comparisonChartsConfig);