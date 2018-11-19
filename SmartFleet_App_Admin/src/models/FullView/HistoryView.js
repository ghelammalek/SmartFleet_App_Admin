import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import api from '../../constants/api';

export default {
    namespace: 'historyView',
    state: {
        start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        isLoading: false,
        loadData: false,
        statistics: {},
        events: [],
        siteData: {
            metrics: {
                iot_data: {},
                location_data: {}
            }
        },
        selectTime: 1,
        siteDetail: {},
        speedData: [],
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
        *getSiteData({ payload }, { call, put, select }) {
            const data = yield call(api.getSiteData, payload);
            if (data.error || data.result == undefined) {
                // alert('sdf');
            } else {
                let siteData = {
                    metrics: {
                        iot_data: {},
                        location_data: {}
                    }
                }
                if (data.result) {
                    if (data.result.metrics) {
                        if (data.result.metrics.iot_data) {
                            siteData.metrics.iot_data = data.result.metrics.iot_data;
                        }
                        if (data.result.metrics.location_data) {
                            siteData.metrics.location_data = data.result.metrics.location_data;
                        }
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        siteData: siteData,
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
                    speedData: [],
                }
            });
            const data = yield call(api.getSiteTrend, payload);
            if (data.error || data.result == undefined) {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: false
                    }
                });
            } else {
                let values = [];
                if (data.result.values) {
                    for (let i = 0; i < data.result.values.length; i++) {
                        let value = [];
                        const element = data.result.values[i];
                        value.push(moment(element[0]).valueOf());
                        value.push(element[1]);
                        values.push(value);
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        speedData: values,
                        loadData: false
                    }
                });
            }
        }
    },
}