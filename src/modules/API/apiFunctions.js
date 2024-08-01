import { getBaseUrl } from "../../chart_config/common/common";

const methodBase = 'API';


export const API_getMetadata = (idSite, apiModule, apiAction, apiParameters = 'Array', language = '', period = '', date = '', hideMetricsDoc = '', showSubtableReports = '') => {
    const method = `${methodBase}.getMetadata`;
    return { url: getBaseUrl(method, { idSite, apiModule, apiAction, apiParameters, language, period, date, hideMetricsDoc, showSubtableReports }), title: 'Metadata' };
    }

export const API_getReportMetadata = (idSites = '', period = '', date = '', hideMetricsDoc = '', showSubtableReports = '', idSite = '') => {
    const method = `${methodBase}.getReportMetadata`;
    return { url: getBaseUrl(method, { idSites, period, date, hideMetricsDoc, showSubtableReports, idSite }), title: 'Report Metadata' };
    }

export const API_getProcessedReport = (idSite, period, date, apiModule, apiAction, segment = '', apiParameters = '', idGoal = '', language = '', showTimer = '1', hideMetricsDoc = '', idSubtable = '', showRawMetrics = '', format_metrics = '', idDimension = '') => {
    const method = `${methodBase}.getProcessedReport`;
    return { url: getBaseUrl(method, { idSite, period, date, apiModule, apiAction, segment, apiParameters, idGoal, language , showTimer , hideMetricsDoc, idSubtable, showRawMetrics, format_metrics, idDimension  }), title: 'Processed Report' };
    }

export const API_get = (idSite, period, date, segment = '', columns = '') => {
    const method = `${methodBase}.get`;
    return { url: getBaseUrl(method, { idSite, period, date, segment, columns }), title: 'API' };
    }

export const APIFunctions = {
    getMetadata : API_getMetadata,
    getReportMetadata : API_getReportMetadata,
    getProcessedReport : API_getProcessedReport,
    get : API_get
}