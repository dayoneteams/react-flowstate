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

export const computeDisplayDecision = (config: { preserveDataOnError?: boolean }, context: { isLoading: boolean; isLoadingInShadow: boolean; error: Error | null; initialDataLoaded: boolean }) => {
  const { preserveDataOnError } = config;
  const { isLoading, isLoadingInShadow, error, initialDataLoaded } = context;

  const showLoadingIndicator = isLoading && (!isLoadingInShadow || error || !initialDataLoaded);
  const showErrorFallback = !!error && !showLoadingIndicator && (!initialDataLoaded || !preserveDataOnError);
  const showDataContent = initialDataLoaded && !showErrorFallback && !showLoadingIndicator;
  return {
    showLoadingIndicator,
    showDataContent,
    showErrorFallback,
  }
};

export function DataLayout<Data extends ResponseData = ResponseData>(
  props: DataLayoutConfig<Data>
) {
  const contextValue = useDataLayout<Data>(props);
  const { children, loadingIndicator, errorFallback, preserveDataOnError } = props;
  const { isLoading, isLoadingInShadow, error, initialDataLoaded } = contextValue;
  const {showLoadingIndicator, showDataContent, showErrorFallback} = useMemo(() => computeDisplayDecision(
    {preserveDataOnError},
    {isLoading, isLoadingInShadow, error, initialDataLoaded}
  ), [isLoading, isLoadingInShadow, error, preserveDataOnError]);

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
      {showErrorFallback
        ? renderErrorFallback()
        : showLoadingIndicator ? renderLoadingIndicator()
          : showDataContent && renderDataContent()}
    </DataLayoutProvider>
  );
}
