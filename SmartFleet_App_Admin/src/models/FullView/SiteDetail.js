import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';

export default {
    namespace: 'siteDetail',
    state: {
        isLoading: false,
        loadData: false,
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
        marker: null,
        center: null,
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getStatistics({ payload }, { call, put, select }) {
            const data = yield call(api.getStatistics, payload.queryType, payload.plateNo);
            if (data) {
                if (data.error) {
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            statistics: data.result,
                        }
                    });
                }
            }
        },
        * getAlerts({ payload }, { call, put, select }) {
            const data = yield call(api.getAlerts, payload);
            if (data) {
                if (data.error) {
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            event: data.result,
                        }
                    });
                }
            }
        },
        *getSiteDetail({ payload }, { call, put, select }) {
            const data = yield call(api.getSiteDetail, payload);
            if (data) {
                if (data.error) {
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            siteDetail: data.result,
                        }
                    });
                }
            }
        },
        *getSiteData({ payload, onSuccess, onFailed }, { call, put, select }) {
            const data = yield call(api.getSiteData, payload);
            if (data) {
                if (data.error || data.result == undefined) {
                    // alert('sdf');
                    onFailed();
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
                    let marker = {
                        latitude: data.result.metrics.location_data.latitude,
                        longitude: data.result.metrics.location_data.longitude,
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            siteData: siteData,
                            marker: marker,
                            center: marker
                        }
                    });
                    onSuccess(marker);
                }
            } else {
                onFailed();
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
            if (data) {
                if (data.error || data.result == undefined) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            loadData: false,
                            isLoading: false
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
                            loadData: false,
                            isLoading: false
                        }
                    });
                }
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: false,
                        isLoading: false
                    }
                });
            }
        }
    },
}