import React, {useCallback, useMemo} from 'react';
import {
  DataLayoutConfig, DataLayoutProps,
  DataLayoutRenderFunction,
  RenderFunction,
  ResponseData,
} from './types';
import { isFunction } from './utils';
import { DataLayoutProvider } from './DataLayoutContext';
import { useDataLayout } from './useDataLayout';

export function DataLayout<Data extends ResponseData = ResponseData>(
  props: DataLayoutConfig<Data>
) {
  const contextValue = useDataLayout<Data>(props);
  const { children, loadingIndicator, errorFallback, hideErrorFallbackOnReloadError } = props;
  const { isLoading, isLoadingInShadow, error, data, initialDataLoaded } = contextValue;
  const {showLoadingIndicator, showDataContent, showErrorFallback} = useMemo(() => {
    const showLoadingIndicator = isLoading && !isLoadingInShadow;
    const showErrorFallback = error && (!initialDataLoaded || !hideErrorFallbackOnReloadError);
    const showDataContent = data && !showErrorFallback && !showLoadingIndicator;
    return {
      showLoadingIndicator,
      showDataContent,
      showErrorFallback,
    }
  }, [isLoading, isLoadingInShadow, error, data, hideErrorFallbackOnReloadError]);

  const renderLoadingIndicator = useCallback(
    () => loadingIndicator && isFunction(loadingIndicator)
      ? (loadingIndicator as RenderFunction)()
      : React.Children.only(loadingIndicator),
    [loadingIndicator]
  );

  const renderDataContent = useCallback(() =>
    isFunction(children)
      ? (children as DataLayoutRenderFunction<Data>)(contextValue)
      : React.Children.only(children), [contextValue, children]);

  const renderErrorFallback = useCallback(() =>
    isFunction(errorFallback)
      ? (errorFallback as (err: Error, state: DataLayoutProps<Data>) => React.ReactNode)(contextValue.error as Error, contextValue)
      : React.Children.only(errorFallback), [contextValue, errorFallback]);

  return (
    <DataLayoutProvider value={contextValue}>
      {showLoadingIndicator && renderLoadingIndicator()}
      {showDataContent && renderDataContent()}
      {showErrorFallback && renderErrorFallback()}
    </DataLayoutProvider>
  );
}
