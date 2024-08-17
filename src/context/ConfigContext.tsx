import React, { createContext, useContext } from 'react';

const ConfigContext = createContext<any>(null);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const config = (window as any).config;
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
