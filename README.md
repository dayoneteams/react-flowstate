# react-flowstate

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

### Features

- Dead simple to use.
- Automatically manages data lifecycle and display condition.
- Reloads data on dependency change with debounce support.
- Supports React Native and TypeScript.

### Install

```
npm install react-flowstate
```

### Quickstart

```tsx
import {DataLayout} from 'react-flowstate';

function App() {
  return (
    <DataLayout
      dataSource={() => fetchData()}
      loadingIndicator={() => (
        <div>Loading ...</div>
      )}
      errorFallback={(err) => (
        <div>{err.message}</div>
      )}
    >
      {({data}) => (
        <div>Your data is here: {data}</div>
      )}
    </DataLayout>
  );
}
```

### API Reference

#### <DataLayout /> component

`<DataLayout />` is a component that helps you with controlling data fetching
and
display.

##### Props

###### **initialData?: Data**

- Supply this value will set initial data and skip initial loading.

###### **children?: ReactNode | (props: DataLayoutProps<Data>) => ReactNode**

- If `dataFallback` prop is not supplied, `children` will act as `DataFallback`
- If `dataFallback` prop is supplied, `children` will act as a dynamic view that
  allows us to dynamically render whatever we want.

dataSource
dependencies
debounceDelay
loadingIndicator
shadowReload
preserveDataOnError
onError
errorFallback
dataFallback
