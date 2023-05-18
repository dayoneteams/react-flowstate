import { describe, test } from '@jest/globals';
import { dataLayoutReducer } from './useDataLayout';

describe('useDataLayout', () => {
  describe('dataLayoutReducer()', () => {
    test('unsets error and set loading on LOAD_START', () => {
      expect(
        dataLayoutReducer(
          {
            initialDataLoaded: true,
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
        initialDataLoaded: true,
        data: {},
        error: null,
        isLoading: true,
        isLoadingInShadow: false,
      });

      expect(
        dataLayoutReducer(
          {
            initialDataLoaded: true,
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
        initialDataLoaded: true,
        data: {},
        error: null,
        isLoading: true,
        isLoadingInShadow: true,
      });
    });

    test('unsets error and loading on LOAD_SUCCESS', () => {
      expect(
        dataLayoutReducer(
          {
            initialDataLoaded: false,
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
        initialDataLoaded: true,
        data: { items: [1, 2, 3] },
        error: null,
        isLoading: false,
        isLoadingInShadow: false,
      });
    });
  });
});
