import { Reducer, useCallback, useEffect, useReducer } from 'react';
import {
  DataLayoutConfig,
  DataLayoutContextType,
  DataLayoutState,
  ResponseData,
} from './types';

type DataLayoutAction<Values> =
  | { type: 'LOAD_START'; payload: { shadow: boolean } }
  | { type: 'LOAD_SUCCESS'; payload: Values }
  | { type: 'LOAD_FAILURE'; payload: Error };

function dataLayoutReducer<Data>(
  state: DataLayoutState<Data>,
  action: DataLayoutAction<Data>
): DataLayoutState<Data> {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        isLoading: true,
        isLoadingInShadow: action.payload.shadow,
        error: undefined,
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoadingInShadow: false,
        data: action.payload,
        initialDataLoaded: true,
        error: undefined,
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        isLoading: false,
        isLoadingInShadow: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function useDataLayout<Data extends ResponseData = ResponseData>({
  dataSource,
}: DataLayoutConfig<Data>) {
  const [state, dispatch] = useReducer<
    Reducer<DataLayoutState<Data>, DataLayoutAction<Data>>
  >(dataLayoutReducer, {
    initialDataLoaded: false,
    data: undefined as any,
    error: undefined,
    isLoading: true,
    isLoadingInShadow: false, // TODO: How about global config and default config
  });

  const loadData = useCallback(
    async (shadow = false) => {
      try {
        dispatch({ type: 'LOAD_START', payload: { shadow } });
        const fetchedData = await dataSource();
        dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
      } catch (err) {
        console.log('adsfasdf', err)
        dispatch({ type: 'LOAD_FAILURE', payload: err });
      }
    },
    [dataSource, dispatch]
  );

  const reload = useCallback(
    (options?: { shadow: boolean }) => {
      loadData(options?.shadow);
    },
    [loadData]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const context: DataLayoutContextType<Data> = {
    data: state.data,
    error: state.error,
    initialDataLoaded: state.initialDataLoaded,
    isLoading: state.isLoading,
    isLoadingInShadow: state.isLoadingInShadow,
    reload,
  };

  return context;
}
