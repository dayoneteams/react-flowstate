import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {fetchData} from './data';
import {DataLayout} from '../.';
import "./style.css";

const App = () => {
  return (
    <div>
      <h1><center>Awesome React Libraries</center></h1>
      <h3><center>Appreciate Great Works</center></h3>
      <DataLayout
        fetchFn={fetchData}
        loadingIndicator={() => <div className="loading-indicator">Wait me a sec ...</div>}
      >
        {({ data , reload }) => (
          <div className="container">
            <div className="card-list">
              {data.map((member, index) => (
                <div key={index} className="card">
                  <div className="card-body">
                    <div className="card-title">{member.name}</div>
                    <div>{member.description}</div>
                    <div>
                      <a href={member.websiteUrl} target="_blank">
                        {member.websiteUrl}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reload-button-container">
              <button onClick={reload} className="reload-button">Reload</button>
              &nbsp;
              <button onClick={reload} className="reload-button">Shadow Reload</button>
            </div>
          </div>
        )}
      </DataLayout>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
