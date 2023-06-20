import { describe, test } from '@jest/globals';
import { dataLayoutReducer } from './useDataLayout';

describe('useDataLayout', () => {
  describe('dataLayoutReducer()', () => {
    test('unsets error, unsets data and set loading on LOAD_START by default', () => {
      expect(
        dataLayoutReducer(
          {
            data: {},
            error: new Error('mocked error'),
            isLoading: false,
            isLoadingInShadow: false,
          },
          {
            type: 'LOAD_START',
            payload: { shadow: false },
          }
        )
      ).toEqual({
        data: null,
        error: null,
        isLoading: true,
        isLoadingInShadow: false,
      });

      expect(
        dataLayoutReducer(
          {
            data: {},
            error: new Error('mocked error'),
            isLoading: false,
            isLoadingInShadow: false,
          },
          {
            type: 'LOAD_START',
            payload: { shadow: true },
          }
        )
      ).toEqual({
        data: {},
        error: null,
        isLoading: true,
        isLoadingInShadow: true,
      });
    });

    test('keeps data on LOAD_START with shadowReload enabled', () => {
      expect(
        dataLayoutReducer(
          {
            data: [1, 2, 3],
            error: null,
            isLoading: true,
            isLoadingInShadow: false,
          },
          {
            type: 'LOAD_START',
            payload: { shadow: true },
          }
        )
      ).toEqual({
        data: [1, 2, 3],
        error: null,
        isLoading: true,
        isLoadingInShadow: true,
      });
    });

    test('unsets error and loading on LOAD_SUCCESS', () => {
      expect(
        dataLayoutReducer(
          {
            data: null,
            error: new Error('mocked error'),
            isLoading: true,
            isLoadingInShadow: true,
          },
          {
            type: 'LOAD_SUCCESS',
            payload: { items: [1, 2, 3] },
          }
        )
      ).toEqual({
        data: { items: [1, 2, 3] },
        error: null,
        isLoading: false,
        isLoadingInShadow: false,
      });
    });

    test('unsets data on LOAD_ERROR and preserveData disabled', () => {
      expect(
        dataLayoutReducer<number[]>(
          {
            data: [1, 2, 3],
            error: null,
            isLoading: true,
            isLoadingInShadow: false,
          },
          {
            type: 'LOAD_FAILURE',
            payload: { error: new Error('error'), preserveData: false },
          }
        )
      ).toEqual({
        data: null,
        error: new Error('error'),
        isLoading: false,
        isLoadingInShadow: false,
      });
    });

    test('unsets data on LOAD_ERROR and preserveData enabled', () => {
      expect(
        dataLayoutReducer<number[]>(
          {
            data: [1, 2, 3],
            error: null,
            isLoading: true,
            isLoadingInShadow: false,
          },
          {
            type: 'LOAD_FAILURE',
            payload: { error: new Error('error'), preserveData: true },
          }
        )
      ).toEqual({
        data: [1, 2, 3],
        error: new Error('error'),
        isLoading: false,
        isLoadingInShadow: false,
      });
    });
  });
});
