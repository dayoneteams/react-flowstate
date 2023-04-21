import React, {
  createContext,
  useEffect,
  useState
} from 'react';
import {DataLayoutConfig, ResponseData} from "./types";
import {isFunction} from "./utils";

// type Helpers = {
//   reload: () => Promise<void>;
// }
// type Props<D> = {
//   children: (data?: D) => ReactNode;
//   refresh?: (method: { refetchData: () => void }) => void;
//   fetchFn: () => D | Promise<D>;
// };
export const DataLayoutCtx = createContext<{ data?: any }>({});
// export const DataLayout = <D,>({ fetchFn, refresh, children }: Props<D>) => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<D>();
//
//   const findData = async () => {
//     const fetchedData = await fetchFn();
//     setData(fetchedData);
//     setLoading(false);
//   };
//
//   useEffect(() => {
//     findData();
//   }, [fetchFn, refresh]);
//
//   if (refresh) {
//     refresh({ refetchData: findData });
//   }
//
//   // const helpers: Helpers = {
//   //   reload: async () => {
//   //     setLoading(true);
//   //     await findData();
//   //   }
//   // };
//
//   return (
//     <DataLayoutCtx.Provider value={{ data }}>
//       {loading ? <div>Loading ...</div> : children(data)}
//     </DataLayoutCtx.Provider>
//   );
// };

export function DataLayout<
  Data extends ResponseData = ResponseData
>(props: DataLayoutConfig<Data>) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>();
  const {fetchFn} = props;

  // TODO
  const children = props.children as Function;

  const findData = async () => {
    const fetchedData = await fetchFn();
    setData(fetchedData);
    setLoading(false);
  };

  useEffect(() => {
    findData();
  }, [fetchFn]);

  // const helpers: Helpers = {
  //   reload: async () => {
  //     setLoading(true);
  //     await findData();
  //   }
  // };

  return (
    <DataLayoutCtx.Provider value={{ data }}>
      {loading
        ? <div>Loading ...</div>
        : isFunction(children) ? children(data) : React.Children.only(children)
      }
    </DataLayoutCtx.Provider>
  );
}
