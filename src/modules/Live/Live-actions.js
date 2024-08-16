import { fetchData } from "../../utils/fetchDataHelper";
import { getBaseUrl } from "../common/common";
const methodBase = "Live";
const module = "API";

export const Live_getCounter = async (idSite,  lastMinutes) => {
    const action = `getCounters`;
    const method = `${methodBase}.getCounters`;
    const params = { idSite, lastMinutes };

    return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, params) });
}

export const Live_getLastVisitsDetails = async (idSite, period, date, segment, countVisitorsToFetch) => {
    const action = `getLastVisitsDetails`;
    const method = `${methodBase}.getLastVisitsDetails`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;
    if (countVisitorsToFetch) params.countVisitorsToFetch = countVisitorsToFetch;

    return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, params) });
}

export const Live_getVisitorProfile = async (idSite, visitorId, segment) => {
    const action = `getVisitorProfile`;
    const method = `${methodBase}.getVisitorProfile`;
    const params = { idSite, visitorId };

    if (segment) params.segment = segment;

    return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, params) });
}

export const Live_getMostRecentVisitorId = async (idSite) => {
    const action = `getMostRecentVisitorId`;
    const method = `${methodBase}.getMostRecentVisitorId`;
    const params = { idSite };

    return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, params) });
}

export const Live_getMostRecentVisitsDateTime = async (idSite) => {
    const action = `getMostRecentVisitsDateTime`;
    const method = `${methodBase}.getMostRecentVisitsDateTime`;
    const params = { idSite };

    return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, params) });
}

export const Live_widget = async (idSite, period = "day", disableLink = 0, widget = 1) => {
    const action = `widget`;
    const method = `${methodBase}.widget`;
    const params = { idSite, period, disableLink, widget };

    return await fetchData(idSite, { module: module, action, url: getBaseUrl(module, method, params) });
}

export const LiveActions = {
    getCounter: Live_getCounter,
    getLastVisitsDetails: Live_getLastVisitsDetails,
    getVisitorProfile: Live_getVisitorProfile,
    getMostRecentVisitorId: Live_getMostRecentVisitorId,
    getMostRecentVisitsDateTime: Live_getMostRecentVisitsDateTime,
    widget: Live_widget
}