import * as React from 'react';

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

export type DataLayoutState<Data> = {
  data: Data;
  initialDataLoaded: boolean;
  isLoading: boolean;
  isLoadingInShadow: boolean;
  error: Error | null;
};

/**
 * State, handlers, and helpers for all components under <DataLayout />.
 */
export type DataLayoutProps<Data> = DataLayoutState<Data> & DataLayoutHelpers;

export type DataLayoutContextType<Data> = DataLayoutProps<Data>;

export type DataLayoutRenderFunction<Data> = RenderFunction<
  DataLayoutProps<Data>
>;

export type RenderFunction<Props = undefined> = (
  props?: Props
) => React.ReactNode;

/**
 * <DataLayout /> props
 */
export interface DataLayoutConfig<Data> {
  // initialData?: Data, // TODO: To be supported

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
  dataSource: () => Promise<Data>;

  /**
   * React component to render loading UI
   */
  loadingIndicator?: RenderFunction | React.ReactNode;

  /**
   * Whether to show loading indicator
   * - true: Show loading indicator on reload
   * - false: Do not show loading indicator on reload
   * @default false
   */
  shadow?: boolean;

  /**
   * Callback function on error. Useful for showing toast or alert.
   * @param err
   * @param state
   */
  onError?: (err: Error) => unknown;

  /**
   * React component to render UI displaying error
   */
  errorFallback?:
    ((err: Error, state: DataLayoutProps<Data>) => React.ReactNode)
    | React.ReactNode;
}
