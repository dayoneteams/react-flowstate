import * as React from 'react';

/**
 * Data returned from DataSource
 */
export type ResponseData = any;

/**
 * Helpers functions to manually control DataLayout.
 */
export interface DataLayoutHelpers {
  /** Manually set isLoading */
  setLoading: (isLoading: boolean) => void;
  /** Reload layout */
  reload: () => void;
}

/**
 * State, handlers, and helpers for all components under <DataLayout />.
 */
export type DataLayoutProps<Values> = DataLayoutHelpers;

/**
 * <DataLayout /> props
 */
export interface DataLayoutConfig<Data> {
  /**
   * UI component to render
   */
  component?: React.ComponentType<DataLayoutProps<Data>> | React.ReactNode;

  /**
   * React children or child render callback
   */
  children?:
    | ((props: DataLayoutProps<Data>) => React.ReactNode)
    | React.ReactNode;

  /**
   * Function that fetch data
   */
  fetchFn: () => Promise<Data>;
}
