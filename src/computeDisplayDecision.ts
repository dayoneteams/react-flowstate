export function computeDisplayDecision<D>(
  config: { preserveDataOnError?: boolean },
  context: {
    isLoading: boolean;
    isLoadingInShadow: boolean;
    error: Error | null;
    initialDataLoaded: boolean;
    data: D;
  }
) {
  const { preserveDataOnError } = config;
  const {
    isLoading,
    isLoadingInShadow,
    error,
    initialDataLoaded,
    data,
  } = context;

  // TODO: always show loading indicator when data is not available
  const showLoadingIndicator =
    isLoading && (!data || !isLoadingInShadow || !!error || !initialDataLoaded);
  const showErrorFallback =
    !!error &&
    !showLoadingIndicator &&
    (!initialDataLoaded || !preserveDataOnError);
  const showDataFallback =
    initialDataLoaded && !showErrorFallback && !showLoadingIndicator;
  return {
    showLoadingIndicator,
    showDataFallback,
    showErrorFallback,
  };
}
