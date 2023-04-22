import React from 'react';
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

  return (
    <DataLayoutProvider value={contextValue}>
      {contextValue.isLoading
        ? isFunction(loadingIndicator)
          ? (loadingIndicator as RenderFunction)()
          : loadingIndicator
        : isFunction(children)
        ? (children as DataLayoutRenderFunction<Data>)(contextValue)
        : React.Children.only(children)}
    </DataLayoutProvider>
  );
}
