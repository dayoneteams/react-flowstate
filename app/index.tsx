import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BasicExampleSection } from './components/BasicExampleSection';
import { InitialDataExampleSection } from './components/InitialDataExampleSection';
import { AdvancedErrorHandlingExampleSection } from './components/AdvancedErrorHandlingExampleSection';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <BasicExampleSection />
        <InitialDataExampleSection />
        <AdvancedErrorHandlingExampleSection />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
