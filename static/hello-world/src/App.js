import React, { useEffect, useState } from 'react';
import { view } from '@forge/bridge';
import View from './View'; // Import the View component
import Edit from './Edit'; // Import the Edit component

// Main application component
function App() {
  // State variable to store the context received from the Forge platform
  const [context, setContext] = useState();

  // Fetch the context using the view.getContext() function when the component mounts
  useEffect(() => {
    view.getContext().then(setContext);
  }, []);

  // If the context is not available yet, show a loading message
  if (!context) {
    return 'Loading...';
  }

  // Determine the entry point based on the context and render either the Edit or View component
  return context.extension.entryPoint === 'edit' ? <Edit /> : <View />;
}

export default App;
