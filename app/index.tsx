import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fetchDataRandomError } from './data';
import { DataLayout } from 'react-flowstate';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center">Awesome React Libraries</h1>
      <h3 className="text-1xl text-center mb-5">Appreciate the Great Works</h3>
      <DataLayout
        fetchFn={fetchDataRandomError}
        loadingIndicator={() => (
          <div className="text-center">
            <progress className="progress progress-accent w-56" />
            <div>Wait me a sec ...</div>
          </div>
        )}
        errorFallback={(err, { reload, isLoading }) => (
          <div className="text-center">
            <span className="text-5xl" role="img" aria-label="cry on error">
              🥵
            </span>
            <div className="text-red-500 mt-1">{err.message}</div>
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => reload()}
                className="btn btn-primary btn-sm"
                disabled={isLoading}
              >
                Reload
              </button>
            </div>
          </div>
        )}
      >
        {({ data, reload, isLoading }) => (
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {data.map((member, index) => (
                <div className="card bg-green-100 shadow-xl" key={index}>
                  <div className="card-body">
                    <h2 className="card-title">{member.name}</h2>
                    <p>{member.description}</p>
                    <a
                      className="link link-secondary"
                      href={member.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {member.websiteUrl}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => reload()}
                className="btn btn-primary"
                disabled={isLoading}
              >
                Reload
              </button>
              &nbsp;
              <button
                onClick={() => reload({ shadow: true })}
                disabled={isLoading}
                className="btn btn-secondary"
              >
                Shadow Reload
              </button>
            </div>
          </div>
        )}
      </DataLayout>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
