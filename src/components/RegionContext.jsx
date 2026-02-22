/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const RegionContext = createContext();

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within RegionProvider');
  }
  return context;
}

export function RegionProvider({ children }) {
  const [region, setRegion] = useState('india'); // 'india' or 'others'

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}