import React, { useCallback, useMemo } from 'react';
import {
  DataLayoutConfig,
  DataLayoutProps,
  DataLayoutRenderFunction,
  ResponseData,
} from './types';
import { isFunction } from './utils';
import { DataLayoutProvider } from './DataLayoutContext';
import { useDataLayout } from './useDataLayout';

// TODO: Need refactoring for args.
export const computeDisplayDecision = (
  config: { preserveDataOnError?: boolean },
  context: {
    isLoading: boolean;
    isLoadingInShadow: boolean;
    error: Error | null;
    initialDataLoaded: boolean;
  }
) => {
  const { preserveDataOnError } = config;
  const { isLoading, isLoadingInShadow, error, initialDataLoaded } = context;

  const showLoadingIndicator =
    isLoading && (!isLoadingInShadow || !!error || !initialDataLoaded);
  const showErrorFallback =
    !!error &&
    !showLoadingIndicator &&
    (!initialDataLoaded || !preserveDataOnError);
  const showDataContent =
    initialDataLoaded && !showErrorFallback && !showLoadingIndicator;
  return {
    showLoadingIndicator,
    showDataContent,
    showErrorFallback,
  };
};

export function DataLayout<Data extends ResponseData = ResponseData>(
  props: DataLayoutConfig<Data>
) {
  const contextValue = useDataLayout<Data>(props);
  const {
    children,
    loadingIndicator,
    errorFallback,
    preserveDataOnError,
  } = props;
  const {
    isLoading,
    isLoadingInShadow,
    error,
    initialDataLoaded,
  } = contextValue;
  const {
    showLoadingIndicator,
    showDataContent,
    showErrorFallback,
  } = useMemo(
    () =>
      computeDisplayDecision(
        { preserveDataOnError },
        { isLoading, isLoadingInShadow, error, initialDataLoaded }
      ),
    [
      preserveDataOnError,
      isLoading,
      isLoadingInShadow,
      error,
      initialDataLoaded,
    ]
  );

  const renderLoadingIndicator = useCallback(() => {
    if (!loadingIndicator) {
      return null;
    }

    if (isFunction(loadingIndicator)) {
      return loadingIndicator();
    }

    return React.Children.only(loadingIndicator);
  }, [loadingIndicator]);

  const renderDataContent = useCallback(() => {
    if (!children) {
      return null;
    }

    if (isFunction(children)) {
      return (children as DataLayoutRenderFunction<Data>)(contextValue);
    }

    return React.Children.only(children);
  }, [contextValue, children]);

  const renderErrorFallback = useCallback(() => {
    if (!errorFallback) {
      return null;
    }

    if (isFunction(errorFallback)) {
      return (errorFallback as (
        err: Error,
        state: DataLayoutProps<Data>
      ) => React.ReactNode)(contextValue.error as Error, contextValue);
    }

    return React.Children.only(errorFallback);
  }, [contextValue, errorFallback]);

  return (
    <DataLayoutProvider value={contextValue}>
      {showErrorFallback
        ? renderErrorFallback()
        : showLoadingIndicator
        ? renderLoadingIndicator()
        : showDataContent && renderDataContent()}
    </DataLayoutProvider>
  );
}
