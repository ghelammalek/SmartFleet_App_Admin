/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import dva from './src/routes/dva';
import Router from './src/routes/Router';


const app = dva({
  models: [],
  onError(e) {
    // console.log('onError', e);
  },
});

const App = app.start(<Router />);

export default App;