/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    NativeAppEventEmitter
} from 'react-native';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createTabNavigator,
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import SplashScreen from 'react-native-splash-screen';
import JPushModule from 'jpush-react-native';
import Images from '../constants/Images';
import I18n from '../language/index';
import { isEmpty, createAction } from '../utils/index';
import Global from '../utils/Global';
import setting from '../utils/setting';


import Spalsh from '../pages/Spalsh/Spalsh';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import FullView from '../pages/FullView/FullView';
import Events from '../pages/Events/Events';
import Setting from '../pages/Setting/Setting';
import RouterConfig from './routerConfig';

let tabBarIcon = function (focused, tintColor, imgNormal, imgFocus) {
    let IconImg = focused ? imgFocus : imgNormal;
    return <Image source={IconImg} style={{ tintColor: tintColor, width: 24, height: 20, resizeMode: 'contain' }} />
}
export default class Router extends Component {
    constructor(props) {
        super(props);
        var cfg = new setting();
        if (Global.cfg == undefined) {
            Global.cfg = cfg;
            cfg.getRunningConfig(this);
        }
        this.state = {
            access_token: '',
            refresh_token: '',
            pushMsg: '',
        }
    }
    refresh(cfg) {
        Global.cfg = cfg;
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            JPushModule.initPush()
            JPushModule.getInfo(map => {
            })
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        } else {
            JPushModule.setupPush()
        }


    }
    componentWillUnmount() {
        // NetInfo.removeEventListener(
        //     'connectionChange',
        //     handleFirstConnectivityChange
        // );
        // JPushModule.removeReceiveCustomMsgListener();
        // JPushModule.removeReceiveNotificationListener();
        // JPushModule.removeReceiveOpenNotificationListener();
        if (Platform.OS === 'ios') {
            NativeAppEventEmitter.removeAllListeners();
            DeviceEventEmitter.removeAllListeners();
        }
    }
    renderTabs() {
        return createTabNavigator({
            Home: {
                screen: Home,
                navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, Images.tab_home, Images.tab_home_h),
                }),
            },
            FullView: {
                screen: FullView,
                navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, Images.tab_fullview, Images.tab_fullview_h),
                }),
            },
            Events: {
                screen: Events,
                navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, Images.tab_event, Images.tab_event_h),
                }),
            },
            Setting: {
                screen: Setting,
                navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused, tintColor }) => tabBarIcon(focused, tintColor, Images.tab_about, Images.tab_about_h),
                }),
            },
        }, {
                tabBarPosition: 'bottom',
                swipeEnabled: false,
                backBehavior: 'none',
                animationEnabled: false,
                lazy: true,
                initialRouteName: 'Home',
                tabBarOptions: {
                    activeTintColor: '#24ba8e',
                    inactiveTintColor: '#9797a3',
                    showLabel: true,
                    showIcon: true,
                    upperCaseLabel: false,
                    headerTitleStyle: {
                        flex: 1,
                        textAlign: 'center',
                    },
                    labelStyle: {//
                        fontSize: 12,
                        margin: 0,
                    },
                    style: {
                        height: 49,
                        borderTopWidth: 0.5,
                        borderTopColor: '#e7e7e7',
                        backgroundColor: '#fff',
                    },
                    indicatorStyle: {
                        height: 0,
                    },
                },
            });
    }
    renderApp() {
        const Main = this.renderTabs();
        return createStackNavigator({
            Spalsh: {
                screen: Spalsh,
                navigationOptions: ({ navigation }) => ({
                    header: null,
                })
            },
            Login: {
                screen: Login,
                navigationOptions: {
                    header: null,
                }
            },
            Main: {
                screen: Main,
                navigationOptions: ({ navigation }) => ({
                    header: null,
                })
            },
            ...RouterConfig,
        }, {
                initialRouteName: "Spalsh",
                transitionConfig: () => ({
                    // 只要修改最后的forVertical就可以实现不同的动画了。
                    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
                }),
                navigationOptions: ({ navigation }) => ({
                    gesturesEnabled: true,
                    headerStyle: {
                        // backgroundColor: 'red',
                        // borderBottomWidth: 2,
                        // borderBottomColor: 'red',
                    },
                    headerTitleStyle: {
                        flex: 1,
                        fontSize: 18,
                        color: '#1c1c1d',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },
                }),
            });
    }
    render() {
        const AppNavigator = this.renderApp();
        return <AppNavigator />
    }
}
