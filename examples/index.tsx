import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {css, Global} from "@emotion/react";
import {fetchData} from "./data";
import {DataLayout} from '../.';

const App = () => {
  return (
    <div>
      <Global
        styles={css`
        .card {
          background-color: hotpink;
          padding: 16px;
          margin-top: 16px;
          margin-bottom: 16px;
        }
        
        .card-title {
          font-size: 24px;
        }
        
        .loading-indicator {
          padding-top: 24px;
          padding-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .reload-button-container {
          text-align: center;
        }
        
        .reload-button {
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          color: black;
          font-weight: bold;
          cursor: pointer;
          &:hover {
            color: white;
          }
        }
      `}/>
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
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
