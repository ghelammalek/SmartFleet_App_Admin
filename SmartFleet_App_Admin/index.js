import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

AppRegistry.registerComponent('SmartFleet_App_Admin', () => App);
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
    'Module RCTBaiduMapManager requires main queue setup since it overrides',
    'You should only render one navigator explicitly in your app',
    'Method `jumpToIndex` is deprecated.',
    'createTabNavigator is deprecated.',
    'Class RCTCxxModule was not exported.'
]);