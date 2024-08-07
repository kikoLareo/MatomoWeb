export const token_auth ='87148f8d4f8a9f7e5e21f6bd705bfdbd';
export const module = 'API';
export const format = 'json';

export const baseURL = 'https://tiivii-ott.matomo.cloud/';


export const idSiteOptions = {
    'tivii-pre OTT': 1,
    'tivii pro': 9,
    'lupus': 12,
    'hidra': 15,
    'gemini': 8,
    'felis': 7,
    'eudora': 6,
    'draco': 5,
    'casiopea': 3,
    'bolerus': 4,
    'andomeda-pre': 2,
    'andromeda': 10,
  };

  export function getSiteName(idSite){
    const site = Object.keys(idSiteOptions).find(key => idSiteOptions[key] === idSite);
    return site;
  }