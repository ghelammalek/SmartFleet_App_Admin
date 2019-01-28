import { NavigationActions, StackActions } from 'react-navigation';
import { Alert, Linking } from 'react-native';
import moment from 'moment';
import VersionNumber from 'react-native-version-number';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import config from '../../utils/config';
import api from '../../constants/api';
import ihtool from '../../utils/ihtool';

export default {
    namespace: 'home',
    state: {},
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getVersion({ payload }, { call, put, select }) {
            const data = yield call(api.getVersion);
            if (data && data.error === undefined) {
                if (ihtool.getVersion(ihtool.getCurrentVersion(), data.version)) {
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
        * getStatistics({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getStatisticsTime, payload);
            if (data && data.error === undefined) {
                onSuccess(data.result);
            } else {
                onFaild({});
            }
        },
        * getAlerts({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getAlerts, payload);
            if (data && data.error === undefined) {
                onSuccess(data.result);
            } else {
                onFaild([]);
            }
        },
        * getTops({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getTops, payload);
            if (data && data.error === undefined) {
                onSuccess(data.result);
            } else {
                onFaild([]);
            }
        }
    },
}