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
  | { type: 'LOAD_FAILURE'; payload: Error | null };

const CLEAR_ERROR = {
  error: null,
};

const CLEAR_LOADING = {
  isLoading: false,
  isLoadingInShadow: false,
};

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
        ...CLEAR_LOADING,
        ...CLEAR_ERROR,
        initialDataLoaded: true,
        data: action.payload,
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        ...CLEAR_LOADING,
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
  onError,
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

  const { initialDataLoaded, error, isLoading, isLoadingInShadow } = state;

  const loadData = useCallback(
    async (shadow = false) => {
      try {
        dispatch({ type: 'LOAD_START', payload: { shadow } });
        const fetchedData = await dataSource();
        dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
      } catch (err) {
        if (onError) {
          onError(err as Error);
        }
        dispatch({ type: 'LOAD_FAILURE', payload: err });
      }
    },
    [dataSource, dispatch, onError]
  );

  const reload = useCallback(
    (options?: { shadow: boolean }) => {
      loadData(options?.shadow || shadowReload);
    },
    [loadData, shadowReload]
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
