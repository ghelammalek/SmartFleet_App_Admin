import { NavigationActions, StackActions } from 'react-navigation';
import { Alert, Linking } from 'react-native';
import moment from 'moment';
import VersionNumber from 'react-native-version-number';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import config from '../utils/config';
import api from '../../constants/api';
import ihtool from '../../utils/ihtool';

export default {
    namespace: 'home',
    state: {
        data: {},
        isLoading: false,
        events: null,
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getVersion({ payload }, { call, put, select }) {
            const data = yield call(api.getVersion);
            if (data.error) {
            } else {
                if (ihtool.getVersion(VersionNumber.appVersion, data.version)) {
                    Alert.alert(I18n.t('new_version_title'), I18n.t('new_version_message'), [
                        { text: I18n.t('cancel'), onPress: () => { } },
                        {
                            text: I18n.t('home_upgrade'), onPress: () => {
                                Linking.openURL(config.ios_download_url).catch((err) => { });
                            }
                        }]);
                }
            }
        },
        * getStatistics({ payload }, { call, put, select }) {
            const data = yield call(api.getStatistics, payload.queryType);
            if (data.error) {
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        data: data.result,
                    }
                });
            }
        },
        * getAlerts({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: true,
                }
            });
            const data = yield call(api.getAlerts, payload);
            if (data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        isLoading: false,
                    }
                });
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        events: data.result,
                        isLoading: false,
                    }
                });
            }
        },
    },
}