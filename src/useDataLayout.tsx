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
        error: null,
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoadingInShadow: false,
        data: action.payload,
        initialDataLoaded: true,
        error: null,
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
  initialData,
  dataSource,
  shadowReload = false,
  onError
}: DataLayoutConfig<Data>) {
  const [state, dispatch] = useReducer<
    Reducer<DataLayoutState<Data>, DataLayoutAction<Data>>
  >(dataLayoutReducer, {
    initialDataLoaded: !!initialData,
    data: initialData || null,
    error: null,
    isLoading: !initialData,
    isLoadingInShadow: !initialData && shadowReload,
  });

  const {initialDataLoaded, error, isLoading, isLoadingInShadow} = state;

  const loadData = useCallback(
    async (shadow = false) => {
      try {
        dispatch({ type: 'LOAD_START', payload: { shadow } });
        const fetchedData = await dataSource();
        dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
      } catch (err) {
        dispatch({ type: 'LOAD_FAILURE', payload: err });
        if (onError) {
          onError(err);
        }
      }
    },
    [dataSource, dispatch]
  );

  const reload = useCallback(
    (options?: { shadow: boolean }) => {
      loadData(options?.shadow || shadowReload);
    },
    [loadData]
  );

  useEffect(() => {
    if (!initialDataLoaded) {
      loadData();
    }
  }, [loadData, initialDataLoaded]);

  const context: DataLayoutContextType<Data> = {
    data: state.data,
    error,
    initialDataLoaded,
    isLoading,
    isLoadingInShadow,
    reload,
  };

  return context;
}
