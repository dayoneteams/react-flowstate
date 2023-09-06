import { DataLayoutState } from './types';

const CLEAR_ERROR = {
  error: null,
};

const CLEAR_LOADING = {
  isLoading: false,
  isLoadingInShadow: false,
};

export type DataLayoutAction<Values> =
  | { type: 'LOAD_START'; payload: { shadow: boolean; preserveData: boolean } }
  | { type: 'LOAD_SUCCESS'; payload: Values }
  | {
      type: 'LOAD_FAILURE';
      payload: { error: Error | null; preserveData: boolean };
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
        data:
          action.payload.shadow || action.payload.preserveData
            ? state.data
            : null,
        isLoading: true,
        isLoadingInShadow: action.payload.shadow,
        loadingStartedAt: new Date(),
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        ...CLEAR_LOADING,
        ...CLEAR_ERROR,
        data: action.payload,
        dataUpdatedAt: new Date(),
      };
    case 'LOAD_FAILURE':
      return {
        ...state,
        ...CLEAR_LOADING,
        data: action.payload.preserveData ? state.data : null,
        isPreservedData: action.payload.preserveData,
        error: action.payload.error,
        errorUpdatedAt: new Date(),
      };
    default:
      return state;
  }
}
