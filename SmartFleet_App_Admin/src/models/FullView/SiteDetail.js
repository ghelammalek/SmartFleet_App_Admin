import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';

export default {
    namespace: 'siteDetail',
    state: {
        statistics: {},
        event: [],
        isLoading: false,
        marker: {

        },
        center: {
            longitude: 113.981718,
            latitude: 22.542449
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getStatistics({ payload }, { call, put, select }) {
            const data = yield call(api.getStatistics, payload.queryType, payload.plateNo);
            if (data.error) {
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        statistics: data.result,
                    }
                });
            }
        },
        * getAlerts({ payload }, { call, put, select }) {
            const data = yield call(api.getAlerts, payload);
            if (data.error) {
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        event: data.result,
                        isLoading: false,
                    }
                });
            }
        }
    },
}