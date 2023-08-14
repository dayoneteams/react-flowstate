---
id: data-layout
title: <DataLayout />
sidebar_position: 1
sidebar_label: <DataLayout />
---

The `DataLayout` is the main component responsible for managing your data fetching, loading status and error handling lifecycle.

Usage:

```jsx title="App.jsx"
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

## Props

### `initialData`

Supply this value will set initial data.
- If `initialData` is set, initial data fetching will be skipped.
- If `initialData` is `undefined`, initial data fetching will triggered.

| Type    | Default     |
|---------|-------------|
| unknown | `undefined` |

---

### `children`

If `dataFallback` prop is not supplied, `children` will act as `DataFallback`
If `dataFallback` prop is supplied, `children` will act as a dynamic view that
  allows us to dynamically render whatever we want.

### `dataSource`

Query function that fetches data and return a Promise.
It is passed an optional dependency list that triggers reload behavior.

### `dependencies`

If present, data will be reloaded if the values in the list change.

### `debounceDelay`

The number of milliseconds to delay invoking `dataSource` reload behavior.
If not present, any changes to `dependendcies` prop will trigger reload
  behavior
  and may affect the performance.

### `loadingIndicator`

Render loading UI

### `shadowReload`

Default: `false`

If `shadowReload` is true, the reload behavior will keep current displayed
  data
  UI as-is and not showing loading indicator.
  However, if there is no existing data being display, loading indicator is
  still
  shown.

### `preserveDataOnError`

Default: `false`
If `preserveDataOnError` is `false` and query function failed to fetch new
  data, current existing data will be set to be `null` and `errorFallback` will
  be displayed.
Set `preserveDataOnError` to be `true` preserve existing data even if the
  query failed. Can be use together with `onError` prop to show the error
  message to user (e.g: using `toarst` or `alert()`).

### `onError`

Callback function invoked when `dataSource` fails to fetch data.

### `errorFallback`

Render error UI

### `dataFallback`

Render data UI

