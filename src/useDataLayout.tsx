import { Reducer, useEffect, useReducer, useRef, DependencyList } from 'react';
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
  onData,
  debounceDelay = 0,
  dependencies = [],
  debouncedDependencies = [],
}: DataLayoutConfig<Data>) {
  // Act as a locker to ensure only one fetch function is called at one moment.
  const isLoadingRef = useRef(false);

  const initialDataLoadedRef = useRef(!!initialData);
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

  const loadData = async (
    dependencies: DependencyList,
    debouncedDependencies: DependencyList,
    shadow = false
  ) => {
    if (isLoadingRef.current) {
      return;
    }

    console.log('ad');

    try {
      isLoadingRef.current = true;
      dispatch({
        type: 'LOAD_START',
        payload: {
          shadow: shadow || shadowReload,
          preserveData: preserveDataOnError,
        },
      });

      const fetchedData = await dataSource(dependencies, debouncedDependencies);

      dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
      isLoadingRef.current = false;
      if (!initialDataLoadedRef.current) {
        initialDataLoadedRef.current = true;
      }
      if (onData) {
        onData(fetchedData);
      }
    } catch (err) {
      dispatch({
        type: 'LOAD_FAILURE',
        payload: { error: err, preserveData: preserveDataOnError },
      });
      if (onError) {
        onError(err as Error, contextValue);
      }
    }
  };

  const debouncedLoadDataRef = useRef(lodashDebounce(loadData, debounceDelay));

  // Initial load trigger.
  useEffect(() => {
    if (!initialDataLoadedRef.current) {
      loadData(dependencies, debouncedDependencies);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Triggered by dependency changes
  useEffect(() => {
    if (initialDataLoadedRef.current) {
      loadData(dependencies, debouncedDependencies);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  // Triggered by debounced dependency changes
  useEffect(() => {
    if (initialDataLoadedRef.current) {
      debouncedLoadDataRef.current(dependencies, debouncedDependencies);
    }
  }, debouncedDependencies); // eslint-disable-line react-hooks/exhaustive-deps

  // Exported reload helper.
  const reload = (options?: { shadow: boolean }) =>
    loadData(
      dependencies,
      debouncedDependencies,
      options?.shadow || shadowReload
    );

  const contextValue: DataLayoutContextValue<Data> = {
    ...state,
    reload,
  };

  return contextValue;
}
