/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AuthStack } from './src/Navigation/AuthStack';
import { StatusBar } from 'react-native';

const App = (): JSX.Element =>  {
  return (
    <>
      <StatusBar barStyle = "dark-content" translucent={true} backgroundColor='#FFFBFF' />
      <AuthStack />
    </>
  );
}


export default App;
