import React, { DependencyList } from 'react';

/**
 * Data returned from DataSource
 */
export type ResponseData = any;

/**
 * Helpers functions to manually control DataLayout.
 */
export interface DataLayoutHelpers {
  /** Reload layout */
  reload: (options?: { shadow: boolean }) => void;
}

/**
 * Helpers functions to manually control DataLayout.
 */
export type DataLayoutPropsWithRenderHelpers<Data> = DataLayoutProps<Data> & {
  renderAutoFallback: () => React.ReactNode;
};

export type DataLayoutState<Data> = {
  data: Data | null;
  isLoading: boolean;
  isLoadingInShadow: boolean;
  error: Error | null;
};

/**
 * Computed properties. These are read-only.
 */
export interface DataLayoutComputedProps<Data> {
  /** The initial values of the layout */
  readonly initialData: Data;

  /** Last time when data was successfully fetched, null if datasource not yet fetched */
  readonly lastFetchSuccessAt: Date;
}

/**
 * State, handlers, and helpers for all components under <DataLayout />.
 */
export type DataLayoutProps<Data> = DataLayoutState<Data> & DataLayoutHelpers;

export type DataLayoutContextType<Data> = DataLayoutProps<Data>;

/**
 * <DataLayout /> props
 */
export interface DataLayoutConfig<Data> {
  initialData?: Data;

  /**
   * React children or child render callback
   */
  children?:
    | ((
        props: DataLayoutProps<Data> | DataLayoutPropsWithRenderHelpers<Data>
      ) => React.ReactNode)
    | React.ReactNode;

  /**
   * Function that fetch data
   */
  dataSource: (deps?: DependencyList) => Promise<Data>;

  /**
   * If present, dataSource is reloaded if the values in the list change.
   */
  dependencies?: DependencyList;

  /**
   * If present, dependency changes are debounced hence reload is debounced.
   */
  debounceDelay?: number;

  /**
   * React component to render loading UI
   */
  loadingIndicator?: React.ReactNode | (() => React.ReactNode);

  /**
   * Once data has been fetched and displayed.
   * Whether to show loading indicator when data is reloaded.
   * - true: Show loading indicator on reload
   * - false: Do not show loading indicator on reload
   * @default false
   */
  shadowReload?: boolean;

  /**
   * @default false
   */
  preserveDataOnError?: boolean;

  /**
   * Callback function on error. Useful for showing toast or alert.
   * @param err
   * @param state
   */
  onError?: (err: Error, props: DataLayoutProps<Data>) => unknown;

  /**
   * React component to render UI displaying error
   */
  errorFallback?:
    | ((err: Error, props: DataLayoutProps<Data>) => React.ReactNode)
    | React.ReactNode;

  /**
   * UI that is only rendered when data is available
   */
  dataFallback?:
    | ((props: DataLayoutProps<Data>) => React.ReactNode)
    | React.ReactNode;
}
