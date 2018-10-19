/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import dva from './src/routes/dva';
import Router from './src/routes/Router';

import Spalsh from './src/models/Spalsh/Spalsh';
import Login from './src//models/Login/Login';
import Home from './src//models/Home/Home';
import FullView from './src//models/FullView/FullView';
import Events from './src//models/Events/Events';
import Setting from './src//models/Setting/Setting';

const app = dva({
  models: [Spalsh, Login, Home, FullView, Events, Setting],
  onError(e) {
    // console.log('onError', e);
  },
});

const App = app.start(<Router />);

export default App;