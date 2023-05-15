import {DataLayout} from "react-flowstate";
import {fetchDataRandomError, INITIAL_DATA} from "@/data";

export default () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center">Basic initial data</h1>
      <h3 className="text-1xl text-center mb-5">
        Preset data (useful for SSR). Reload browser to see initial is displayed
        by default.
      </h3>
      <DataLayout
        initialData={INITIAL_DATA}
        dataSource={fetchDataRandomError}
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
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => reload()}
                className="btn btn-primary"
                disabled={isLoading}
              >
                Reload
              </button>
            </div>
          </div>
        )}
      </DataLayout>
    </div>
  );
}
