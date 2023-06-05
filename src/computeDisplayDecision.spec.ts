import { describe, test } from '@jest/globals';
import { computeDisplayDecision } from './computeDisplayDecision';

describe('DataLayout', () => {
  describe('computeDisplayDecision()', () => {
    test('shows loading indicator while fetching data by default', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: true,
            isLoadingInShadow: false,
            error: null,
            initialDataLoaded: true,
            data: null,
          }
        )
      ).toEqual({
        showLoadingIndicator: true,
        showDataFallback: false,
        showErrorFallback: false,
      });
    });

    test('shows loading indicator when data is not available', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: true,
            isLoadingInShadow: false,
            error: null,
            initialDataLoaded: false,
            data: null,
          }
        )
      ).toEqual({
        showLoadingIndicator: true,
        showDataFallback: false,
        showErrorFallback: false,
      });

      // Ignore shadow mode.
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: true,
            isLoadingInShadow: true,
            error: null,
            initialDataLoaded: false,
            data: null,
          }
        )
      ).toEqual({
        showLoadingIndicator: true,
        showDataFallback: false,
        showErrorFallback: false,
      });
    });

    test('shows loading indicator when reloading after error fallback', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: true,
            isLoadingInShadow: true,
            error: new Error('mocked error'),
            initialDataLoaded: true,
            data: null,
          }
        )
      ).toEqual({
        showLoadingIndicator: true,
        showDataFallback: false,
        showErrorFallback: false,
      });
    });

    test('hides loading indicator when reloading in shadowReload mode and data exists', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: true,
            isLoadingInShadow: true,
            error: null,
            initialDataLoaded: true,
            data: [1, 2, 3],
          }
        )
      ).toEqual({
        showLoadingIndicator: false,
        showDataFallback: true,
        showErrorFallback: false,
      });
    });

    test('shows error fallback on error by default', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: false,
            isLoadingInShadow: false,
            error: new Error('api error'),
            initialDataLoaded: true,
            data: null,
          }
        )
      ).toEqual({
        showLoadingIndicator: false,
        showDataFallback: false,
        showErrorFallback: true,
      });
    });

    test('shows error fallback on error when data does not exist', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: true },
          {
            isLoading: false,
            isLoadingInShadow: false,
            error: new Error('api error'),
            initialDataLoaded: false,
            data: null,
          }
        )
      ).toEqual({
        showLoadingIndicator: false,
        showDataFallback: false,
        showErrorFallback: true,
      });
    });

    test('hides error fallback and keeps showing data content on error when preserveDataOnError is "true"', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: true },
          {
            isLoading: false,
            isLoadingInShadow: false,
            error: new Error('api error'),
            initialDataLoaded: true,
            data: [1, 2, 3],
          }
        )
      ).toEqual({
        showLoadingIndicator: false,
        showDataFallback: true,
        showErrorFallback: false,
      });
    });

    test('shows data content when no error or data fetching happens', () => {
      expect(
        computeDisplayDecision(
          { preserveDataOnError: false },
          {
            isLoading: false,
            isLoadingInShadow: false,
            error: null,
            initialDataLoaded: true,
            data: [1, 2, 3],
          }
        )
      ).toEqual({
        showLoadingIndicator: false,
        showDataFallback: true,
        showErrorFallback: false,
      });
    });
  });
});
