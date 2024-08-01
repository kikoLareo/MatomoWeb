import { baseURL, format, module, token_auth } from "../../config";


export const getBaseUrl = (method, params = {}) => {
    const baseUrl = `${baseURL}index.php?module=${module}&format=${format}&method=${method}&token_auth=${token_auth}`;
    const queryParams = new URLSearchParams(params).toString();
    return `${baseUrl}&${queryParams}`;
  };
  