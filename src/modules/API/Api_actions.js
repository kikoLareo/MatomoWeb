import { getBaseUrl } from "../common/common";

const methodBase = 'API';

export const API_getMetadata = (idSite, apiModule, apiAction, apiParameters = 'Array', language , period , date , hideMetricsDoc , showSubtableReports ) => {
    const method = `${methodBase}.getMetadata`;
    const params = { idSite, apiModule, apiAction, apiParameters };

    if (language) params.language = language;
    if (period) params.period = period;
    if (date) params.date = date;
    if (hideMetricsDoc) params.hideMetricsDoc = hideMetricsDoc;
    if (showSubtableReports) params.showSubtableReports = showSubtableReports;

    return { url: getBaseUrl(methodBase, method, params), title: 'Metadata' };
}

export const API_getReportMetadata = (idSites, period, date, hideMetricsDoc, showSubtableReports, idSite) => {
    const method = `${methodBase}.getReportMetadata`;
    const params = {};

    if (idSites) params.idSites = idSites;
    if (period) params.period = period;
    if (date) params.date = date;
    if (hideMetricsDoc) params.hideMetricsDoc = hideMetricsDoc;
    if (showSubtableReports) params.showSubtableReports = showSubtableReports;
    if (idSite) params.idSite = idSite;

    return { url: getBaseUrl(methodBase, method, params), title: 'Report Metadata' };
}

export const API_getProcessedReport = (idSite, period, date, apiModule, apiAction, language = 'es') => {
    const method = `${methodBase}.getProcessedReport`;
    const params = { idSite, period, date, apiModule, apiAction };

    if (language) params.language = language;

    return { url: getBaseUrl(methodBase, method, params), title: 'Processed Report' };
}

export const API_get = (idSite, period, date, segment, columns) => {
    const method = `${methodBase}.get`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;
    if (columns) params.columns = columns;

    return { url: getBaseUrl(methodBase, method, params), title: 'API' };
}

export const APIFunctions = {
    getMetadata: API_getMetadata,
    getReportMetadata: API_getReportMetadata,
    getProcessedReport: API_getProcessedReport,
    get: API_get
}