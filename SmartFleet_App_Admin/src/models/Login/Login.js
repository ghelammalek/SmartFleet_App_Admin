import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import Global from '../../utils/Global';
import I18n from '../../language/index';
import api from '../../constants/api';
import moment from 'moment';
import ihtool from '../../utils/ihtool';
import JPushModule from 'jpush-react-native';



const signin = params => StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main' })
    ]
});
export default {
    namespace: 'login',
    state: {
        tel: '',
        code: '',
        visible: false,
        language: '',
        username: '',
        password: '',
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getCode({ payload }, { call, put, select }) {
            const data = yield call(api.getCode, payload.tel);
            // console.log(data);
            if (data) {
                if (data.error) {
                    if (data.error_code == 10024) {
                        Alert.alert('', I18n.t('get_code_limit'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    } else {
                        Alert.alert('', I18n.t('get_code_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    }
                }
            }
        },
        * validatePhone({ payload, onSuccess, onFailed }, { call, put, select }) {
            const data = yield call(api.validatePhone, payload.tel);
            // console.log(data);
            if (data) {
                if (data.result) {
                    onSuccess(data);
                    return;
                }
            }
            onFailed();
        },
        * getAccessToken_code({ payload }, { call, put }, select) {
            yield put({
                type: 'updateState',
                payload: {
                    visible: true,
                }
            });
            const data = yield call(api.getAccessToken_code, payload);
            if (data) {
                if (data.error == undefined) {
                    Global.cfg.access_token = data.access_token;
                    Global.cfg.refresh_token = data.refresh_token;
                    Global.cfg.expires_in = data.expires_in;
                    Global.cfg.create_token_time = moment().unix();

                    const userInfo = yield call(api.getUserInfo);
                    if (userInfo) {
                        if (userInfo.error) {
                            Global.cfg.access_token = '';
                            Global.cfg.refresh_token = '';
                            Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                        } else {
                            Global.cfg.userInfo = userInfo.result;
                            const settingInfo = yield call(api.getSettingInfo);
                            if (settingInfo) {
                                if (settingInfo.error) {
                                    Global.cfg.access_token = '';
                                    Global.cfg.refresh_token = '';
                                    Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                                } else {
                                    const _id = userInfo.result._id || '';
                                    JPushModule.setTags([_id], (success) => {
                                        console.log("Set tag succeed", success);
                                    }, (err) => {
                                        console.log("Set tag failed", err);
                                    });
                                    Global.cfg.settingInfo = settingInfo.result;
                                    Global.cfg.setRunningConfig();
                                    Global.global.navigation.dispatch(signin(data));
                                }
                            }
                        }
                    }
                } else {
                    const error = 'error.' + data.error_code;
                    if (ihtool.judgeText(error)) {
                        Alert.alert('', I18n.t(error), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    } else {
                        Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    }
                }
            }
            yield put({
                type: 'updateState',
                payload: {
                    visible: false,
                }
            });
        },
        * getAccessToken({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    visible: true,
                }
            });
            const data = yield call(api.getAccessToken, payload.username, payload.password);
            if (data) {
                if (data.error == undefined) {
                    Global.cfg.access_token = data.access_token;
                    Global.cfg.refresh_token = data.refresh_token;
                    Global.cfg.expires_in = data.expires_in;
                    Global.cfg.create_token_time = moment().unix();

                    const userInfo = yield call(api.getUserInfo);
                    if (userInfo) {
                        if (userInfo.error) {
                            Global.cfg.access_token = '';
                            Global.cfg.refresh_token = '';
                            Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                        } else {
                            Global.cfg.userInfo = userInfo.result;
                            const settingInfo = yield call(api.getSettingInfo);
                            if (settingInfo) {
                                if (settingInfo.error) {
                                    Global.cfg.access_token = '';
                                    Global.cfg.refresh_token = '';
                                    Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                                } else {
                                    const _id = userInfo.result._id || '';
                                    JPushModule.setTags([_id], (success) => {
                                        console.log("Set tag succeed", success);
                                    }, (err) => {
                                        console.log("Set tag failed", err);
                                    });
                                    Global.cfg.settingInfo = settingInfo.result;
                                    Global.cfg.setRunningConfig();
                                    Global.global.navigation.dispatch(signin(data));
                                }
                            }
                        }
                    }
                } else {
                    const error = 'error.' + data.error_code;
                    if (ihtool.judgeText(error)) {
                        Alert.alert('', I18n.t(error), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    } else {
                        Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    }
                }
            }
            yield put({
                type: 'updateState',
                payload: {
                    visible: false,
                }
            });
        }
    }
}