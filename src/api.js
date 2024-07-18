import axios from 'axios';
import graficaUrl from './config/Urls';

const baseURL = 'https://tiivii-ott.matomo.cloud/';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

export const getData = async () => {
  try {
    const response = await api.get(graficaUrl);

    console.log('Matomo Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return []; // Devolver un array vacío en caso de error
  }
};

/**
 * // $(document).ready( async function() {

    // let matomoURL1 = `https://tiivii-ott.matomo.cloud/index.php?module=API&format=JSON&idSite=${idSite}&period=range&date=${inputFechaInicio.value},${inputFechaFin.value}&method=MediaAnalytics.getVideoTitles&filter_column=label&filter_pattern=ID%3A+${petiscoID}&secondaryDimension=spent_time&format_metrics=1&expanded=1&token_auth=${token}`;
    // const response_matomoURL1 = await fetch(matomoURL1)
    // const Data_0_matomoURL1 = response_matomoURL1[0]
    // const Data_matomoURL1 = await Data_0_matomoURL1.json();

    // console.log(Data_matomoURL1)

    // let matomoURL2 = `https://tiivii-ott.matomo.cloud/index.php?module=API&format=JSON&idSite=${idSite}&period=range&date=${inputFechaInicio.value},${inputFechaFin.value}&method=MediaAnalytics.getVideoTitles&filter_column=label&filter_pattern=ID%3A+${petiscoID}&secondaryDimension=media_progress&format_metrics=1&expanded=1&token_auth=${token}`
    // const response_matomoURL2 = await fetch(matomoURL2)
    // const Data_0_matomoURL2 = response_matomoURL2[0]
    // const Data_matomoURL2 = await Data_0_matomoURL2.json();

    // console.log(Data_matomoURL2)

    // const labels = Data_matomoURL1.map(item => item.label);
    // const nbPlays = Data_matomoURL1.map(item => item.nb_plays || 0);

    // const labels2 = Data_matomoURL2.map(item => item.label);
    // const nbPlays2 = Data_matomoURL2.map(item => item.nb_plays || 0);

    // //**charts */
    // $(function () {
    // //** Data and config for chartjs */
    // 'use strict';
    // if (labels.length === 0 || nbPlays.length === 0) {
    //     // Mostrar mensaje de "No hay datos"
    //     $("#barChart").html("<p>No hay datos disponibles.</p>");
    // } else {
    //     var barChartData = {
    //         labels: labels,
    //         datasets: [{
    //             label: 'total',
    //             data: nbPlays,
    //             backgroundColor: 'rgba(255, 66, 15, 0.7)',
    //             borderColor: 'rgba(255, 66, 15, 0.7)'
    //         }]
    //     }; //data
    //     var barChartOptions = {
    //         scales: {
    //             xAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     fontSize: 20,
    //                 }
    //             }],
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     fontSize: 20,
    //                     precision: 0, // Mostrar solo números enteros en el eje Y
    //                 }
    //             }]
    //         },
    //         legend: {
    //             display: false
    //         },
    //         tooltips: {
    //             enabled: true,
    //             titleFontSize: 26, // Tamaño de la fuente del título del tooltip
    //             bodyFontSize: 24 // Tamaño de la fuente del cuerpo del tooltip
    //         }
    //     }; //options

    //     // Get context with jQuery - using jQuery's .get() method.
    //     var barChartCanvas = $("#barChart").get(0).getContext("2d");
    //     // This will get the first returned node in the jQuery collection.
    //     var barChart = new Chart(barChartCanvas, {
    //         type: 'bar',
    //         data: barChartData,
    //         options: barChartOptions
    //     });    
    // }
    // if (labels2.length === 0 || nbPlays2.length === 0) {
    //     // Mostrar mensaje de "No hay datos"
    //     $("#barChart2").html("<p>No hay datos disponibles.</p>");
    // } else {
    //     var barChart2Data = {
    //         labels: labels2,
    //         datasets: [{
    //             label: 'total',
    //             data: nbPlays2,
    //             backgroundColor: 'rgba(255, 66, 15, 0.7)',
    //             borderColor: 'rgba(255, 66, 15, 0.7)'
    //         }]
    //     }; //data
    //     var barChart2Options = {
    //         scales: {
    //             xAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     fontSize: 20,
    //                 }
    //             }],
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true,
    //                     fontSize: 20,
    //                     precision: 0, // Mostrar solo números enteros en el eje Y
    //                 }
    //             }]
    //         },
    //         legend: {
    //             display: false
    //         },
    //         tooltips: {
    //             enabled: true,
    //             titleFontSize: 26, // Tamaño de la fuente del título del tooltip
    //             bodyFontSize: 24 // Tamaño de la fuente del cuerpo del tooltip
    //         }
    //     }; //options

    //     // Get context with jQuery - using jQuery's .get() method.
    //     var barChart2Canvas = $("#barChart2").get(0).getContext("2d");
    //     // This will get the first returned node in the jQuery collection.
    //     var barChart2 = new Chart(barChart2Canvas, {
    //         type: 'bar',
    //         data: barChart2Data,
    //         options: barChart2Options
    //     });
    // }
    
    // }); //chart
    // });

    

 