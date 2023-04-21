import React, {
  createContext,
  ReactNode,
  useEffect,
  useState
} from 'react';

type Props<D> = {
  children: (data: D) => ReactNode;
  refresh?: (method: {refetchData: () => void}) => void;
  fetchFn: () => D | Promise<D>;
};
export const DataLayoutCtx = createContext<{data?: any}>({});
export const DataLayout = <D,>({fetchFn, refresh}: Props<D>) => {
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

  // const renderChildren = useCallback(() => children(data), [data, children]);

  return (
    <DataLayoutCtx.Provider value={{data}}>
      {loading ? <div>Loading ...</div> : <div>Loaded</div>}
    </DataLayoutCtx.Provider>
  );
};
