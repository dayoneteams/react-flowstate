import 'react-app-polyfill/ie11';
import React, {useCallback} from 'react';
import * as ReactDOM from 'react-dom';
import {DataLayout} from '../.';

const App = () => {
  const fetchData = useCallback(() => new Promise(resolve => setTimeout(resolve, 2000)), []);
  return (
    <DataLayout fetchFn={fetchData}>
      {(data) => (
        <div>data loaded: {JSON.stringify(data)}</div>
      )}
    </DataLayout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
