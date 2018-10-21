import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';

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
        * getData({ payload }, { call, put, select }) {
            // var statistics = {};
            // var events = [];
            const data = yield call(api.getStatistics, '1');

            if (data.error == undefined) {
                // statistics = data.result;
                yield put({
                    type: 'updateState',
                    payload: {
                        data: data.result,
                    }
                });
            }
            const data1 = yield call(api.getAlerts, payload);

            if (data1.error == undefined) {
                // events = data1.result;

                var arr = [];
                const length = data1.result.length > 5 ? 5 : data1.result.length;
                for (let index = 0; index < length; index++) {
                    const element = data1.result[index];
                    arr.push(element);
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        events: arr,//data1.result,
                    }
                });
            }
            yield put({
                type: 'updateState',
                payload: {
                    // data: statistics,
                    // events: events,
                    isLoading: false,
                }
            });
        },
    },
}