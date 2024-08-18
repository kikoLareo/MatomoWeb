// comparisonChartsConfig.js
import { fetchData } from '../../utils/fetchDataHelper';
import { visitCharts_interest, visitCharts_summary, visitCharts_time } from '../Visits/visitPages/visitsChartsConfig';
import { MediaAnalytics_get } from '../../modules/mediaAnalytics/mediaAnalytics';


export const mediaAnalyticsCharts = [
  {
    title: 'Video Titles Overview',
    description: 'Shows the titles of videos and their statistics.',
    action: 'get',
    module: 'MediaAnalytics',
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
        this.data = await fetchData(idSite, { module: this.module, action: this.action, period, date });
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

export const comparisonChartsConfig = [...mediaAnalyticsCharts, ...visitCharts_interest,...visitCharts_summary,...visitCharts_time];

console.log('comparisonChartsConfig:', comparisonChartsConfig);