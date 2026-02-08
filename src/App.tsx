import { useEffect, useRef } from "react";
import PRGenerator from "./pages/PRGenerator";
import { setupMessageListener } from "./utils/setupMessageListener";
import { usePRStore } from "./store/prGenerator.store";

const App = () => {
  const { titleResult, descriptionResult } = usePRStore();
  const listenerSetup = useRef(false);

  useEffect(() => {
    if (!listenerSetup.current) {
      setupMessageListener();
      listenerSetup.current = true;
      console.log("📱 App mounted, message listener setup");
    }
  }, []);

  // Check if data arrived
  useEffect(() => {
    console.log("📊 Store updated:", { titleResult, descriptionResult });
  }, [titleResult, descriptionResult]);

  return (
    <div>
      <PRGenerator />
      {/* Debug info - remove in production */}
      <div style={{ fontSize: "10px", padding: "4px", color: "gray" }}>
        Title: {titleResult ? "✅ Received" : "⏳ Waiting"}
        <br />
        Description: {descriptionResult ? "✅ Received" : "⏳ Waiting"}
      </div>
    </div>
  );
};

export default App;
