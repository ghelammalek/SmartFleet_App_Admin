import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';

import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';

class Setting extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Welcome to React Native!</Text>
                <Text >Setting.js</Text>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(Setting);