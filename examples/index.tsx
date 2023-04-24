import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {fetchData} from './data';
import {DataLayout} from '../.';

const App = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-center">Awesome React Libraries</h1>
      <h3 className="text-1xl text-center mb-5">Appreciate the Great Works</h3>
      <DataLayout
        fetchFn={fetchData}
        loadingIndicator={() =>
          <div className="text-center">
            <progress className="progress progress-accent w-56" />
            <div>Wait me a sec ...</div>
          </div>}
      >
        {({ data , reload, isLoadingInShadow }) => (
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {data.map((member, index) => (
                <div className="card bg-green-100 shadow-xl" key={index}>
                  <div className="card-body">
                    <h2 className="card-title">{member.name}</h2>
                    <p>{member.description}</p>
                    <a className="link link-secondary" href={member.websiteUrl} target="_blank">{member.websiteUrl}</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <button onClick={() => reload()} className="btn btn-secondary">Reload</button>
              &nbsp;
              <button onClick={() => reload({shadow: true})} className="btn btn-secondary">
                {isLoadingInShadow ? 'Reloading ...' : 'Shadow Reload'}
              </button>
            </div>
          </div>
        )}
      </DataLayout>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
