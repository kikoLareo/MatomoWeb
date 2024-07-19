import token_auth from "../config.js";
import module from "..config.js";
import methodBase from "./mediaAnalitycs_commom.js";
import format from "../config.js";


const description = "Returns the numer of video plays in the last N minutes";

const nameFunction = "getCurrentNumPlays";
const method = methodBase + "." + nameFunction;

/**
 * @enum day | range
 */
const lastMinutes = 180;
const segment ="";
const columns = "";

/**
 *  Url para llamada api
 */
const baseUrl= `index.php?module=${module}&format=${format}&lastMinutes=${lastMinutes}&method=${method}&token_auth=${token_auth}`;


/**
 *  MediaAnalytics.getCurrentNumPlays
 *  Return the numer of video plays in the last N minutes
*/
export function MediaAnalytics_getCurrentNumPlays(idSite){
    return baseUrl + `&idSite=${idSite}`;
}

