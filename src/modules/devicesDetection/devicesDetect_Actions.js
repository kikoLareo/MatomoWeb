import { getBaseUrl } from "../../chart_config/common/common";
const methodBase = "DevicesDetection";
const method = "API";

export const devicesDetection_getType = (idSite, period, date, segment) => {
    const action = `${methodBase}.devicesDetection_getType`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Devices Detection - Type' };
}

export const devicesDetection_getBrand = (idSite, period, date, segment) => {
    const action = `${methodBase}.devicesDetection_getBrand`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Devices Detection - Brand' };
}

export const devicesDetection_getModel = (idSite, period, date, segment) => {
    const action = `${methodBase}.devicesDetection_getModel`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Devices Detection - Model' };
}

export const devicesDetection_getOSFamilies = (idSite, period, date, segment) => {
    const action = `${methodBase}.devicesDetection_getOsFamilies`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Devices Detection - OS' };
}

export const devicesDetection_getBrowsers = (idSite, period, date, segment) => {
    const action = `${methodBase}.devicesDetection_getBrowsers`;
    const params = { idSite, period, date };

    if (segment) params.segment = segment;

    return { url: getBaseUrl(method,action, params), title: 'Devices Detection - Browser' };
}

export const devicesDetectionActions = {
    getType: devicesDetection_getType,
    getBrand: devicesDetection_getBrand,
    getModel: devicesDetection_getModel,
    getOSFamilies: devicesDetection_getOSFamilies,
    getBrowsers: devicesDetection_getBrowsers
}