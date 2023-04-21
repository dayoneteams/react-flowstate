import React, {
  createContext,
  ReactNode,
  useEffect,
  useState
} from 'react';

// type Helpers = {
//   reload: () => Promise<void>;
// }
type Props<D> = {
  children: (data?: D) => ReactNode;
  refresh?: (method: { refetchData: () => void }) => void;
  fetchFn: () => D | Promise<D>;
};
export const DataLayoutCtx = createContext<{ data?: any }>({});
export const DataLayout = <D,>({ fetchFn, refresh, children }: Props<D>) => {
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
    refresh({ refetchData: findData });
  }

  // const helpers: Helpers = {
  //   reload: async () => {
  //     setLoading(true);
  //     await findData();
  //   }
  // };

  return (
    <DataLayoutCtx.Provider value={{ data }}>
      {loading ? <div>Loading ...</div> : children(data)}
    </DataLayoutCtx.Provider>
  );
};
