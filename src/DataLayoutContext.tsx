import { createContext } from 'react';
import { DataLayoutContextValue } from './types';

export const DataLayoutContext = createContext<DataLayoutContextValue<any>>(
  undefined as any
);
DataLayoutContext.displayName = 'DataLayoutContext';

export const DataLayoutProvider = DataLayoutContext.Provider;
export const DataLayoutConsumer = DataLayoutContext.Consumer;
