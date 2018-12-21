import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import VersionNumber from 'react-native-version-number';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import api from '../../constants/api';

export default {
    namespace: 'setting',
    state: {
        isLoading: false,
        version: ihtool.getCurrentVersion(),
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * loginOut({ payload }, { call, put, select }) {
            const data = yield call(api.loginOut);
            // console.log(data);

        },
        * getVersion({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: true,
                }
            })
            const data = yield call(api.getVersion);
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: false,
                }
            })
            if (data) {
                if (data.error) {
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            version: data.version,
                        }
                    })
                }
            }
        }
    },
}