
import token_auth from "../config.js";
import module from "..config.js";
import methodBase from "./mediaAnalitycs_commom.js";
import format from "../config.js";


const description = "Returns the overall metrics for the videos and audio";

const method = methodBase + ".get";

/**
 * @enum day | range
 */
const period = "day";
const date = "2023-12-01,2024-07-01";
const segment ="";
const columns = "";

/**
 *  Url para llamada api
 */
const baseUrl= `index.php?module=${module}&format=${format}&period=${period}&date=${date}&method=${method}&token_auth=${token_auth}`;


/**
 *  MediaAnalytics.get
 *  Return the overall metrics for the videos and audio
 */
export function MediaAnalytics_get(idSite){
    return baseUrl + `&idSite=${idSite}`;
}

