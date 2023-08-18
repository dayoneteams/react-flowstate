import React, { useState } from 'react';
import { DataLayout } from 'react-flowstate';
import { REACT_LIBRARIES } from '@/data';

export default () => {
  const [searchKey, setSearchKey] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center">Refetch on dependency changes</h1>
      <h3 className="text-1xl text-center mb-5">
        Loading indicator and error handling
      </h3>
      <div className="mb-5">
        <label>Search Key</label>
        <input
          type="text"
          placeholder="Type library name here"
          className="ml-3 input input-bordered input-primary w-full max-w-xs"
          onChange={e => setSearchKey(e.target.value)}
        />
      </div>
      <DataLayout
        dependencies={[searchKey]}
        dataSource={([searchKey]) =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(
                  REACT_LIBRARIES.filter(reactLib =>
                    reactLib.name.match(new RegExp(searchKey as string, 'gi'))
                  )
                ),
              1000
            )
          )
        }
        debounceDelay={500}
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
        {({ data }) => (
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </div>
        )}
      </DataLayout>
    </div>
  );
};
