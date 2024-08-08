import { getBaseUrl } from "../../chart_config/common/common";
const methodBase = "Live";

export const Live_getCounter = (idSite, apiModule, apiAction, lastMinutes) => {
    const method = `${methodBase}.getCounter`;
    const params = { idSite, apiModule, apiAction, lastMinutes };

    return { url: getBaseUrl(methodBase,method, params), title: 'Counter' };
}

export const Live_getLastVisitsDetails = (idSite, period, date, segment, countVisitorsToFetch) => {
    const method = `${methodBase}.getLastVisitsDetails`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;
    if (countVisitorsToFetch) params.countVisitorsToFetch = countVisitorsToFetch;

    return { url: getBaseUrl(methodBase,method, params), title: 'Last Visits Details' };
}

export const Live_getVisitorProfile = (idSite, visitorId, segment) => {
    const method = `${methodBase}.getVisitorProfile`;
    const params = { idSite, visitorId };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(methodBase,method, params), title: 'Visitor Profile' };
}

export const Love_getMostRecentVisitorId = (idSite) => {
    const method = `${methodBase}.getMostRecentVisitorId`;
    const params = { idSite };

    return { url: getBaseUrl(methodBase,method, params), title: 'Most Recent Visitor ID' };
}

export const Live_getMostRecentVisitsDateTime = (idSite) => {
    const method = `${methodBase}.getMostRecentVisitsDateTime`;
    const params = { idSite };

    return { url: getBaseUrl(methodBase,method, params), title: 'Most Recent Visits Date Time' };
}

export const Live_widget = (idSite, period ="day",  disableLink =0, widget=1) => {
    const method = `${methodBase}.widget`;
    const params = { idSite, period, disableLink, widget };

    return { url: getBaseUrl(methodBase,method, params), title: 'Widget' };
}

export const LiveActions = {
    getCounter: Live_getCounter,
    getLastVisitsDetails: Live_getLastVisitsDetails,
    getVisitorProfile: Live_getVisitorProfile,
    getMostRecentVisitorId: Love_getMostRecentVisitorId,
    getMostRecentVisitsDateTime: Live_getMostRecentVisitsDateTime,
    widget: Live_widget
}