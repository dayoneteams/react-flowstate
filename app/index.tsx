import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BasicSection } from './components/BasicSection';
import { BasicInitialDataSection } from './components/BasicInitialDataSection';
import { HideErrorFallbackSection } from './components/HideErrorFallbackSection';
import { BasicShadowReloadSection } from './components/BasicShadowReloadSection';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <BasicSection />
        <BasicShadowReloadSection />
        <BasicInitialDataSection />
        <HideErrorFallbackSection />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
