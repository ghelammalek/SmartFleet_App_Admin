import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    TextInput,
    Keyboard,
    TouchableOpacity,
} from 'react-native';

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
import styles from '../../styles/FullView/addGatewayStyle';

class AddGateway extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('add_car'),
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            mac: '',
            isLoading: false,
            keyboardHeight: 0,
        }
    }
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
    }
    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }
    _keyboardWillShow(e) {
        // const H = e.endCoordinates.height - (Dimensions.get('window').height / 2 - 130);
        this.setState({
            keyboardHeight: e.endCoordinates.height,
        });
    }
    _keyboardWillHide(e) {
        this.setState({
            keyboardHeight: 0
        })
    }
    scanGatewaySn() {
        Keyboard.dismiss();
        this.props.navigation.navigate('ScanView', {
            callback: (backdata) => {
                const dict = ihtool.changeQRCode(backdata);
                if (dict.sn && dict.mac) {
                    this.setState({
                        sn: dict.sn,
                        mac: dict.mac,
                    });
                    this.submit(dict.sn, dict.mac);
                }
            }
        });
    }
    submit(sn, mac) {
        Keyboard.dismiss();
        if (this.state.keyboardHeight == 0) {
            if (sn == '') {
                Alert.alert('', I18n.t('please_entry_sn'),
                    [{ text: I18n.t('okText'), onPress: () => { } }]
                );
            } else if (mac == '') {
                Alert.alert('', I18n.t('please_entry_sn'),
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
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={[styles.container, styles.center]}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{'获取网关信息'}</Text>
                    </View>
                    <View style={styles.subtitleView}>
                        <Text style={styles.subtitle}>{'1.扫码'}</Text>
                    </View>
                    <TouchableOpacity style={styles.scanImageView}
                        activeOpacity={0.6}
                        onPress={() => { this.scanGatewaySn() }}
                    >
                        <Image style={styles.scanImageView}
                            resizeMode='contain'
                            source={Images.gateway_scan}
                        />
                    </TouchableOpacity>
                    <View style={styles.subtitleView}>
                        <Text style={styles.subtitle}>{'2.手动输入'}</Text>
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'请输入网关序列号'}
                            defaultValue={this.state.sn}
                            returnKeyType='done'
                            onEndEditing={(event) => {
                                this.setState({ sn: event.nativeEvent.text.trim() })
                            }}
                            onSubmitEditing={(event) => {
                                this.setState({ sn: event.nativeEvent.text.trim() })
                            }}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'请输入网关mac地址'}
                            defaultValue={this.state.mac}
                            returnKeyType='done'
                            onEndEditing={(event) => {
                                this.setState({ mac: event.nativeEvent.text.trim() })
                            }}
                            onSubmitEditing={(event) => {
                                this.setState({ mac: event.nativeEvent.text.trim() })
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.submitView}
                        activeOpacity={0.6}
                        onPress={() => this.submit(this.state.sn, this.state.mac)} >
                        <Text style={styles.submit}>{'下一步'}</Text>
                    </TouchableOpacity>
                    {
                        this.state.isLoading ? <LoadingView /> : <View />
                    }
                </View>
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(AddGateway);