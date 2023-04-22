import React from 'react';
import {
  DataLayoutConfig,
  DataLayoutRenderFunction,
  ResponseData,
} from './types';
import {isFunction} from './utils';
import {DataLayoutProvider} from './DataLayoutContext';
import {useDataLayout} from "./useDataLayout";

export function DataLayout<Data extends ResponseData = ResponseData>(
  props: DataLayoutConfig<Data>
) {
  const contextValue = useDataLayout<Data>(props);

  const children = props.children;

  return (
    <DataLayoutProvider value={contextValue}>
      {contextValue.isLoading
        ? 'Loading 3 ...' // TODO: Loading component
        : isFunction(children)
        ? (children as DataLayoutRenderFunction<Data>)(contextValue)
        : React.Children.only(children)}
    </DataLayoutProvider>
  );
}
