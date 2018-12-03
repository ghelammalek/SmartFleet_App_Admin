import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import api from '../../constants/api';

export default {
    namespace: 'historyData',
    state: {
        start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        isLoading: false,
        loadData: false,
        loadtrend: false,
        statistics: {},
        events: [],
        selectTime: 1,
        speedData: [],
        timeData: [],
        distanceData: [],
        working_duration: [],
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getStatistics({ payload }, { call, put, select }) {
            const data = yield call(api.getStatisticsTime, payload);
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
        *getSiteTrend({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    loadData: true,
                    loadtrend: true,
                    timeData: [],
                    distanceData: [],
                    working_duration: [],
                }
            });
            const data = yield call(api.getSiteTrend, payload);
            console.log(data);
            if (data.error || data.result == undefined) {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: false,
                        loadtrend: false,
                    }
                });
            } else {
                let timeData = [];
                let distanceData = [];
                let working_duration = [];
                if (data.result && data.result.values) {
                    for (let i = 0; i < data.result.values.length; i++) {
                        const element = data.result.values[i];
                        timeData.push(moment(element[0]).format('H:00'));
                        working_duration.push(element[1]);
                        distanceData.push(element[2]);
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        timeData: timeData,
                        distanceData: distanceData,
                        working_duration: working_duration,
                        loadData: false,
                        loadtrend: false,
                    }
                });
            }
        }
    },
}