import { visitFrequency_get, visitorInterest_getNumberOfVisitsByDaysSinceLast, visitorInterest_getNumberOfVisitsPerPage, visitorInterest_getNumberOfVisitsPerVisitDuration, visitsSummary_get, visitTime_getVisitInformationPerLocalTime } from "../../../modules/Visits/visits_actions";

export const visitsCharts_frequency = [
    {
      title: 'Visits - Frequency',
      description: 'Get the frequency of visits.',
      action: "get",
      module: 'Visits',
      period: 'month',
      date: '2024-03-01,yesterday',
      type: 'lineal',
      metrics: ["nb_visits_new", "nb_visits_returning"],
      data : [],
      async getData(idSite){
        this.data = await visitFrequency_get(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.metrics = this.data.info.metadata.metrics;
        }
        console.log('Fetched data for chart:', this, this.data);
  
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
      period: 'month',
      date: '2024-03-01,yesterday',
      type: 'lineal',
      metrics: ["nb_visits", "nb_uniq_visitors"],
      data : [],
      async getData(idSite){
        this.data = await visitTime_getVisitInformationPerLocalTime(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.metrics = this.data.info.metadata.metrics;
        }
        console.log('Fetched data for chart:', this, this.data);

        return this;
      }
    },
    {
      title: 'Visits - Day of Week',
      description: 'Get the visits information by day of week.',
      action: "getByDayOfWeek",
      module: 'VisitsTime',
      period: 'month',
      date: '2024-03-01,yesterday',
      type: 'lineal',
      metrics: ["nb_visits", "nb_uniq_visitors"],
      data : [],
      async getData(idSite){
        this.data = await visitTime_getVisitInformationPerLocalTime(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.metrics = this.data.info.metadata.metrics;
        }
        console.log('Fetched data for chart:', this, this.data);

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
      type: 'bubble',
      metrics: ["nb_visits"],
      data : [],
      async getData(idSite){
        this.data = await visitorInterest_getNumberOfVisitsPerVisitDuration(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.metrics = this.data.info.metadata.metrics;
        }
        console.log('Fetched data for chart:', this, this.data);

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
      type: 'bubble',
      metrics: ["nb_visits"],
      data : [],
      async getData(idSite){
        this.data = await visitorInterest_getNumberOfVisitsPerPage(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.metrics = this.data.info.metadata.metrics;
        }
        console.log('Fetched data for chart:', this, this.data);

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
      type: 'bubble',
      metrics: ["nb_visits"],
      data : [],
      async getData(idSite){
        this.data = await visitorInterest_getNumberOfVisitsByDaysSinceLast(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.metrics = this.data.info.metadata.metrics;
        }
        console.log('Fetched data for chart:', this, this.data);

        return this;
      }
    }
  ];


  export const visitCharts_summary = [
    {
      title: 'Visits - Summary',
      description: 'Get the summary of visits.',
      action: "get",
      module: 'Visits',
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
      data : [],
      async getData(idSite){
        this.data = await visitsSummary_get(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
        }
        console.log('Fetched data for chart:', this, this.data);

        return this;
      }
    },
  ];
  
  
  
  
  
  export var exampleCharts = [ 
    { title: 'Example Chart 1', 
      description: 'This is an example chart.', 
      action: "get", module: 'ExampleModule', 
      data:{
        info: {
          columns: {
            metric1: 'Metric 1',
            metric2: 'Metric 2',
          },
          metadata: {
            metrics: {
              metric1: 'Metric 1',
              metric2: 'Metric 2',
            }
          }},
          value: {
            "2023-01-01": { metric1: 10, metric2: 20 },
            "2023-01-02": { metric1: 20, metric2: 40 },
            "2023-01-03": { metric1: 30, metric2: 60 },
            "2023-01-04": { metric1: 40, metric2: 80 },
            "2023-01-05": { metric1: 50, metric2: 100 }
          },
      },
      metrics: {
        metric1: 'Metric 1',
        metric2: 'Metric 2',
      },
      type: 'lineal',
      selectedMetrics: [],
  
    }, 
      { title: 'Example Chart 2', 
        description: 'This is another example chart.', 
        action: "get", 
        module: 'ExampleModule', 
        data:{
          info: {
            columns: {
              metric1: 'Metric 1',
              metric2: 'Metric 2',
            },
            metadata: {
              metrics: {
                metric1: 'Metric 1',
                metric2: 'Metric 2',
              }
            }},
            value: {
              "2023-01-01": { metric1: 10, metric2: 20 },
              "2023-01-02": { metric1: 20, metric2: 40 },
              "2023-01-03": { metric1: 30, metric2: 60 },
              "2023-01-04": { metric1: 40, metric2: 80 },
              "2023-01-05": { metric1: 50, metric2: 100 }
            },
        },
        metrics: {
          metric1: 'Metric 1',
          metric2: 'Metric 2',
        },
        type: 'lineal',
        selectedMetrics: [],
   
      }, 
      { title: 'Example Chart 3', 
        description: 'Yet another example chart.', 
        action: "get", module: 'ExampleModule', 
        data:{
          info: {
            columns: {
              metric1: 'Metric 1',
              metric2: 'Metric 2',
            },
            metadata: {
              metrics: {
                metric1: 'Metric 1',
                metric2: 'Metric 2',
              }
            }},
            value: {
              "2023-01-01": { metric1: 10, metric2: 20 },
              "2023-01-02": { metric1: 20, metric2: 40 },
              "2023-01-03": { metric1: 30, metric2: 60 },
              "2023-01-04": { metric1: 40, metric2: 80 },
              "2023-01-05": { metric1: 50, metric2: 100 }
            },
        },
        metrics: {
          metric1: 'Metric 1',
          metric2: 'Metric 2',
        },
        type: 'lineal',
        selectedMetrics: [],
      },
    ];
  
    export const exampleCharts2 = [
        {
          "title": "Visitantes que han vuelto",
          "description": "Este informe muestra métricas generales, como visitas de visitantes que regresan, junto con las mismas métricas para visitantes nuevos. Aprenda cómo se desempeñan los visitantes que regresan en general en comparación con los visitantes nuevos.",
          "action": "get",
          "module": "Visits",
          "period": "month",
          "date": "2024-03-01,yesterday",
          "type": "lineal",
          "metrics": {
              "nb_visits_returning": "Visitantes que han vuelto",
              "nb_actions_returning": "Acciones de visitantes que regresan",
              "nb_uniq_visitors_returning": "Visitantes únicos que regresan",
              "nb_users_returning": "Usuarios que retornan",
              "max_actions_returning": "Máximas acciones en una visita de retorno",
              "nb_visits_new": "Nuevas Visitas",
              "nb_actions_new": "Acciones por Nuevas Visitas",
              "nb_uniq_visitors_new": "Nuevos visitantes únicos",
              "nb_users_new": "Nuevos usuarios",
              "max_actions_new": "max_actions_new"
          },
          "data": {
              "value": {
                  "2024-03": {
                      "nb_visits_new": 3,
                      "nb_actions_new": 5,
                      "nb_visits_converted_new": 0,
                      "bounce_count_new": 2,
                      "sum_visit_length_new": 31,
                      "max_actions_new": 3,
                      "bounce_rate_new": "67 %",
                      "nb_actions_per_visit_new": 1.7,
                      "avg_time_on_site_new": 10,
                      "nb_visits_returning": 1,
                      "nb_actions_returning": 1,
                      "nb_visits_converted_returning": 0,
                      "bounce_count_returning": 1,
                      "sum_visit_length_returning": 0,
                      "max_actions_returning": 1,
                      "bounce_rate_returning": "100 %",
                      "nb_actions_per_visit_returning": 1,
                      "avg_time_on_site_returning": 0
                  },
                  "2024-04": {
                      "nb_visits_new": 2,
                      "nb_actions_new": 2,
                      "nb_visits_converted_new": 0,
                      "bounce_count_new": 2,
                      "sum_visit_length_new": 0,
                      "max_actions_new": 1,
                      "bounce_rate_new": "100 %",
                      "nb_actions_per_visit_new": 1,
                      "avg_time_on_site_new": 0,
                      "nb_visits_returning": 4,
                      "nb_actions_returning": 6,
                      "nb_visits_converted_returning": 0,
                      "bounce_count_returning": 3,
                      "sum_visit_length_returning": 123,
                      "max_actions_returning": 3,
                      "bounce_rate_returning": "75 %",
                      "nb_actions_per_visit_returning": 1.5,
                      "avg_time_on_site_returning": 31
                  },
                  "2024-05": {
                      "nb_visits_new": 2,
                      "nb_actions_new": 6,
                      "nb_visits_converted_new": 0,
                      "bounce_count_new": 0,
                      "sum_visit_length_new": 607,
                      "max_actions_new": 3,
                      "bounce_rate_new": "0 %",
                      "nb_actions_per_visit_new": 3,
                      "avg_time_on_site_new": 304,
                      "nb_visits_returning": 1,
                      "nb_actions_returning": 1,
                      "nb_visits_converted_returning": 0,
                      "bounce_count_returning": 1,
                      "sum_visit_length_returning": 0,
                      "max_actions_returning": 1,
                      "bounce_rate_returning": "100 %",
                      "nb_actions_per_visit_returning": 1,
                      "avg_time_on_site_returning": 0
                  },
                  "2024-06": {
                      "nb_visits_new": 11,
                      "nb_actions_new": 43,
                      "nb_visits_converted_new": 0,
                      "bounce_count_new": 3,
                      "sum_visit_length_new": 7122,
                      "max_actions_new": 15,
                      "bounce_rate_new": "27 %",
                      "nb_actions_per_visit_new": 3.9,
                      "avg_time_on_site_new": 647,
                      "nb_visits_returning": 6,
                      "nb_actions_returning": 33,
                      "nb_visits_converted_returning": 0,
                      "bounce_count_returning": 3,
                      "sum_visit_length_returning": 6385,
                      "max_actions_returning": 13,
                      "bounce_rate_returning": "50 %",
                      "nb_actions_per_visit_returning": 5.5,
                      "avg_time_on_site_returning": 1064
                  },
                  "2024-07": {
                      "nb_visits_new": 22,
                      "nb_actions_new": 62,
                      "nb_visits_converted_new": 0,
                      "bounce_count_new": 16,
                      "sum_visit_length_new": 9168,
                      "max_actions_new": 19,
                      "bounce_rate_new": "73 %",
                      "nb_actions_per_visit_new": 2.8,
                      "avg_time_on_site_new": 417,
                      "nb_visits_returning": 9,
                      "nb_actions_returning": 28,
                      "nb_visits_converted_returning": 0,
                      "bounce_count_returning": 1,
                      "sum_visit_length_returning": 6081,
                      "max_actions_returning": 8,
                      "bounce_rate_returning": "11 %",
                      "nb_actions_per_visit_returning": 3.1,
                      "avg_time_on_site_returning": 676
                  },
                  "2024-08": {
                      "nb_visits_new": 2,
                      "nb_actions_new": 2,
                      "nb_visits_converted_new": 0,
                      "bounce_count_new": 2,
                      "sum_visit_length_new": 0,
                      "max_actions_new": 1,
                      "bounce_rate_new": "100 %",
                      "nb_actions_per_visit_new": 1,
                      "avg_time_on_site_new": 0,
                      "nb_visits_returning": 1,
                      "nb_actions_returning": 3,
                      "nb_visits_converted_returning": 0,
                      "bounce_count_returning": 0,
                      "sum_visit_length_returning": 544,
                      "max_actions_returning": 3,
                      "bounce_rate_returning": "0 %",
                      "nb_actions_per_visit_returning": 3,
                      "avg_time_on_site_returning": 544
                  }
              },
              "info": {
                  "website": "Tiivii-pre OTT",
                  "prettyDate": "2024",
                  "metadata": {
                      "category": "Acciones",
                      "subcategory": "Compromiso",
                      "name": "Visitantes que han vuelto",
                      "module": "VisitFrequency",
                      "action": "get",
                      "documentation": "Este informe muestra métricas generales, como visitas de visitantes que regresan, junto con las mismas métricas para visitantes nuevos. Aprenda cómo se desempeñan los visitantes que regresan en general en comparación con los visitantes nuevos.",
                      "metrics": {
                          "nb_visits_returning": "Visitantes que han vuelto",
                          "nb_actions_returning": "Acciones de visitantes que regresan",
                          "nb_uniq_visitors_returning": "Visitantes únicos que regresan",
                          "nb_users_returning": "Usuarios que retornan",
                          "max_actions_returning": "Máximas acciones en una visita de retorno",
                          "nb_visits_new": "Nuevas Visitas",
                          "nb_actions_new": "Acciones por Nuevas Visitas",
                          "nb_uniq_visitors_new": "Nuevos visitantes únicos",
                          "nb_users_new": "Nuevos usuarios",
                          "max_actions_new": "max_actions_new"
                      },
                      "processedMetrics": {
                          "avg_time_on_site_returning": "Duración promedio de una visita que regresa (en segundos)",
                          "nb_actions_per_visit_returning": "Acciones promedio por visitante que regresa",
                          "bounce_rate_returning": "Porcentaje de rebotes por visitantes que regresan",
                          "avg_time_on_site_new": "Promedio de duración de una nueva visita (en segundos)",
                          "nb_actions_per_visit_new": "Promedio Acciones por Nueva Visita",
                          "bounce_rate_new": "Porcentaje de Rebote por Nuevas Visitas"
                      },
                      "metricTypes": {
                          "nb_visits_returning": "number",
                          "nb_actions_returning": "number",
                          "nb_uniq_visitors_returning": "number",
                          "nb_users_returning": "number",
                          "max_actions_returning": "number",
                          "nb_visits_new": "number",
                          "nb_actions_new": "number",
                          "nb_uniq_visitors_new": "number",
                          "nb_users_new": "number",
                          "max_actions_new": "number",
                          "avg_time_on_site_returning": "duration_s",
                          "nb_actions_per_visit_returning": "number",
                          "bounce_rate_returning": "percent",
                          "avg_time_on_site_new": "duration_s",
                          "nb_actions_per_visit_new": "number",
                          "bounce_rate_new": "percent"
                      },
                      "imageGraphUrl": "index.php?module=API&method=ImageGraph.get&idSite=1&apiModule=VisitFrequency&apiAction=get&token_auth=87148f8d4f8a9f7e5e21f6bd705bfdbd&period=year&date=2015-01-01,2024-12-31",
                      "imageGraphEvolutionUrl": "index.php?module=API&method=ImageGraph.get&idSite=1&apiModule=VisitFrequency&apiAction=get&token_auth=87148f8d4f8a9f7e5e21f6bd705bfdbd&period=year&date=2015-01-01,2024-12-31",
                      "uniqueId": "VisitFrequency_get"
                  },
                  "columns": {
                      "nb_visits_returning": "Visitantes que han vuelto",
                      "nb_actions_returning": "Acciones de visitantes que regresan",
                      "nb_uniq_visitors_returning": "Visitantes únicos que regresan",
                      "nb_users_returning": "Usuarios que retornan",
                      "max_actions_returning": "Máximas acciones en una visita de retorno",
                      "nb_visits_new": "Nuevas Visitas",
                      "nb_actions_new": "Acciones por Nuevas Visitas",
                      "nb_uniq_visitors_new": "Nuevos visitantes únicos",
                      "nb_users_new": "Nuevos usuarios",
                      "max_actions_new": "Max_actions_new",
                      "avg_time_on_site_returning": "Duración promedio de una visita que regresa (en segundos)",
                      "nb_actions_per_visit_returning": "Acciones promedio por visitante que regresa",
                      "bounce_rate_returning": "Porcentaje de rebotes por visitantes que regresan",
                      "avg_time_on_site_new": "Promedio de duración de una nueva visita (en segundos)",
                      "nb_actions_per_visit_new": "Promedio Acciones por Nueva Visita",
                      "bounce_rate_new": "Porcentaje de Rebote por Nuevas Visitas"
                  },
                  "reportData": {
                      "nb_visits_new": 42,
                      "nb_actions_new": 120,
                      "max_actions_new": 19,
                      "bounce_rate_new": "60 %",
                      "nb_actions_per_visit_new": 2.9,
                      "avg_time_on_site_new": "00:06:43",
                      "nb_visits_returning": 22,
                      "nb_actions_returning": 72,
                      "max_actions_returning": 13,
                      "bounce_rate_returning": "41 %",
                      "nb_actions_per_visit_returning": 3.3,
                      "avg_time_on_site_returning": "00:09:57",
                      "nb_uniq_visitors_returning": 0,
                      "nb_users_returning": 0,
                      "nb_uniq_visitors_new": 0,
                      "nb_users_new": 0
                  },
                  "reportMetadata": [],
                  "reportTotal": [],
                  "timerMillis": "92"
              }
          }
      
    }
  ]
  