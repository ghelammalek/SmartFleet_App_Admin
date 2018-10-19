import React, { Component } from 'react';
import {
    Alert,
    View,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    BackHandler,
    Dimensions,
} from 'react-native';

import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import loginStyle from '../../styles/Login/loginStyle';
import md5 from '../../utils/md5';

class Login extends Component {
    constructor(props) {
        super(props);
        var cfg = new setting();
        if (Global.cfg == undefined) {
            Global.cfg = cfg;
            cfg.getRunningConfig(this);
        }
        this.state = {
            tel: Global.cfg.tel,
            code: '',
            username: Global.cfg.username,
            password: '',
            isCode: true,
            seconds: 60,
            keyboardHeight: 0,
        };
        this.submitAction = this.submitAction.bind(this);
        this.getCode = this.getCode.bind(this);
    }
    refresh(cfg) {
        Global.cfg = cfg;
        this.setState({
            tel: Global.cfg.tel,
            username: Global.cfg.username,
        })
    }
    getAlert(text) {
        Alert.alert('', text, [{ text: I18n.t('okText'), onPress: () => { } },]);
    }
    submitAction() {
        if (Global.cfg.loginStyle === 1) {
            if (this.state.username.trim() == '') {
                this.getAlert(I18n.t('please_entry_tel'));
            } else if (!((/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.state.tel))) {
                this.getAlert(I18n.t('tel_format_err'));
            } else if (this.state.code.trim() == '') {
                this.getAlert(I18n.t('please_entry_code'));
            } else {
                Global.cfg.tel = this.state.tel;
                Global.cfg.setRunningConfig();
                Global.global.navigation = this.props.navigation;
                this.props.dispatch({
                    type: 'login/getAccessToken_code',
                    payload: {
                        tel: this.state.tel,
                        smscode: this.state.code,
                        navigation: this.props.navigation
                    }
                });
            }
        } else {
            if (this.state.username.trim() == '') {
                this.getAlert(I18n.t('please_entry_username'));
            } else if (this.state.password.trim() == '') {
                this.getAlert(I18n.t('please_entry_password'));
            } else {
                Global.cfg.username = this.state.username;
                Global.cfg.setRunningConfig();
                Global.global.navigation = this.props.navigation;
                this.props.dispatch({
                    type: 'login/getAccessToken',
                    payload: {
                        username: this.state.username,
                        password: md5.hex_md5(this.state.password),
                        navigation: this.props.navigation
                    }
                });
            }
        }
    }
    getCode() {
        if (this.state.tel.trim() == '') {
            this.getAlert(I18n.t('please_entry_tel'));
        } else if (!((/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.state.tel))) {
            this.getAlert(I18n.t('tel_format_err'));
        } else {
            this.props.dispatch({
                type: 'login/getCode',
                payload: {
                    tel: this.state.tel,
                }
            });

            this.setState({
                seconds: 60,
                isCode: false,
                code: '',

            });
            this.timer = setInterval(
                () => {
                    if (this.state.seconds > 1) {
                        this.setState({ seconds: this.state.seconds - 1 });
                    } else {
                        this.timer && clearInterval(this.timer);
                        this.setState({ isCode: true });
                    }
                }, 1000
            );
        }
    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackClicked);
        }
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
        if (isEmpty(Global.cfg.serverIP)) {
            Global.cfg.serverIP = 'http://cd.inhandcloud.com:20080';
            Global.cfg.serverName = '国内';
        }
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
        }
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }
    _keyboardWillShow(e) {
        const H = e.endCoordinates.height - (Dimensions.get('window').height / 2 - 130);

        this.setState({
            keyboardHeight: H > 0 ? H : 0,
        });
    }
    _keyboardWillHide(e) {
        this.setState({
            keyboardHeight: 0
        })
    }
    onBackClicked() {
        return true;
    }
    changeAction() {
        this.props.navigation.navigate('ChangeView', { title: I18n.t('change_language_IP') });
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[loginStyle.container, { marginTop: -this.state.keyboardHeight }]}>
                    <StatusBar hidden={true}
                        backgroundColor='#ff0000'
                        translucent={true}
                        animated={true}
                    />
                    <Image source={Images.logo} resizeMode={'stretch'} style={loginStyle.bgImage} />
                    {
                        Global.cfg.loginType == 1 ?
                            <View style={loginStyle.body}>
                                <View style={loginStyle.textView}>
                                    <Image source={Images.login_ico_phone} resizeMode={'contain'} style={loginStyle.img} />
                                    <TextInput
                                        style={loginStyle.textInput}
                                        value={this.state.tel}
                                        placeholder={I18n.t('please_entry_tel')}
                                        placeholderTextClolor='#979797'
                                        maxLength={11}
                                        editable={!this.props.visible}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => this.setState({ tel: text })}
                                    />
                                </View>
                                <View style={loginStyle.textView} >
                                    <Image source={Images.login_ico_security_code} resizeMode={'contain'} style={loginStyle.img} />
                                    <TextInput
                                        style={loginStyle.textInput}
                                        placeholder={I18n.t('please_entry_code')}
                                        placeholderTextClolor='#979797'
                                        maxLength={6}
                                        value={this.state.code}
                                        editable={!this.props.visible}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => this.setState({ code: text })}
                                    />
                                    {
                                        this.state.isCode ?
                                            <TouchableOpacity activeOpacity={0.6} disabled={this.props.visible ? true : false} onPress={() => { Keyboard.dismiss(); this.getCode() }} >
                                                <View style={loginStyle.buttonView_code}>
                                                    <Text style={loginStyle.text}>{I18n.t('get_code')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity activeOpacity={0.6} disabled={true} onPress={() => { Keyboard.dismiss(); this.getCode() }} >
                                                <View style={[loginStyle.buttonView_code, { backgroundColor: 'gray' }]}>
                                                    <Text style={loginStyle.text}>{this.state.seconds + I18n.t('repeat_later')}</Text>
                                                </View>
                                            </TouchableOpacity>
                                    }

                                </View>
                                <View style={loginStyle.spaceView} />
                                <TouchableOpacity activeOpacity={0.6} disabled={this.props.visible} onPress={() => { Keyboard.dismiss(); this.submitAction() }} >
                                    <View style={loginStyle.buttonView_submit}>
                                        <Text style={loginStyle.buttonText}>{this.props.visible ? I18n.t('signIn_in') : I18n.t('signIn')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', marginTop: 20 }} onPress={() => this.changeAction()}>
                                    <Text style={loginStyle.changeLabel}  >{I18n.t('change_language_IP')}</Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={loginStyle.body}>
                                <View style={loginStyle.textView}>
                                    <Image source={Images.login_username} resizeMode={'contain'} style={loginStyle.img} />
                                    <TextInput
                                        style={loginStyle.textInput}
                                        value={this.state.username}
                                        placeholder={I18n.t('please_entry_username')}
                                        placeholderTextClolor='#979797'
                                        editable={!this.props.visible}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => this.setState({ username: text })}
                                    />
                                </View>
                                <View style={loginStyle.textView} >
                                    <Image source={Images.login_password} resizeMode={'contain'} style={loginStyle.img} />
                                    <TextInput
                                        style={loginStyle.textInput}
                                        placeholder={I18n.t('please_entry_password')}
                                        placeholderTextClolor='#979797'
                                        secureTextEntry={true}
                                        editable={!this.props.visible}
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => this.setState({ password: text })}
                                    />
                                </View>
                                <View style={loginStyle.spaceView} />
                                <TouchableOpacity activeOpacity={0.6} disabled={this.props.visible} onPress={() => { Keyboard.dismiss(); this.submitAction() }} >
                                    <View style={loginStyle.buttonView_submit}>
                                        <Text style={loginStyle.buttonText}>{this.props.visible ? I18n.t('signIn_in') : I18n.t('signIn')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#fff', marginTop: 20 }} onPress={() => this.changeAction()}>
                                    <Text style={loginStyle.changeLabel}  >{I18n.t('change_language_IP')}</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
function mapStateToProps(state) {
    return {
        tel: state.login.tel,
        code: state.login.code,
        username: state.login.username,
        password: state.login.password,
        visible: state.login.visible,
        language: state.login.language,
    }
}
export default connect(mapStateToProps)(Login);