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
  <a href="https://react-flowstate.github.io/docs/get-started">Get started</a> | 
  <a href="https://react-flowstate.github.io/docs/api-reference">API</a> |
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
