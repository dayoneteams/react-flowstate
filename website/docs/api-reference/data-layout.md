---
id: data-layout
title: <DataLayout />
sidebar_position: 1
sidebar_label: <DataLayout />
---

The `DataLayout` is the main component responsible for managing your data fetching, loading status and error handling lifecycle.

## Example

```jsx title="App.jsx"
import {DataLayout} from 'react-flowstate';

const fetchData = () => Math.random();

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
- Otherwise, initial data fetching will triggered.

| Type    |
|---------|
| Data |

---

### `children`

:::danger
Please read **carefully**.
:::

- If [<code>dataFallback</code>](#datafallback) prop is **not supplied**, `children` will act as [<code>DataFallback</code>](#datafallback-1).
- If [<code>dataFallback</code>](#datafallback) and `children` props are both **supplied**, `children` will act as `AutoFallback`.

| Type                                           |
|------------------------------------------------|
| [DataFallback](#data-fallback) \| AutoFallback |

---

### `dataSource`

```tsx
(deps?: DependencyList) => Promise<Data>
```

Query function that fetches data and return a `Promise`.
If [<code>dependencies</code>](#dependencies) prop is supplied, `dataSource` will be refetched and trigger reload behavior.

| Type    |
|---------|
| function |

### `dependencies`

If present, data will be reloaded if the values in the list change.

:::caution
Should be used together with [<code>debounceDelay</code>](#debouncedelay) prop to avoid performance issue.
:::

| Type    |
|---------|
| React.DependencyList  |

### `debounceDelay`

The number of milliseconds to delay invoking `dataSource` reload behavior.
If not present, any changes to `dependendcies` prop will trigger reload
  behavior
  and may affect the performance.

| Type    |
|---------|
| number  |

### `loadingIndicator`

```tsx
React.ReactNode | (() => React.ReactNode)
```

Render loading UI.

| Type    |
|---------|
| React.ReactNode \| function  |

### `shadowReload`

If `shadowReload` is true, the reload behavior will keep current displayed
  data
  UI as-is and not showing loading indicator.
  However, if there is no existing data being display, loading indicator is
  still
  shown.

| Type    | Default |
|---------|---------|
| boolean | `false` |

### `preserveDataOnError`

- If `preserveDataOnError` is `false` and query function failed to fetch new
  data, current existing data will be set to be `null` and `errorFallback` will
  be displayed.
- Set `preserveDataOnError` to be `true` preserve existing data even if the
  query failed. Can be use together with `onError` prop to show the error
  message to user (e.g: using `toarst` or `alert()`).

| Type    | Default |
|---------|---------|
| boolean | `false` |

### `onError`

```tsx
(err: Error, props: DataLayoutProps<Data>) => unknown
```
Callback function invoked when `dataSource` fails to fetch data.

| Type    |
|---------|
| function |

### `errorFallback`

Render error UI.

| Type                           |
|--------------------------------|
| [ErrorFallback](#errorfallback-1) |

### `dataFallback`

Render data UI.

| Type                           |
|--------------------------------|
| [DataFallback](#datafallback-1) |

## Type Definitions

### DataFallback
Used for rendering data content.

| Type              |
|-------------------|
| React.ReactNode \| (props: DataLayoutProps<Data\>) => React.ReactNode |

### ErrorFallback
Used for rendering data content.

| Type              |
|-------------------|
| React.ReactNode \| (err: Error, props: DataLayoutProps<Data\>) => React.ReactNode |
