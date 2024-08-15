import { visitFrequency_get, visitorInterest_getNumberOfVisitsByDaysSinceLast, visitorInterest_getNumberOfVisitsPerPage, visitorInterest_getNumberOfVisitsPerVisitDuration, visitsSummary_get, visitTime_getByDayOfWeek, visitTime_getVisitInformationPerLocalTime } from "../../../modules/Visits/visits_actions";

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
      function: visitFrequency_get,
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
      period: 'year',
      date: 'yesterday',
      type: 'bar',
      metrics: ["nb_visits"],
      data : [],
      labels: [],
      function: visitTime_getVisitInformationPerLocalTime,
      async getData(idSite, period = this.period, date = this.date){
        this.data = await visitTime_getVisitInformationPerLocalTime(idSite, period, date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.data.value.forEach((value) => {
            console.log('Value:', value);
            if (value.hasOwnProperty('label')) {
              this.labels.push(value.label);
            }else{
              this.labels.push(Object.keys(value)[0]);
            }
          }); 
        }
        console.log('Fetched data for chart:', this, this.data);

        return this;
      },
      
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
        nb_actions:"Acciones",
      },
      data : [],
      labels: [],
      function: visitTime_getByDayOfWeek,
      async getData(idSite){
        this.data = await visitTime_getByDayOfWeek(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.data.value.forEach((value) => {
            if (value.hasOwnProperty('label')) {
              if(!this.labels.includes(value['label'])){
                this.labels.push(value['label']);
              }
            }
          });
          
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
      metrics: {
        nb_actions:"Acciones",
      },
       data : [],
       labels: [],

      function: visitorInterest_getNumberOfVisitsPerVisitDuration,
      async getData(idSite){
        this.data = await visitorInterest_getNumberOfVisitsPerVisitDuration(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.data.value.forEach((value) => {
            if (value.hasOwnProperty('label')) {
              if(!this.labels.includes(value['label'])){
                this.labels.push(value['label']);
              }
            }
          });
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
      metrics: {
        "nb_visits": "Visitas",

      },
            data : [],
      labels: [],

      function: visitorInterest_getNumberOfVisitsPerPage,
      async getData(idSite){
        this.data = await visitorInterest_getNumberOfVisitsPerPage(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;
          this.data.value.forEach((value) => {
          if (value.hasOwnProperty('label')) {
            if(!this.labels.includes(value['label'])){
              this.labels.push(value['label']);
            }
          }
        });
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
      metrics: {
        "nb_visits": "Visitas",

      },
      data : [],
      labels: [],

      function: visitorInterest_getNumberOfVisitsByDaysSinceLast,
      async getData(idSite){
        this.data = await visitorInterest_getNumberOfVisitsByDaysSinceLast(idSite, this.period, this.date)
        if(this.data.info.metadata){
          this.description = this.data.info.metadata.documentation;
          this.title = this.data.info.metadata.name;    
          this.data.value.forEach((value) => {
            if (value.hasOwnProperty('label')) {
              if(!this.labels.includes(value['label'])){
                this.labels.push(value['label']);
              }
            }
          });
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
      function: visitsSummary_get,
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
    {
      "title": "Resumen de visitas",
      "description": "Este informe proporciona una visión muy general de cómo se comportan sus visitantes.",
      "action": "get",
      "module": "Visits",
      "period": "day",
      "date": "2024-03-01,yesterday",
      "type": "lineal",
      "metrics": {
          "sum_visit_length": "Duración total de las visitas (en segundos)",
          "nb_uniq_visitors": "Visitantes únicos",
          "nb_visits": "Visitas",
          "nb_actions": "Acciones",
          "max_actions": "Acciones máximas en una visita",
          "bounce_rate": "Porcentaje de rebote",
          "nb_actions_per_visit": "Acciones por visita",
          "avg_time_on_site": "Promedio de duración de las visitas (en segundos)"
      },
      "data": {
          "value": {
              "2024-03-01": [],
              "2024-03-02": [],
              "2024-03-03": [],
              "2024-03-04": [],
              "2024-03-05": [],
              "2024-03-06": [],
              "2024-03-07": [],
              "2024-03-08": [],
              "2024-03-09": [],
              "2024-03-10": [],
              "2024-03-11": [],
              "2024-03-12": {
                  "label": "2024-03-12",
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-03-13": [],
              "2024-03-14": [],
              "2024-03-15": [],
              "2024-03-16": [],
              "2024-03-17": [],
              "2024-03-18": {
                  "label": "2024-03-18",
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-03-19": [],
              "2024-03-20": [],
              "2024-03-21": [],
              "2024-03-22": [],
              "2024-03-23": [],
              "2024-03-24": [],
              "2024-03-25": [],
              "2024-03-26": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 3,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 31,
                  "max_actions": 3,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 3,
                  "avg_time_on_site": 31
              },
              "2024-03-27": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-03-28": [],
              "2024-03-29": [],
              "2024-03-30": [],
              "2024-03-31": [],
              "2024-04-01": [],
              "2024-04-02": [],
              "2024-04-03": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-04-04": [],
              "2024-04-05": [],
              "2024-04-06": [],
              "2024-04-07": [],
              "2024-04-08": [],
              "2024-04-09": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 3,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 123,
                  "max_actions": 3,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 3,
                  "avg_time_on_site": 123
              },
              "2024-04-10": [],
              "2024-04-11": [],
              "2024-04-12": [],
              "2024-04-13": [],
              "2024-04-14": [],
              "2024-04-15": [],
              "2024-04-16": [],
              "2024-04-17": [],
              "2024-04-18": [],
              "2024-04-19": [],
              "2024-04-20": [],
              "2024-04-21": [],
              "2024-04-22": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 2,
                  "nb_actions": 2,
                  "nb_visits_converted": 0,
                  "bounce_count": 2,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-04-23": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-04-24": [],
              "2024-04-25": [],
              "2024-04-26": [],
              "2024-04-27": [],
              "2024-04-28": [],
              "2024-04-29": [],
              "2024-04-30": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-05-01": [],
              "2024-05-02": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 3,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 71,
                  "max_actions": 3,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 3,
                  "avg_time_on_site": 71
              },
              "2024-05-03": [],
              "2024-05-04": [],
              "2024-05-05": [],
              "2024-05-06": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 3,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 536,
                  "max_actions": 3,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 3,
                  "avg_time_on_site": 536
              },
              "2024-05-07": [],
              "2024-05-08": [],
              "2024-05-09": [],
              "2024-05-10": [],
              "2024-05-11": [],
              "2024-05-12": [],
              "2024-05-13": [],
              "2024-05-14": [],
              "2024-05-15": [],
              "2024-05-16": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-05-17": [],
              "2024-05-18": [],
              "2024-05-19": [],
              "2024-05-20": [],
              "2024-05-21": [],
              "2024-05-22": [],
              "2024-05-23": [],
              "2024-05-24": [],
              "2024-05-25": [],
              "2024-05-26": [],
              "2024-05-27": [],
              "2024-05-28": [],
              "2024-05-29": [],
              "2024-05-30": [],
              "2024-05-31": [],
              "2024-06-01": [],
              "2024-06-02": [],
              "2024-06-03": [],
              "2024-06-04": [],
              "2024-06-05": [],
              "2024-06-06": [],
              "2024-06-07": [],
              "2024-06-08": [],
              "2024-06-09": [],
              "2024-06-10": [],
              "2024-06-11": [],
              "2024-06-12": {
                  "nb_uniq_visitors": 3,
                  "nb_users": 0,
                  "nb_visits": 3,
                  "nb_actions": 28,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 7434,
                  "max_actions": 15,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 9.3,
                  "avg_time_on_site": 2478
              },
              "2024-06-13": {
                  "nb_uniq_visitors": 3,
                  "nb_users": 0,
                  "nb_visits": 3,
                  "nb_actions": 16,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 3788,
                  "max_actions": 7,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 5.3,
                  "avg_time_on_site": 1263
              },
              "2024-06-14": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 2,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 47,
                  "max_actions": 2,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 2,
                  "avg_time_on_site": 47
              },
              "2024-06-15": [],
              "2024-06-16": [],
              "2024-06-17": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-06-18": [],
              "2024-06-19": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 2,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 24,
                  "max_actions": 2,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 2,
                  "avg_time_on_site": 24
              },
              "2024-06-20": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 2,
                  "nb_actions": 2,
                  "nb_visits_converted": 0,
                  "bounce_count": 2,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-06-21": [],
              "2024-06-22": [],
              "2024-06-23": [],
              "2024-06-24": [],
              "2024-06-25": [],
              "2024-06-26": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 3,
                  "nb_actions": 15,
                  "nb_visits_converted": 0,
                  "bounce_count": 2,
                  "sum_visit_length": 836,
                  "max_actions": 13,
                  "bounce_rate": "67 %",
                  "nb_actions_per_visit": 5,
                  "avg_time_on_site": 279
              },
              "2024-06-27": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 3,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 124,
                  "max_actions": 3,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 3,
                  "avg_time_on_site": 124
              },
              "2024-06-28": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 2,
                  "nb_actions": 7,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 1254,
                  "max_actions": 6,
                  "bounce_rate": "50 %",
                  "nb_actions_per_visit": 3.5,
                  "avg_time_on_site": 627
              },
              "2024-06-29": [],
              "2024-06-30": [],
              "2024-07-01": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-07-02": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 5,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 2465,
                  "max_actions": 5,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 5,
                  "avg_time_on_site": 2465
              },
              "2024-07-03": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-07-04": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 2,
                  "nb_actions": 2,
                  "nb_visits_converted": 0,
                  "bounce_count": 2,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-07-05": [],
              "2024-07-06": [],
              "2024-07-07": [],
              "2024-07-08": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-07-09": [],
              "2024-07-10": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 2,
                  "nb_actions": 4,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 65,
                  "max_actions": 3,
                  "bounce_rate": "50 %",
                  "nb_actions_per_visit": 2,
                  "avg_time_on_site": 33
              },
              "2024-07-11": [],
              "2024-07-12": [],
              "2024-07-13": [],
              "2024-07-14": [],
              "2024-07-15": {
                  "nb_uniq_visitors": 3,
                  "nb_users": 0,
                  "nb_visits": 4,
                  "nb_actions": 16,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 3270,
                  "max_actions": 8,
                  "bounce_rate": "25 %",
                  "nb_actions_per_visit": 4,
                  "avg_time_on_site": 818
              },
              "2024-07-16": {
                  "nb_uniq_visitors": 4,
                  "nb_users": 0,
                  "nb_visits": 5,
                  "nb_actions": 9,
                  "nb_visits_converted": 0,
                  "bounce_count": 2,
                  "sum_visit_length": 2420,
                  "max_actions": 3,
                  "bounce_rate": "40 %",
                  "nb_actions_per_visit": 1.8,
                  "avg_time_on_site": 484
              },
              "2024-07-17": {
                  "nb_uniq_visitors": 4,
                  "nb_users": 0,
                  "nb_visits": 5,
                  "nb_actions": 21,
                  "nb_visits_converted": 0,
                  "bounce_count": 2,
                  "sum_visit_length": 2504,
                  "max_actions": 13,
                  "bounce_rate": "40 %",
                  "nb_actions_per_visit": 4.2,
                  "avg_time_on_site": 501
              },
              "2024-07-18": [],
              "2024-07-19": [],
              "2024-07-20": [],
              "2024-07-21": [],
              "2024-07-22": {
                  "nb_uniq_visitors": 3,
                  "nb_users": 0,
                  "nb_visits": 3,
                  "nb_actions": 23,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 3872,
                  "max_actions": 19,
                  "bounce_rate": "33 %",
                  "nb_actions_per_visit": 7.7,
                  "avg_time_on_site": 1291
              },
              "2024-07-23": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 2,
                  "nb_visits_converted": 0,
                  "bounce_count": 0,
                  "sum_visit_length": 653,
                  "max_actions": 2,
                  "bounce_rate": "0 %",
                  "nb_actions_per_visit": 2,
                  "avg_time_on_site": 653
              },
              "2024-07-24": [],
              "2024-07-25": [],
              "2024-07-26": [],
              "2024-07-27": [],
              "2024-07-28": [],
              "2024-07-29": {
                  "nb_uniq_visitors": 4,
                  "nb_users": 0,
                  "nb_visits": 4,
                  "nb_actions": 4,
                  "nb_visits_converted": 0,
                  "bounce_count": 4,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-07-30": [],
              "2024-07-31": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-08-01": [],
              "2024-08-02": [],
              "2024-08-03": [],
              "2024-08-04": [],
              "2024-08-05": [],
              "2024-08-06": [],
              "2024-08-07": {
                  "nb_uniq_visitors": 2,
                  "nb_users": 0,
                  "nb_visits": 2,
                  "nb_actions": 4,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 544,
                  "max_actions": 3,
                  "bounce_rate": "50 %",
                  "nb_actions_per_visit": 2,
                  "avg_time_on_site": 272
              },
              "2024-08-08": {
                  "nb_uniq_visitors": 1,
                  "nb_users": 0,
                  "nb_visits": 1,
                  "nb_actions": 1,
                  "nb_visits_converted": 0,
                  "bounce_count": 1,
                  "sum_visit_length": 0,
                  "max_actions": 1,
                  "bounce_rate": "100 %",
                  "nb_actions_per_visit": 1,
                  "avg_time_on_site": 0
              },
              "2024-08-09": [],
              "2024-08-10": [],
              "2024-08-11": [],
              "2024-08-12": [],
              "2024-08-13": [],
              "2024-08-14": []
          },
          "info": {
              "website": "Tiivii-pre OTT",
              "prettyDate": "2024",
              "metadata": {
                  "category": "Visitantes",
                  "subcategory": "General",
                  "name": "Resumen de visitas",
                  "module": "VisitsSummary",
                  "action": "get",
                  "documentation": "Este informe proporciona una visión muy general de cómo se comportan sus visitantes.",
                  "metrics": {
                      "nb_visits": "Visitas",
                      "nb_actions": "Acciones",
                      "max_actions": "Acciones máximas en una visita"
                  },
                  "metricsDocumentation": {
                      "nb_visits": "Se considerará como una nueva visita si el visitante viene a tu sitio web por primera vez o si la visita se produce 30 minutos después de la última interacción.",
                      "nb_actions": "El número de acciones llevadas a cabo por sus visitantes. Las acciones incluyen cada vez que se ve una página, se descarga un archivo o se hace clic a un enlace externo.",
                      "bounce_rate": "El porcentaje de visitas que únicamente han observado una página. Esto significa que el visitante salió del sitio de internet directamente desde la página principal.",
                      "nb_actions_per_visit": "El número medio de acciones (visitas, descargas y enlaces externos) que han sido llevadas a cabo durante las visitas.",
                      "avg_time_on_site": "La duración promedio de una visita."
                  },
                  "processedMetrics": {
                      "bounce_rate": "Porcentaje de rebote",
                      "nb_actions_per_visit": "Acciones por visita",
                      "avg_time_on_site": "Promedio de duración de las visitas (en segundos)"
                  },
                  "metricTypes": {
                      "nb_visits": "number",
                      "nb_users": "number",
                      "nb_actions": "number",
                      "max_actions": "number",
                      "bounce_rate": "percent",
                      "nb_actions_per_visit": "number",
                      "avg_time_on_site": "duration_s"
                  },
                  "imageGraphUrl": "index.php?module=API&method=ImageGraph.get&idSite=1&apiModule=VisitsSummary&apiAction=get&token_auth=87148f8d4f8a9f7e5e21f6bd705bfdbd&period=year&date=2015-01-01,2024-12-31",
                  "imageGraphEvolutionUrl": "index.php?module=API&method=ImageGraph.get&idSite=1&apiModule=VisitsSummary&apiAction=get&token_auth=87148f8d4f8a9f7e5e21f6bd705bfdbd&period=year&date=2015-01-01,2024-12-31",
                  "uniqueId": "VisitsSummary_get"
              },
              "columns": {
                  "nb_visits": "Visitas",
                  "nb_actions": "Acciones",
                  "max_actions": "Acciones máximas en una visita",
                  "bounce_rate": "Porcentaje de rebote",
                  "nb_actions_per_visit": "Acciones por visita",
                  "avg_time_on_site": "Promedio de duración de las visitas (en segundos)"
              },
              "reportData": {
                  "nb_visits": 64,
                  "nb_actions": 192,
                  "max_actions": 19,
                  "nb_actions_per_visit": 3,
                  "avg_time_on_site": "00:07:50",
                  "bounce_rate": "53 %"
              },
              "reportMetadata": [],
              "reportTotal": [],
              "timerMillis": "71"
          }
      }
  }
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
          data: {
              value:[ {
                
                    "label": "Lunes",
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
                  {
                    "label": "Martes",

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
                  {
                    "label": "Miercoles",

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
                  {
                    "label": "Jueves",

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
                  {
                    "label": "Viernes",

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
                  {
                    "label": "Sabado",
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
                ],
              
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
            
        },
        async getData() {
          if(this.data.info.columns){
            this.metrics = Object.keys(this.data.info.columns);
            console.log("metrics", this.metrics);
          }else if(this.data.info.metadata.metrics){
            this.metrics = Object.keys(this.data.info.metadata.metrics);
            console.log("metrics", this.metrics);
          }

          if(this.data.value){
            console.log("data", this.data.value);
            this.labels = this.data.value.map((value) => {
              console.log(value);
              if (value.hasOwnProperty('label')) {
                
                  console.log(value['label']);
                  return value['label'];
                }
              
              return null;
            });
            console.log("labels", this.labels);
          }
        }
      
    }
  ]
  