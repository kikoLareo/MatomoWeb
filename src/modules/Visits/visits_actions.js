import { fetchData } from "../../utils/fetchDataHelper";
import { getBaseUrl } from "../common/common";

const method = "API";

export const visitFrequency_get = async (idSite, period, date, segment) => {
    const action = `VisitFrequency.get`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;
    return await fetchData(idSite, { module: method, action, url: getBaseUrl(method,action, params)});
        
}

export const visitFrequencyActions = {
    get: visitFrequency_get
}

export const visitTime_getVisitInformationPerLocalTime = (idSite, period, date, segment) => {
    const action = `VisitTime.getVisitInformationPerLocalTime`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Visit Time - Local Time' };
}

export const visitTime_getByDayOfWeek = (idSite, period, date, segment) => {
    const action = `VisitTime.getByDayOfWeek`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Visit Time - Day of Week' };
}

export const visitTimeActions = {
    getVisitInformationPerLocalTime: visitTime_getVisitInformationPerLocalTime,
    getByDayOfWeek: visitTime_getByDayOfWeek
}


export const visitorInterest_getNumberOfVisitsPerVisitDuration = (idSite, period, date, segment) => {
    const action = `VisitorInterest.getNumberOfVisitsPerVisitDuration`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Visitor Interest - Visit Duration' };
}

export const visitorInterest_getNumberOfVisitsPerPage = (idSite, period, date, segment) => {
    const action = `VisitorInterest.getNumberOfVisitsPerPage`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Visitor Interest - Pages per Visit' };
}


export const visitorInterest_getNumberOfVisitsByDaysSinceLast = (idSite, period, date, segment) => {
    const action = `VisitorInterest.getNumberOfVisitsByDaysSinceLast`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Visitor Interest - Days Since Last Visit' };
}

export const visitorInterestActions = {
    getNumberOfVisitsPerVisitDuration: visitorInterest_getNumberOfVisitsPerVisitDuration,
    getNumberOfVisitsPerPage: visitorInterest_getNumberOfVisitsPerPage,
    getNumberOfVisitsByDaysSinceLast: visitorInterest_getNumberOfVisitsByDaysSinceLast
}


export const visitsSummary_get = (idSite, period, date, segment) => {
    const action = `VisitsSummary.get`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Visits Summary' };
}

export const visitsSummaryActions = {
    get: visitsSummary_get
}


