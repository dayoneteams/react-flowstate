# react-flowstate

Say goodbye to a lot of repetitive `useState` and `useEffect` when dealing with data.
Put your mind in flow-state.

<p align="center">
  <a href="https://github.com/dayoneteams/react-flowstate/tree/main/examples">Examples</a>
</p>

### Features

- Dead simple to use.
- Automatically manage data lifecycle and display condition.
- Reload data on dependency change with debounce support.
- Supports React Native.
- Supports Typescript.

### Install
```
npm install react-flowstate
```

### Quickstart

```tsx
import { DataLayout } from 'react-flowstate';

function App() {
  return (
    <DataLayout
      dataSource={() => fetchData()}
      loadingIndicator={() => (
        <div>Loading ...</div>
      )}
      errorFallback={(err, { reload, isLoading }) => (
        <div>{err.message}</div>
      )}
    >
      {({ data }) => (
        <div>Your data is here: {data}</div>
      )}
    </DataLayout>
  );
}
```
