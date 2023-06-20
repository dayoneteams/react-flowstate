export function computeDisplayDecision<D>(
  config: { preserveDataOnError?: boolean },
  context: {
    isLoading: boolean;
    isLoadingInShadow: boolean;
    error: Error | null;
    data: D;
  }
) {
  const { preserveDataOnError } = config;
  const { isLoading, isLoadingInShadow, error, data } = context;

  // TODO: always show loading indicator when data is not available
  const showLoadingIndicator =
    isLoading && (!data || !isLoadingInShadow || !!error);
  const showErrorFallback =
    !!error && !showLoadingIndicator && (!preserveDataOnError || !data);
  const showDataFallback = !showErrorFallback && !showLoadingIndicator;
  return {
    showLoadingIndicator,
    showDataFallback,
    showErrorFallback,
  };
}
