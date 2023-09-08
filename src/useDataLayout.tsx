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
  DataLayoutContextValue,
  DataLayoutState,
  ResponseData,
} from './types';
import { DataLayoutAction, dataLayoutReducer } from './dataLayoutReducer';

export function useDataLayout<Data extends ResponseData = ResponseData>({
  initialData,
  dataSource,
  shadowReload = false,
  preserveDataOnError = false,
  onError,
  debounceDelay = 0,
  dependencies = [],
}: DataLayoutConfig<Data>) {
  // const initialDataLoadedRef = useRef(!!initialData);
  const [state, dispatch] = useReducer<
    Reducer<DataLayoutState<Data>, DataLayoutAction<Data>>
  >(dataLayoutReducer, {
    initialData,
    data: initialData || null,
    error: null,
    isLoading: !initialData,
    isLoadingInShadow: !initialData && shadowReload,
    dataUpdatedAt: null,
    errorUpdatedAt: null,
    loadingStartedAt: null,
    isPreservedData: false,
  });
  const [debouncedDependencies, setDebouncedDependencies] = useState(
    dependencies
  );
  const setDebouncedDepsRef = useRef(
    lodashDebounce(setDebouncedDependencies, debounceDelay || 0)
  );

  const loadData = useCallback(
    async (dependencies: DependencyList, shadow = false) => {
      try {
        dispatch({
          type: 'LOAD_START',
          payload: {
            shadow: shadow || shadowReload,
            preserveData: preserveDataOnError,
          },
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

  // useEffect(() => {
  //   console.log('initialDataLoadedRef');
  //   if (!initialDataLoadedRef.current) {
  //     loadData(dependencies as DependencyList);
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadData(dependencies as DependencyList);
  }, [debouncedDependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  const context: DataLayoutContextValue<Data> = {
    ...state,
    reload: (options?: { shadow: boolean }) => {
      loadData(dependencies as DependencyList, options?.shadow || shadowReload);
    },
  };

  return context;
}
