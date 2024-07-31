// src/contexts/IdSiteContext.js
import React, { createContext, useState } from 'react';

export const IdSiteContext = createContext();

export const IdSiteProvider = ({ children }) => {
  const [idSite, setIdSite] = useState(1); // Valor por defecto

  return (
    <IdSiteContext.Provider value={{ idSite, setIdSite }}>
      {children}
    </IdSiteContext.Provider>
  );
};
