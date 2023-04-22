import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataLayout } from '../.';

const MOCKED_DATA = {
  countries: ['Viet Nam', 'US', 'China'],
  languages: ['vi-VN', 'en-US', 'en-UK'],
};
interface DataResponseType {
  countries: string[];
  languages: string[];
}
const App = () => {
  const fetchData = () =>
    new Promise<DataResponseType>(resolve =>
      setTimeout(() => resolve(MOCKED_DATA), 500)
    );

  return (
    <DataLayout
      fetchFn={fetchData}
      loadingIndicator={() => <div>Dang loading day12345</div>}
    >
      {({ data: { countries, languages }, reload }) => (
        <div>
          <h1>Countries</h1>
          {countries.map((country, index) => (
            <div key={index}>{country}</div>
          ))}
          <h1>Languages</h1>
          {languages.map((language, index) => (
            <div key={index}>{language}</div>
          ))}
          <button onClick={reload}>Reload</button>
        </div>
      )}
    </DataLayout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
