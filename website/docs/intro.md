---
sidebar_position: 1
---

# Get Started

Let's discover **React Flowstate in less than 5 minutes**.

## Installation

```bash
npm install react-flowstate
```

## Basic Usage

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
