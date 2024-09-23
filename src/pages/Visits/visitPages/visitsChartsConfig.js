import { visitFrequency_get, visitorInterest_getNumberOfVisitsByDaysSinceLast, visitorInterest_getNumberOfVisitsPerPage, visitorInterest_getNumberOfVisitsPerVisitDuration, visitsSummary_get, visitTime_getByDayOfWeek, visitTime_getVisitInformationPerLocalTime } from "../../../modules/Visits/visits_actions";

export const visitsCharts_frequency = [
  {
    title: 'Visitas - Frequencia',
    description: 'Get the frequency of visits.',
    action: "get",
    module: 'Visits',
    period: 'year',
    date: '2024-03-01,yesterday',
    type: 'lineal',
    metrics: {
      "nb_visits_new": "Nuevas visitas",
      "nb_visits_returning": "Visitas que regresan"
    },
    data: [],
    data_table: [],
    params: ["period"],
    fetchDataFunction: visitFrequency_get,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitFrequency_get(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.metrics = this.data.info.columns || this.data.info.metadata.metrics || this.metrics;
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitFrequency_get(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  },
];

export const visitCharts_time = [
  {
    title: 'Visits - Time',
    description: 'Get the visits information over time.',
    action: "getVisitInformationPerLocalTime",
    module: 'VisitsTime',
    period: 'year',
    date: 'yesterday',
    type: 'bar',
    metrics: ["nb_visits"],
    data: [],
    data_table: [],
    labels: [],
    params: ["period"],
    fetchDataFunction: visitTime_getVisitInformationPerLocalTime,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitTime_getVisitInformationPerLocalTime(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.title = this.data.info.metadata.name;
        this.data.value.forEach((value) => {
          console.log('Value:', value);
          if (value.hasOwnProperty('label')) {
            this.labels.push(value.label);
          } else {
            this.labels.push(Object.keys(value)[0]);
          }
        });
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitTime_getVisitInformationPerLocalTime(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  },
  {
    title: 'Visits - Day of Week',
    description: 'Get the visits information by day of week.',
    action: "getByDayOfWeek",
    module: 'VisitsTime',
    period: 'year',
    date: 'yesterday',
    type: 'bar',
    metrics: {
      nb_actions: "Acciones",
    },
    data: [],
    data_table: [],
    labels: [],
    params: ["period"],
    fetchDataFunction: visitTime_getByDayOfWeek,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitTime_getByDayOfWeek(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.title = this.data.info.metadata.name;
        this.data.value.forEach((value) => {
          if (value.hasOwnProperty('label')) {
            if (!this.labels.includes(value['label'])) {
              this.labels.push(value['label']);
            }
          }
        });
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitTime_getByDayOfWeek(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  }
];

export const visitCharts_interest = [
  {
    title: 'Visitor Interest - Visit Duration',
    description: 'Get the number of visits per visit duration.',
    action: "getNumberOfVisitsPerVisitDuration",
    module: 'VisitorInterest',
    period: 'year',
    date: 'yesterday',
    type: 'bar',
    metrics: {
      nb_actions: "Acciones",
    },
    data: [],
    data_table: [],
    labels: [],
    params: ["period"],
    fetchDataFunction: visitorInterest_getNumberOfVisitsPerVisitDuration,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitorInterest_getNumberOfVisitsPerVisitDuration(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.title = this.data.info.metadata.name;
        this.data.value.forEach((value) => {
          if (value.hasOwnProperty('label')) {
            if (!this.labels.includes(value['label'])) {
              this.labels.push(value['label']);
            }
          }
        });
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitorInterest_getNumberOfVisitsPerVisitDuration(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  },
  {
    title: 'Visitor Interest - Page Views',
    description: 'Get the number of visits per page views.',
    action: "getNumberOfVisitsPerPage",
    module: 'VisitorInterest',
    period: 'year',
    date: 'yesterday',
    type: 'bar',
    metrics: {
      "nb_visits": "Visitas",
    },
    data: [],
    data_table: [],
    labels: [],
    params: ["period"],
    fetchDataFunction: visitorInterest_getNumberOfVisitsPerPage,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitorInterest_getNumberOfVisitsPerPage(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.title = this.data.info.metadata.name;
        this.data.value.forEach((value) => {
          if (value.hasOwnProperty('label')) {
            if (!this.labels.includes(value['label'])) {
              this.labels.push(value['label']);
            }
          }
        });
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitorInterest_getNumberOfVisitsPerPage(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  },
  {
    title: 'Visitor Interest - Days Since Last Visit',
    description: 'Get the number of visits by days since last visit.',
    action: "getNumberOfVisitsByDaysSinceLast",
    module: 'VisitorInterest',
    period: 'year',
    date: 'yesterday',
    type: 'bar',
    metrics: {
      "nb_visits": "Visitas",
    },
    data: [],
    data_table: [],
    labels: [],
    params: ["period"],
    fetchDataFunction: visitorInterest_getNumberOfVisitsByDaysSinceLast,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitorInterest_getNumberOfVisitsByDaysSinceLast(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.title = this.data.info.metadata.name;
        this.data.value.forEach((value) => {
          if (value.hasOwnProperty('label')) {
            if (!this.labels.includes(value['label'])) {
              this.labels.push(value['label']);
            }
          }
        });
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitorInterest_getNumberOfVisitsByDaysSinceLast(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  }
];

export const visitCharts_summary = [
  {
    title: 'Visitas - Resumen',
    description: 'Get the summary of visits.',
    action: "get",
    module: 'VisitsSummary',
    period: 'day',
    date: '2024-03-01,yesterday',
    type: 'lineal',
    metrics: {
      "sum_visit_length": "Duración total de las visitas (en segundos)",
      "nb_uniq_visitors": "Visitantes únicos",
      "nb_visits": "Visitas",
      "nb_actions": "Acciones",
      "max_actions": "Acciones máximas en una visita",
      "bounce_rate": "Porcentaje de rebote",
      "nb_actions_per_visit": "Acciones por visita",
      "avg_time_on_site": "Promedio de duración de las visitas (en segundos)"
    },
    data: [],
    data_table: [],
    params: ["period"],
    fetchDataFunction: visitsSummary_get,
    async getData(idSite, period = this.period, date = this.date) {
      this.data = await visitsSummary_get(idSite, period, date)
      if (this.data.info.metadata) {
        this.description = this.data.info.metadata.documentation;
        this.title = this.data.info.metadata.name;
        this.metrics = this.data.info.columns ? this.data.info.columns : this.data.info.metadata.metrics || this.metrics;
      }
      console.log('Fetched data for chart:', this, this.data);

      return this;
    },
    async getTableData(idSite, period = this.period, date = this.date) {
      this.data_table = await visitsSummary_get(idSite, period, date)
      console.log('Fetched data for chart:', this, this.data_table);

      return this;
    }
  },
];
