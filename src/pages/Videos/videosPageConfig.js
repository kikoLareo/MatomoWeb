import { MediaAnalytics_getVideoTitles } from "../../modules/mediaAnalytics/mediaAnalytics";

export var videoPageTableConfig = {
    title: 'Video Data Overview',
    columns: [
        { key: 'label', label: 'Video' },
        { key: 'nb_plays', label: 'Reproducciones' },
        { key: 'nb_unique_visitors_plays', label: 'Visitantes Únicos' },
        { key: 'nb_impressions', label: 'Impresiones' },
        { key: 'play_rate', label: 'Tasa de Reproducción' },
        { key: 'finish_rate', label: 'Tasa de Finalización' },
        { key: 'avg_time_watched', label: 'Tiempo Promedio de Visualización' },
        { key: 'avg_completion_rate', label: 'Tasa Promedio de Finalización' },
    ],
    period: 'year',
    date: 'yesterday',
    data: [],
    async getData(idSite) {
        const dataFetch = await MediaAnalytics_getVideoTitles(idSite, this.period, this.date);
        console.log("Data fetch: ", dataFetch);
        this.data = dataFetch.value || [];
        console.log("Data: ", this.data);
        return this;
    }
};