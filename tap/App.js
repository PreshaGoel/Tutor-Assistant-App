import React from 'react';
import RootStack from './navigation/RootStack';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <RootStack />
    </PaperProvider>
  );
};

export default App;
