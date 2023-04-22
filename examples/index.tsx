import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {fetchData} from "./data";
import {DataLayout} from '../.';
import "./style.css";

const App = () => {
  return (
    <DataLayout
      fetchFn={fetchData}
      loadingIndicator={() => <div className="loading-indicator">Loading ... In Your Area!</div>}
    >
      {({ data , reload }) => (
        <div className="container">
          <div>
            {data.map((member, index) => (
              <div key={index} className="card">
                <div className="card-title">{member.name}</div>
                <div>{member.birthYear}</div>
                <div>{member.position}</div>
              </div>
            ))}
          </div>
          <div className="reload-button-container">
            <button onClick={reload} className="reload-button">Reload</button>
          </div>
        </div>
      )}
    </DataLayout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
