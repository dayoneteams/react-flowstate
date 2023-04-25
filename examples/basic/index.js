import React from 'react';
import ReactDOM from 'react-dom';
import {DataLayout} from 'react-flowstate';

const fetchFn = () => new Promise(resolve => setTimeout(() => resolve([
  'React',
  'Redux',
  'Relay',
  'React Native'
]), 1000));

const Basic = () => (
  <div>
    <h1>Basic Example</h1>
    <DataLayout
      fetchFn={fetchFn}
      loadingIndicator={() => (
        <div>Loading...</div>
      )}
    >
      {({data, reload}) => (
        <div>
          <ul>
            {data.map((jsLib, index) => (
              <li key={index}>{jsLib}</li>
            ))}
          </ul>
          <div>
            <button onClick={() => reload()}>Reload</button>
          </div>
        </div>
      )}
    </DataLayout>
  </div>
);

ReactDOM.render(<Basic />, document.getElementById('root'));
