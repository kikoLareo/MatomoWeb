import { fetchData } from "../../utils/fetchDataHelper";
import { getBaseUrl } from "../common/common";
const module = "API";


export const visitFrequency_get = async (idSite, period, date, segment) => {
    const action = `get`;
    const method = "VisitFrequency.get";
    const params = { idSite, period, date };

    if (segment) params.segment = segment;
    return await fetchData(idSite, { module: "VisitFrequency", action, url: getBaseUrl(module,method, params)});
        
}

export const visitFrequencyActions = {
    get: visitFrequency_get
}

export const visitTime_getVisitInformationPerLocalTime = async (idSite, period, date, segment) => {
    const action = `getVisitInformationPerLocalTime`;
    const method = "VisitTime.getVisitInformationPerLocalTime";
    const params = { idSite, period, date };

    if (segment) params.segment = segment;
    return await fetchData(idSite, { module: "VisitTime", action, url: getBaseUrl(module,method, params)});
}

export const visitTime_getByDayOfWeek = async (idSite, period, date, segment) => {
    const action = `getByDayOfWeek`;
    const method = "VisitTime.getByDayOfWeek";
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return await fetchData(idSite, { module: "VisitTime", action, url: getBaseUrl(module,method, params)});
}

export const visitTimeActions = {
    getVisitInformationPerLocalTime: visitTime_getVisitInformationPerLocalTime,
    getByDayOfWeek: visitTime_getByDayOfWeek
}


export const visitorInterest_getNumberOfVisitsPerVisitDuration = async (idSite, period, date, segment) => {
    const action = `getNumberOfVisitsPerVisitDuration`;
    const method = `VisitorInterest.getNumberOfVisitsPerVisitDuration`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return await fetchData(idSite, { module: "VisitorInterest", action, url: getBaseUrl(module,method, params)});
}

export const visitorInterest_getNumberOfVisitsPerPage = async (idSite, period, date, segment) => {
    const action = `getNumberOfVisitsPerPage`;
    const method = `VisitorInterest.getNumberOfVisitsPerPage`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return await fetchData(idSite, { module: "VisitorInterest", action, url: getBaseUrl(module,method, params)});
}


export const visitorInterest_getNumberOfVisitsByDaysSinceLast = async  (idSite, period, date, segment) => {
    const action = `getNumberOfVisitsByDaysSinceLast`;
    const method = `VisitorInterest.getNumberOfVisitsByDaysSinceLast`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return await fetchData(idSite, { module: "VisitorInterest", action, url: getBaseUrl(module,method, params)});
}

export const visitorInterestActions = {
    getNumberOfVisitsPerVisitDuration: visitorInterest_getNumberOfVisitsPerVisitDuration,
    getNumberOfVisitsPerPage: visitorInterest_getNumberOfVisitsPerPage,
    getNumberOfVisitsByDaysSinceLast: visitorInterest_getNumberOfVisitsByDaysSinceLast
}


export const visitsSummary_get = async (idSite, period, date, segment) => {
    const action = `get`;
    const method = `VisitsSummary.get`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return await fetchData(idSite, { module: "VisitsSummary", action, url: getBaseUrl(module,method, params)});
}

export const visitsSummaryActions = {
    get: visitsSummary_get
}




