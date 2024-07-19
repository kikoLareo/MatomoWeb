
const token_auth ='87148f8d4f8a9f7e5e21f6bd705bfdbd';
const module = "API";
const format = "JSON";
const idSite = "2";
const period = "range";
const date = "2023-12-01,2024-07-01";
const method = "MediaAnalytics.getVideoTitles";
const filter_column = "label";
const filter_pattern = "ID%3A+377";
const secondaryDimension = "spent_time";
const format_metrics = "1";
const expanded = "1";

/**
 *  Url para llamada api
 */
const baseUrl= `index.php?module=${module}&format=${format}&idSite=${idSite}&period=${period}&date=${date}&method=${method}&filter_column=${filter_column}&filter_pattern=${filter_pattern}&secondaryDimension=${secondaryDimension}&format_metrics=${format_metrics}&expanded=${expanded}&token_auth=${token_auth}`;



export default baseUrl;