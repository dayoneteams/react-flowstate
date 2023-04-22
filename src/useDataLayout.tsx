import {Reducer, useCallback, useEffect, useReducer} from 'react';
import {DataLayoutConfig, DataLayoutState, ResponseData,} from './types';

type DataLayoutAction<Values> =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: Values }
  | { type: 'SET_LOADING'; payload: boolean };

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
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
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

  const loadData = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    const fetchedData = await fetchFn();
    dispatch({ type: 'LOAD_SUCCESS', payload: fetchedData });
  }, [fetchFn, dispatch]);

  const reload = useCallback(() => {
    loadData();
  }, [loadData]);

  const setLoading = useCallback(
    (isLoading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: isLoading });
    },
    [dispatch]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const context = {
    data: state.data,
    isLoading: state.isLoading,
    reload,
    setLoading,
  };

  return context;
}
