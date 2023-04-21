import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import {LoadingIndicator} from './LoadingIndicator';

type Props<D> = {
  children: (data: D) => ReactNode;
  refresh?: (method: {refetchData: () => void}) => void;
  fetchFn: () => D | Promise<D>;
};
export const SmartLayoutCtx = createContext<{data?: any}>({});
export const DataLayout = <D,>({fetchFn, refresh, children}: Props<D>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<D>();

  const findData = async () => {
    const fetchedData = await fetchFn();
    setData(fetchedData);
    setLoading(false);
  };

  useEffect(() => {
    findData();
  }, [fetchFn, refresh]);

  if (refresh) {
    refresh({refetchData: findData});
  }

  const renderChildren = useCallback(() => children(data), [data, children]);

  return (
    <SmartLayoutCtx.Provider value={{data}}>
      {loading ? <LoadingIndicator /> : renderChildren()}
    </SmartLayoutCtx.Provider>
  );
};
