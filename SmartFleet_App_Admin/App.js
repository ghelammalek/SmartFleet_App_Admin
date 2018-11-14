/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import dva from './src/routes/dva';
import Router from './src/routes/Router';

import Spalsh from './src/models/Spalsh/Spalsh';
import Login from './src/models/Login/Login';
import Home from './src/models/Home/Home';
import FullView from './src/models/FullView/FullView';
import SiteDetail from './src/models/FullView/SiteDetail';
import HistoryView from './src/models/FullView/HistoryView';
import RegisterCar from './src/models/FullView/RegisterCar';
import Events from './src/models/Events/Events';
import EventDetail from './src/models/Events/EventDetail';
import Setting from './src/models/Setting/Setting';


import SplashScreen from 'react-native-splash-screen';

const app = dva({
  models: [Spalsh, Login, Home, FullView, Events, EventDetail, Setting, SiteDetail, RegisterCar, HistoryView],
  onError(e) {
    // console.log('onError', e);
  },
});

const App = app.start(<Router />);

export default App;