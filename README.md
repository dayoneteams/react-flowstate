# react-flowstate

```
useState and useEffect, they're so lame
They're making me mad, I'm gonna change the game
react-flowstate, the library that's gonna make you feel sane
So say goodbye to those two, and let's get this party started!
This is from Google Bard - don't like it? Just send your PR!
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
import { DataLayout } from 'react-flowstate';

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
      {({ data }) => (
        <div>Your data is here: {data}</div>
      )}
    </DataLayout>
  );
}
```
