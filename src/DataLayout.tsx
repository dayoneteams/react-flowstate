import React, { Reducer, useCallback, useEffect, useReducer } from 'react';
import { DataLayoutConfig, DataLayoutState, ResponseData } from './types';
import { isFunction } from './utils';
import { DataLayoutProvider } from './DataLayoutContext';

type DataLayoutAction<Values> =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: Values };

function dataLayoutReducer<Values>(
  state: DataLayoutState<Values>,
  action: DataLayoutAction<Values>
): DataLayoutState<Values> {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}

export function useDataLayout<Data extends ResponseData = ResponseData>({
  fetchFn,
}: DataLayoutConfig<Data>) {
  const [state, dispatch] = useReducer<
    Reducer<DataLayoutState<Data>, DataLayoutAction<Data>>
  >(dataLayoutReducer, {
    data: undefined as any,
    isLoading: true,
  });

  console.log(state);

  const loadData = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    const fetchedData = await fetchFn();
    dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
  }, [fetchFn, dispatch]);

  const reload = useCallback(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const context = {
    data: state.data,
    isLoading: state.isLoading,
    reload,
    setLoading: (isLoading: boolean) => {
      console.log(isLoading);
    },
  };

  return context;
}

export function DataLayout<Data extends ResponseData = ResponseData>(
  props: DataLayoutConfig<Data>
) {
  const contextValue = useDataLayout<Data>(props);

  // TODO
  const children = props.children as Function;

  return (
    <DataLayoutProvider value={contextValue}>
      {contextValue.isLoading
        ? 'Loading 3 ...' // TODO: Loading component
        : isFunction(children)
        ? children(contextValue)
        : React.Children.only(children)}
    </DataLayoutProvider>
  );
}
