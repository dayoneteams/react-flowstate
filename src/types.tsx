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

export type DataLayoutState<Data> = {
  data: Data;
  isLoading: boolean;
};

/**
 * State, handlers, and helpers for all components under <DataLayout />.
 */
export type DataLayoutProps<Data> = DataLayoutState<Data> & DataLayoutHelpers;

export type DataLayoutContextType<Data> = DataLayoutProps<Data>;

export type DataLayoutRenderFunction<Data> = (
  props: DataLayoutProps<Data>
) => React.ReactNode;

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
  children?: DataLayoutRenderFunction<Data> | React.ReactNode;

  /**
   * Function that fetch data
   */
  fetchFn: () => Promise<Data>;
}
