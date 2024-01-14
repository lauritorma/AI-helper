// App.js
import React, { useState } from 'react';
import { StatusBar, Switch, View } from 'react-native';
import AppContent from './components/AppContent';
import { styles } from './styles/styles';
import { FontAwesome5 } from '@expo/vector-icons';

const App = () => {
  const [lightTheme, setLightTheme] = useState(true);

  return (
    <>
      <StatusBar backgroundColor="#0088B4" barStyle="light-content" />
      <AppContent />
    </>
  );
};

export default App;