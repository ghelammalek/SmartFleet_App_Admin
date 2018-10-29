import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';

export default {
    namespace: 'setting',
    state: {
        isLoading: false,
        version: '',
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * loginOut({ payload }, { call, put, select }) {
            const data = yield call(api.loginOut);
            console.log(data);

        },
        * getVersion({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: true,
                }
            })
            const data = yield call(api.getVersion);
            if (data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        isLoading: false,
                    }
                })
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        version: data.version,
                        isLoading: false,
                    }
                })
            }
        }
    },
}