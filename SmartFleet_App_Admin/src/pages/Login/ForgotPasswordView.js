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
import ihtool from '../../utils/ihtool';
import setting from '../../utils/setting';
import loginStyle from '../../styles/Login/loginStyle';
import md5 from '../../utils/md5';
import LoadingView from '../../widget/LoadingView';

class ForgotPasswordView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('login.forget_password'),
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            smsCode: '',
            pid: '',
            url: Global.cfg.serverIP,
            isCode: false,
            isLoading: false,
        };
        this.submitAction = this.submitAction.bind(this);
        this.getCode = this.getCode.bind(this);
    }
    getAlert(text) {
        Alert.alert('', text, [{ text: I18n.t('okText'), onPress: () => { } },]);
    }
    submitAction() {
        if (this.state.email.trim() == '') {
            this.getAlert(I18n.t('common.enter_email'));
        } else if (!((/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(this.state.email))) {
            this.getAlert(I18n.t('common.enter_correct_email'));
        } else if (this.state.smsCode.trim() == '') {
            this.getAlert(I18n.t('login.enter_captcha'));
        } else {
            this.setState({ isLoading: true });
            this.props.dispatch({
                type: 'forgotPasswordView/postForgotPassword',
                payload: {
                    captcha: this.state.smsCode,
                    email: this.state.email,
                    language: 2,
                    picId: this.state.pid,
                    username: this.state.email,
                    varificationCode: this.state.smsCode
                },
                onSuccess: (data) => {
                    this.setState({ isLoading: false });
                    Alert.alert(I18n.t('message.reset_pwd_success'),
                        I18n.t('new_pwd_email'),
                        [{
                            text: I18n.t('okText'),
                            onPress: () => {
                                this.props.navigation.goBack(null);
                            }
                        },
                        ]);
                },
                onFailed: (data) => {
                    this.setState({ isLoading: false });
                    if (data) {
                        const error = 'error.' + data.error_code;
                        if (ihtool.judgeText(error)) {
                            Alert.alert('', I18n.t(error), [{ text: I18n.t('okText'), onPress: () => { } },]);
                        } else {
                            this.getAlert(I18n.t('reset_pwd_failed'));
                        }
                    } else {
                        this.getAlert(I18n.t('reset_pwd_failed'));
                    }
                    this.getCode();
                }
            });
        }
    }
    getCode() {
        this.setState({ isCode: true });
        this.props.dispatch({
            type: 'forgotPasswordView/getImageCode',
            payload: {},
            onSuccess: (data) => {
                this.setState({
                    isCode: false,
                    pid: data.pictureId,
                    url: Global.cfg.serverIP + '/api/captchas/image?pid=' + data.pictureId + '&width=250&height=70'
                });
            },
            onFailed: (data) => {
                this.setState({ isCode: false });
            }
        })
    }
    componentDidMount() {
        this.getCode();
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[loginStyle.container, { backgroundColor: '#f7f7f7' }]}>
                    <StatusBar hidden={true}
                        backgroundColor='#ff0000'
                        translucent={true}
                        animated={true}
                    />
                    <View style={loginStyle.forgetTitleView}>
                        <Text style={loginStyle.forgetTitle}>{I18n.t('forget_label')}</Text>
                    </View>
                    <View style={loginStyle.forgetView}>
                        <View style={loginStyle.forgetTextView}>
                            <Image source={Images.login_username} resizeMode={'contain'} style={loginStyle.img} />
                            <TextInput
                                style={loginStyle.textInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                placeholder={I18n.t('common.email')}
                                placeholderTextClolor='#979797'
                                // editable={!this.state.isLoading}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={loginStyle.forgetTextView} >
                            <Image source={Images.login_ico_security_code} resizeMode={'contain'} style={loginStyle.img} />
                            <TextInput
                                style={loginStyle.textInput}
                                placeholder={I18n.t('login.captcha')}
                                placeholderTextClolor='#979797'
                                autoCapitalize='none'
                                autoCorrect={false}
                                // editable={!this.props.isLoading}
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => this.setState({ smsCode: text })}
                            />
                            <TouchableOpacity activeOpacity={0.6} disabled={this.state.isCode} onPress={() => { this.getCode() }} >
                                <Image style={loginStyle.buttonView_code_}
                                    source={{ uri: this.state.url }}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={loginStyle.forgetBtn} activeOpacity={0.6} disabled={this.state.isLoading} onPress={() => { Keyboard.dismiss(); this.submitAction() }} >
                            <View >
                                <Text style={loginStyle.buttonText}>{I18n.t('reset_password')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        this.props.isLoading ? <LoadingView /> : <View />
                    }
                </View >
            </TouchableWithoutFeedback >
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(ForgotPasswordView);