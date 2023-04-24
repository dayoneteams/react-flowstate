import React, {useCallback} from 'react';
import {
  DataLayoutConfig,
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
  const { children, loadingIndicator } = props;
  const { isLoading, isLoadingInShadow, initialDataLoaded } = contextValue;

  const renderLoadingIndicator = useCallback(() =>
    isFunction(loadingIndicator)
      ? (loadingIndicator as RenderFunction)()
      : React.Children.only(loadingIndicator), [loadingIndicator]);

  const renderChildren = useCallback(() =>
    isFunction(children)
      ? (children as DataLayoutRenderFunction<Data>)(contextValue)
      : React.Children.only(children), [contextValue, children]);

  return (
    <DataLayoutProvider value={contextValue}>
      {isLoading &&
        !isLoadingInShadow &&
        loadingIndicator &&
        renderLoadingIndicator()}
      {(!isLoading || (initialDataLoaded && isLoadingInShadow)) &&
        children &&
        renderChildren()}
    </DataLayoutProvider>
  );
}
