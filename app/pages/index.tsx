import {BasicInitialDataSection} from "@/components/BasicInitialDataSection";
import {HideErrorFallbackSection} from "@/components/HideErrorFallbackSection";
import {BasicSection} from "@/components/BasicSection";
import {BasicShadowReloadSection} from "@/components/BasicShadowReloadSection";

const App = () => (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-2 gap-4">
      <BasicSection />
      <BasicShadowReloadSection />
      <BasicInitialDataSection />
      <HideErrorFallbackSection />
    </div>
  </div>
);

export default App;
