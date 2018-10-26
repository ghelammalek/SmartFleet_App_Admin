import React, {
    Component,
} from 'react'
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    DeviceEventEmitter,
    Dimensions,
} from 'react-native'

import Barcode from 'react-native-smart-barcode'
import TimerEnhance from 'react-native-smart-timer-enhance'
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from "../../widget/LoadingView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';

//const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

class ScanView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '扫一扫',
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                <Barcode style={{ flex: 1, alignSelf: 'stretch', }}
                    ref={component => this._barCode = component}
                    onBarCodeRead={this._onBarCodeRead} />
            </View>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this._barCode.stopScan()
    }

    _onBarCodeRead = (e) => {
        const code = e.nativeEvent.data.code;
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();
        if (code == undefined) {
            Alert.alert('', '无数据', [
                { text: 'OK', onPress: () => this._startScan() },
            ])
        } else {
            this.props.navigation.state.params.callback(code);
            this.props.navigation.goBack();
        }

    }
    _startScan = (e) => {
        this._barCode.startScan()
    }
    _stopScan = (e) => {
        this._barCode.stopScan()
    }
}

export default TimerEnhance(ScanView)