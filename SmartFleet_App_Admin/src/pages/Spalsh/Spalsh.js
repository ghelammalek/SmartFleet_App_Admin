import React, { Component } from 'react';
import {
    Platform,
    View,
    Alert,
    Dimensions,
    StatusBar,
    Image,
} from 'react-native';

import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import { getLanguages } from 'react-native-i18n';
import SplashScreen from 'react-native-splash-screen';

import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import moment from 'moment';

const singin = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login' })
    ]
});
const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main' })
    ]
});

class Spalsh extends Component {
    constructor(props) {
        super(props);
        var cfg = new setting();
        cfg.getRunningConfig(this);
    }
    refresh(cfg) {
        Global.cfg = cfg;
        Global.cfg.language = 'zh';
        if (isEmpty(Global.cfg.language)) {
            getLanguages().then(languages => {
                I18n.locale = languages[0];
            });
        } else {
            I18n.locale = Global.cfg.language;
        }
        if (isEmpty(Global.cfg.serverIP)) {
            if (Global.cfg.language.indexOf('zh')) {
                Global.cfg.serverIP = 'http://cd.inhandcloud.com:20080';
                Global.cfg.serverName = '国内';
            } else {
                Global.cfg.serverIP = 'http://cd.inhandcloud.com:20080';
                Global.cfg.serverName = 'Global';
            }
        }

        Global.cfg.setRunningConfig();
        Global.global.navigation = this.props.navigation;
        setTimeout(() => {
            SplashScreen.hide();
            if (isEmpty(Global.cfg.access_token)) {
                this.props.navigation.dispatch(singin);
            } else {
                this.props.navigation.dispatch(main);
            }
        }, 1000);
    }
    render() {
        let { width, height } = Dimensions.get("window");
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <Image source={Images.spalsh} resizeMode={'cover'} style={{ width: width, height: height }} />
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(Spalsh);