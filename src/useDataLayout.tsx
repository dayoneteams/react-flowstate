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
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoadingInShadow: false,
        data: action.payload,
        initialDataLoaded: true,
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
    initialDataLoaded: false,
    data: undefined as any,
    isLoading: true,
    isLoadingInShadow: false, // TODO: How about global config and default config
  });

  const loadData = useCallback(
    async (shadow = false) => {
      dispatch({ type: 'LOAD_START', payload: { shadow } });
      const fetchedData = await fetchFn();
      dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
    },
    [fetchFn, dispatch]
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
    initialDataLoaded: state.initialDataLoaded,
    isLoading: state.isLoading,
    isLoadingInShadow: state.isLoadingInShadow,
    reload,
  };

  return context;
}
