import {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useMemo,
} from 'react';
import lodashDebounce from 'lodash.debounce';
import {
  DataLayoutConfig,
  DataLayoutContextType,
  DataLayoutState,
  ResponseData,
} from './types';

type DataLayoutAction<Values> =
  | { type: 'LOAD_START'; payload: { shadow: boolean } }
  | { type: 'LOAD_SUCCESS'; payload: Values }
  | {
      type: 'LOAD_FAILURE';
      payload: { error: Error | null; preserveData: boolean };
    };

const CLEAR_ERROR = {
  error: null,
};

const CLEAR_LOADING = {
  isLoading: false,
  isLoadingInShadow: false,
};

export function dataLayoutReducer<Data>(
  state: DataLayoutState<Data>,
  action: DataLayoutAction<Data>
): DataLayoutState<Data> {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        ...CLEAR_ERROR,
        data: action.payload.shadow ? state.data : null,
        isLoading: true,
        isLoadingInShadow: action.payload.shadow,
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        ...CLEAR_LOADING,
        ...CLEAR_ERROR,
        data: action.payload,
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        ...CLEAR_LOADING,
        data: action.payload.preserveData ? state.data : null,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export function useDataLayout<Data extends ResponseData = ResponseData>({
  initialData,
  dataSource,
  shadowReload = false,
  preserveDataOnError = false,
  onError,
  debounceDelay,
  dependencies,
}: DataLayoutConfig<Data>) {
  const initialDataLoadedRef = useRef(!!initialData);
  const [state, dispatch] = useReducer<
    Reducer<DataLayoutState<Data>, DataLayoutAction<Data>>
  >(dataLayoutReducer, {
    data: initialData || null,
    error: null,
    isLoading: !initialData,
    isLoadingInShadow: !initialData && shadowReload,
  });

  const { error, isLoading, isLoadingInShadow } = state;

  const loadData = useCallback(
    async (shadow = false) => {
      try {
        dispatch({
          type: 'LOAD_START',
          payload: { shadow: shadow || shadowReload },
        });
        const fetchedData = await dataSource(dependencies);
        dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
      } catch (err) {
        if (onError) {
          onError(err as Error, state);
        }
        dispatch({
          type: 'LOAD_FAILURE',
          payload: { error: err, preserveData: preserveDataOnError },
        });
      }
    },
    [
      dataSource,
      dispatch,
      onError,
      state,
      shadowReload,
      preserveDataOnError,
      dependencies,
    ]
  );

  const reload = useCallback(
    (options?: { shadow: boolean }) => {
      loadData(options?.shadow || shadowReload);
    },
    [loadData, shadowReload]
  );

  const debouncedReload = useMemo(
    () => lodashDebounce(reload, debounceDelay || 0),
    [debounceDelay, reload]
  );

  useEffect(() => {
    if (!initialDataLoadedRef.current) {
      loadData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (debounceDelay && debounceDelay > 0) {
      debouncedReload();
    } else {
      reload();
    }
  }, [...(dependencies || []), debounceDelay]); // eslint-disable-line react-hooks/exhaustive-deps

  const context: DataLayoutContextType<Data> = {
    data: state.data,
    error,
    isLoading,
    isLoadingInShadow,
    reload,
  };

  return context;
}
