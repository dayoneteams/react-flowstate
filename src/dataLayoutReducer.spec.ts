import { describe, test } from '@jest/globals';
import { dataLayoutReducer } from './dataLayoutReducer';

describe('dataLayoutReducer', () => {
  test('unsets error, unsets data and set loading on LOAD_START by default', () => {
    expect(
      dataLayoutReducer(
        {
          dataUpdatedAt: null,
          errorUpdatedAt: null,
          isPreservedData: false,
          loadingStartedAt: null,
          data: { countries: ['US'] },
          error: new Error('mocked error'),
          isLoading: false,
          isLoadingInShadow: false,
        },
        {
          type: 'LOAD_START',
          payload: { shadow: false, preserveData: false },
        }
      )
    ).toMatchObject({
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
          dataUpdatedAt: null,
          errorUpdatedAt: null,
          isPreservedData: false,
          loadingStartedAt: null,
        },
        {
          type: 'LOAD_START',
          payload: { shadow: true, preserveData: false },
        }
      )
    ).toMatchObject({
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
          dataUpdatedAt: null,
          errorUpdatedAt: null,
          isPreservedData: false,
          loadingStartedAt: null,
        },
        {
          type: 'LOAD_START',
          payload: { shadow: true, preserveData: false },
        }
      )
    ).toMatchObject({
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
          dataUpdatedAt: null,
          errorUpdatedAt: null,
          isPreservedData: false,
          loadingStartedAt: null,
        },
        {
          type: 'LOAD_SUCCESS',
          payload: { items: [1, 2, 3] },
        }
      )
    ).toMatchObject({
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
          dataUpdatedAt: null,
          errorUpdatedAt: null,
          isPreservedData: false,
          loadingStartedAt: null,
        },
        {
          type: 'LOAD_FAILURE',
          payload: { error: new Error('error'), preserveData: false },
        }
      )
    ).toMatchObject({
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
          dataUpdatedAt: null,
          errorUpdatedAt: null,
          isPreservedData: false,
          loadingStartedAt: null,
        },
        {
          type: 'LOAD_FAILURE',
          payload: { error: new Error('error'), preserveData: true },
        }
      )
    ).toMatchObject({
      data: [1, 2, 3],
      error: new Error('error'),
      isLoading: false,
      isLoadingInShadow: false,
    });
  });
});
