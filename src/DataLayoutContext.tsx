import { createContext, useContext } from 'react';
import { DataLayoutContextType } from './types';

export const DataLayoutContext = createContext<DataLayoutContextType<any>>(
  undefined as any
);
// DataLayoutContext.displayName = 'DataLayoutContext'; // TODO: ???

export const DataLayoutProvider = DataLayoutContext.Provider;
export const DataLayoutConsumer = DataLayoutContext.Consumer;

export function useDataLayoutContext<Values>() {
  return useContext<DataLayoutContextType<Values>>(DataLayoutContext);
}
