import {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  DependencyList,
  useState,
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
  debounceDelay = 0,
  dependencies = [],
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
  const [debouncedDependencies, setDebouncedDependencies] = useState(
    dependencies
  );
  const setDebouncedDepsRef = useRef(
    lodashDebounce(setDebouncedDependencies, debounceDelay || 0)
  );
  const { error, isLoading, isLoadingInShadow } = state;

  const loadData = useCallback(
    async (dependencies: DependencyList, shadow = false) => {
      try {
        dispatch({
          type: 'LOAD_START',
          payload: { shadow: shadow || shadowReload },
        });
        const fetchedData = await dataSource(dependencies);
        dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
      } catch (err) {
        if (onError) {
          onError(err as Error, context);
        }
        dispatch({
          type: 'LOAD_FAILURE',
          payload: { error: err, preserveData: preserveDataOnError },
        });
      }
    },
    [dataSource, dispatch, onError, state, shadowReload, preserveDataOnError]
  );

  useEffect(() => {
    setDebouncedDepsRef.current(dependencies as DependencyList);
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialDataLoadedRef.current) {
      loadData(dependencies as DependencyList);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadData(dependencies as DependencyList);
  }, [debouncedDependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  const context: DataLayoutContextType<Data> = {
    data: state.data,
    error,
    isLoading,
    isLoadingInShadow,
    reload: (options?: { shadow: boolean }) => {
      loadData(dependencies as DependencyList, options?.shadow || shadowReload);
    },
  };

  return context;
}
