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
    <DataLayout fetchFn={fetchFn}>
      {({data}) => (
        <ul>
          {data.map((jsLib, index) => (
            <li key={index}>{jsLib}</li>
          ))}
        </ul>
      )}
    </DataLayout>
  </div>
);

ReactDOM.render(<Basic />, document.getElementById('root'));
