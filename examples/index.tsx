import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataLayout } from '../.';

const App = () => {
  const fetchData =
    () => new Promise((resolve) => setTimeout(() => resolve({
      countries: ['Viet Nam', 'US', 'China'],
      languages: ['vi-VN', 'en-US', 'en-UK'],
    }), 2000));

  return (
    <DataLayout fetchFn={fetchData}>
      {({countries, languages}) => (
        <div>
          <h1>Countries</h1>
          {countries.map((country, index) => (
            <div key={index}>{country}</div>
          ))}
          <h1>Languages</h1>
          {languages.map((language, index) => (
            <div key={index}>{language}</div>
          ))}
          {/*<button onClick={helpers.reload}>Reload</button>*/}
        </div>
      )}
    </DataLayout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
