# react-flowstate

[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

```
useState and useEffect, they're so lame
They're making me mad, I'm gonna change the game
react-flowstate, the library that's gonna make you feel sane
So say goodbye to those two, and let's get this party started!
This is from Google Bard. Don't like it? Send your PR!
```

<p align="center">
  <a href="https://github.com/dayoneteams/react-flowstate/tree/main/examples">Examples</a>
</p>

## Features

- Dead simple to use.
- Automatically manages data lifecycle and display condition.
- Reloads data on dependency change with debounce support.
- Supports React Native and TypeScript.

## Install

```
npm install react-flowstate
```

## Quickstart

```tsx
import {DataLayout} from 'react-flowstate';

export default function App() {
  return (
    <DataLayout
      dataSource={fetchData}
      loadingIndicator={<div>Loading ...</div>}
      errorFallback={(err) => <div>{err.message}</div>}
    >
      {({data}) => <div>Your data is here: {data}</div>}
    </DataLayout>
  );
}
```

## API Reference

### ``<DataLayout />``

Component that helps you with controlling data fetching and display.

#### Props

#### **initialData?: Data**

- Supply this value will set initial data and skip initial loading.

#### **children?: ReactNode | (props: DataLayoutProps<Data>) => ReactNode**

- If `dataFallback` prop is not supplied, `children` will act as `DataFallback`
- If `dataFallback` prop is supplied, `children` will act as a dynamic view that
  allows us to dynamically render whatever we want.

#### **dataSource: (deps?: DependencyList) => Promise<Data>**

- Query function that fetches data and return a Promise.
- It is passed an optional dependency list that triggers reload behavior.

#### **dependencies?: DependencyList**

- If present, data will be reloaded if the values in the list change.

#### **debounceDelay?: number;**

- The number of milliseconds to delay invoking `dataSource` reload behavior.
- If not present, any changes to `dependendcies` prop will trigger reload
  behavior
  and may affect the performance.

#### **loadingIndicator?: RenderFunction | React.ReactNode**

- Render loading UI

#### **shadowReload?: boolean**

- Default: `false`

- If `shadowReload` is true, the reload behavior will keep current displayed
  data
  UI as-is and not showing loading indicator.
  However, if there is no existing data being display, loading indicator is
  still
  shown.

#### **preserveDataOnError?: boolean**

- Default: `false`
- If `preserveDataOnError` is `false` and query function failed to fetch new
  data, current existing data will be set to be `null` and `errorFallback` will
  be displayed.
- Set `preserveDataOnError` to be `true` preserve existing data even if the
  query failed. Can be use together with `onError` prop to show the error
  message to user (e.g: using `toarst` or `alert()`).

#### **onError?: (err: Error, state: DataLayoutState<Data>) => unknown**

- Callback function invoked when `dataSource` fails to fetch data.

#### **errorFallback?: ((err: Error, state: DataLayoutProps<Data>) => React.ReactNode) | React.ReactNode**

- Render error UI

#### **dataFallback?: DataFallbackRenderFunction<Data> | React.ReactNode**

- Render data UI
