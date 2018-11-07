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
        siteData: {
            metrics: {
                iot_data: {},
                location_data: {}
            }
        },
        siteDetail: {},
        speedData: [],
        isLoading: false,
        marker: {

        },
        center: {
            longitude: 116.981718,
            latitude: 39.542449
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
        },
        *getSiteDetail({ payload }, { call, put, select }) {
            const data = yield call(api.getSiteDetail, payload);
            if (data.error) {
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        siteDetail: data.result,
                        isLoading: false,
                    }
                });
            }
        },
        *getSiteData({ payload }, { call, put, select }) {
            const data = yield call(api.getSiteData, payload);
            if (data.error || data.result == undefined) {
                // alert('sdf');
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        siteData: data.result,
                        isLoading: false,
                    }
                });
            }
        },
        *getSiteTrend({ payload }, { call, put, select }) {
            const data = yield call(api.getSiteTrend, payload);
            if (data.error || data.result == undefined) {
                // alert('sdf');
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        speedData: data.result,
                        isLoading: false,
                    }
                });
            }
        }
    },
}