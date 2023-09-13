import React, { DependencyList } from 'react';

/**
 * Data returned from DataSource
 */
export type ResponseData = any;

/**
 * Helpers functions to manually control DataLayout.
 */
export interface DataLayoutControlHelpers {
  /** Reload layout */
  reload: (options?: { shadow: boolean }) => void;
}

/**
 * Helpers functions to manually control rendering logic.
 */
export type DataLayoutRenderHelpers = {
  renderAutoFallback: () => React.ReactNode;
};

export type DataLayoutState<Data> = {
  data: Data | null;
  isLoading: boolean;
  isLoadingInShadow: boolean;
  error: Error | null;
} & DataLayoutComputedState<Data>;

/**
 * Computed properties. These are read-only.
 */
export interface DataLayoutComputedState<Data> {
  /** The initial values of the layout */
  readonly initialData?: Data;

  /** Last time when data was successfully fetched, null if datasource not yet fetched */
  readonly dataUpdatedAt: Date | null;

  /** Last time when fetching failed, null if datasource not yet failed */
  readonly errorUpdatedAt: Date | null;

  /** Last time when fetching failed, null if datasource not yet failed */
  readonly loadingStartedAt: Date | null;

  /** Equals `true` if current data is a result of data preservation */
  readonly isPreservedData: boolean;
}

/**
 * State, handlers, and helpers for all components under <DataLayout />.
 */
export type DataLayoutContextValue<Data> = DataLayoutState<Data> &
  DataLayoutControlHelpers;

/**
 * <DataLayout /> props
 */
export interface DataLayoutConfig<Data> {
  initialData?: Data;

  /**
   * React children or child render callback
   */
  children?:
    | ((props: DataLayoutContextValue<Data>) => React.ReactNode)
    | ((
        props: DataLayoutContextValue<Data> & DataLayoutRenderHelpers
      ) => React.ReactNode)
    | React.ReactNode;

  /**
   * Function that fetch data
   */
  dataSource: (
    deps?: DependencyList,
    debouncedDeps?: DependencyList
  ) => Promise<Data>;

  /**
   * If present, dataSource is reloaded if the values in the list change.
   */
  dependencies: DependencyList;

  /**
   * If present, dataSource is reloaded if the values in the list change in a debounced behavior.
   */
  debouncedDependencies: DependencyList;

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
  onError?: (err: Error, props: DataLayoutContextValue<Data>) => unknown;

  /**
   * Callback function on data success. Useful for showing toast or alert.
   * @param data
   */
  onData?: (data: Data) => unknown;

  /**
   * React component to render UI displaying error
   */
  errorFallback?:
    | ((err: Error, props: DataLayoutContextValue<Data>) => React.ReactNode)
    | React.ReactNode;

  /**
   * UI that is only rendered when data is available
   */
  dataFallback?:
    | ((props: DataLayoutContextValue<Data>) => React.ReactNode)
    | React.ReactNode;
}
