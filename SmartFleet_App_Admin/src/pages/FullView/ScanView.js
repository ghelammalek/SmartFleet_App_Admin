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
import {
    NavigationBar,
    NavBarBtn,
    LoadingView,
    Images,
    I18n,
    Global,
    setting,
    moment,
    ihtool
} from '../../routes/index';
import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import Barcode from 'react-native-smart-barcode'
import TimerEnhance from 'react-native-smart-timer-enhance'

class ScanView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('scan'),
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                <Barcode style={{ flex: 1, alignSelf: 'stretch', }}
                    ref={component => this._barCode = component}
                    onBarCodeRead={this._onBarCodeRead}
                />

                {
                    this.state.isLoading ? <LoadingView /> : <View />
                }
            </View>
        )
    }
    submit(sn, mac) {
        if (sn == '') {
            Alert.alert('', I18n.t('please_entry_sn'),
                [{ text: I18n.t('okText'), onPress: () => { } }]
            );
        } else if (mac == '') {
            Alert.alert('', I18n.t('please_entry_mac'),
                [{ text: I18n.t('okText'), onPress: () => { } }]
            );
        } else {
            this.setState({
                isLoading: true,
            });
            this.props.dispatch({
                type: 'registerCar/getGatewayInfo',
                payload: {
                    sn: sn,
                    mac: mac,
                },
                onSuccess: (result) => {
                    this.setState({ isLoading: false });
                },
                onFaild: (result) => {
                    this.setState({ isLoading: false });
                }
            })
        }
    }
    componentWillUnmount() {
        this._barCode.stopScan()
    }

    _onBarCodeRead = (e) => {
        const code = e.nativeEvent.data.code;
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();
        if (code == undefined) {
            Alert.alert('', I18n.t('invalid_data'),
                [{
                    text: I18n.t('okText'),
                    onPress: () => this._startScan()
                }]);
        } else {
            // this.props.navigation.state.params.callback(code);
            // this.props.navigation.popToTop();
            const dict = ihtool.changeQRCode(code);
            if (dict.sn && dict.mac) {
                this.submit(dict.sn, dict.mac);
            } else {
                Alert.alert('', I18n.t('invalid_data'),
                    [{
                        text: I18n.t('okText'),
                        onPress: () => {
                            if (this._barCode) {
                                this._barCode.startScan()
                            }
                        }
                    }]);
            }
        }

    }
    _startScan = (e) => {
        if (this._barCode) {
            this._barCode.startScan()
        }
    }
    _stopScan = (e) => {
        if (this._barCode) {
            this._barCode.stopScan()
        }
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(TimerEnhance(ScanView));
