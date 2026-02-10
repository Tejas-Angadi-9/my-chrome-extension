import { useEffect, useRef } from "react";
import PRGenerator from "./pages/PRGenerator";
import { setupMessageListener } from "./utils/setupMessageListener";

const App = () => {
  const listenerSetup = useRef(false);

  useEffect(() => {
    if (!listenerSetup.current) {
      // setupMessageListener(); 
      listenerSetup.current = true;
    }
  }, []);

  return (
    <div className="min-h-[var(--popup-min-height)] flex flex-col bg-[var(--bg-primary)]">
      <PRGenerator />
    </div>
  );
};

export default App;
