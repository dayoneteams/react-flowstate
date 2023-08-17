import React, { useCallback, useMemo } from 'react';
import { DataLayoutConfig, DataLayoutProps, ResponseData } from './types';
import { isFunction } from './utils';
import { DataLayoutProvider } from './DataLayoutContext';
import { useDataLayout } from './useDataLayout';
import { computeDisplayDecision } from './computeDisplayDecision';

export function DataLayout<Data extends ResponseData = ResponseData>(
  props: DataLayoutConfig<Data>
) {
  const contextValue = useDataLayout<Data>(props);
  const {
    children,
    loadingIndicator,
    errorFallback,
    dataFallback,
    preserveDataOnError,
  } = props;
  const { isLoading, isLoadingInShadow, error, data } = contextValue;
  const {
    showLoadingIndicator,
    showDataFallback,
    showErrorFallback,
  } = useMemo(
    () =>
      computeDisplayDecision(
        { preserveDataOnError },
        { isLoading, isLoadingInShadow, error, data }
      ),
    [preserveDataOnError, isLoading, isLoadingInShadow, error, data]
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

  const renderDataFallback = useCallback(() => {
    const finalDataFallback = dataFallback || children;

    if (!finalDataFallback) {
      return null;
    }

    if (isFunction(finalDataFallback)) {
      return (finalDataFallback as (
        props: DataLayoutProps<Data>
      ) => React.ReactNode)(contextValue);
    }

    return React.Children.only(finalDataFallback);
  }, [contextValue, children, dataFallback]);

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

  const renderAutoFallback = useCallback(() => {
    return showErrorFallback
      ? renderErrorFallback()
      : showLoadingIndicator
      ? renderLoadingIndicator()
      : showDataFallback && renderDataFallback();
  }, [
    showErrorFallback,
    showLoadingIndicator,
    showDataFallback,
    renderErrorFallback,
    renderLoadingIndicator,
    renderDataFallback,
  ]);

  const renderChildren = useCallback(() => {
    if (!children) {
      return null;
    }

    if (isFunction(children)) {
      return children({
        ...contextValue,
        renderAutoFallback,
      });
    }

    return React.Children.only(children);
  }, [contextValue, children, renderAutoFallback]);

  return (
    <DataLayoutProvider value={contextValue}>
      {children && dataFallback ? renderChildren() : renderAutoFallback()}
    </DataLayoutProvider>
  );
}
