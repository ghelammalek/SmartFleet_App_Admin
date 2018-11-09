import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import Global from '../../utils/Global';
import I18n from '../../language/index';
import api from '../../constants/api';
import moment from 'moment';



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
            if (data.error) {
                if (data.error_code == 10024) {
                    Alert.alert('', I18n.t('get_code_limit'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                } else {
                    Alert.alert('', I18n.t('get_code_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                }
            }
        },
        * getAccessToken({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    visible: true,
                }
            });
            const data = yield call(api.getAccessToken, payload.username, payload.password);
            if (data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        visible: false,
                    }
                });
                if (data.error_code === 20013) {
                    Alert.alert('', I18n.t('20013'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                } else if (data.error_code === 100001) {
                    Alert.alert('', I18n.t('100001'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                } else {
                    Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                }
            } else {
                Global.cfg.access_token = data.access_token;
                Global.cfg.refresh_token = data.refresh_token;
                Global.cfg.expires_in = data.expires_in;
                Global.cfg.create_token_time = moment().unix();

                const userInfo = yield call(api.getUserInfo);
                if (userInfo.error) {
                    Global.cfg.access_token = '';
                    Global.cfg.refresh_token = '';
                    yield put({
                        type: 'updateState',
                        payload: {
                            visible: false,
                        }
                    });
                    Alert.alert('', I18n.t('signIn_err'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                } else {
                    Global.cfg.userInfo = userInfo.result;
                    Global.cfg.setRunningConfig();
                    Global.global.navigation.dispatch(signin(data));
                    yield put({
                        type: 'updateState',
                        payload: {
                            visible: false,
                        }
                    });

                }
            }
        }
    }
}