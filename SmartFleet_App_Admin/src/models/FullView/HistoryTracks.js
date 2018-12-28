import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import api from '../../constants/api';

export default {
    namespace: 'historyTracks',
    state: {
        start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        isLoading: false,
        loadData: false,
        loadtrend: false,
        loadtracks: false,
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
        distanceData: [],
        working_duration: [],
        distance: null,
        count: null,
        durations: null,
        tracks: [],
        markers: [],
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
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: true,
                    markers: [],
                    events: [],
                }
            });
            const data = yield call(api.getAlerts, payload);
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: false,
                }
            });
            if (data) {
                if (data.error) {
                } else {
                    let markers = [];
                    let count = 0;
                    for (let i = 0; i < data.result.length; i++) {
                        const element = data.result[i];
                        if (element.fields && element.fields.start_location) {
                            const location = element.fields.start_location;
                            markers.push({
                                latitude: location.latitude,
                                longitude: location.longitude,
                                extra: { imageName: ihtool.getTrackTypeImageName(element) }
                            });
                        }
                        if (element.labels && element.labels.code && element.labels.code === 'driving') {
                            count = count + 1;
                        }
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            markers: markers,
                            events: data.result,
                            count: count,
                        }
                    });
                }
            }
        },
        *getSiteTracks({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    loadData: true,
                    loadtracks: true,
                    tracks: [],
                }
            });
            const data = yield call(api.getSiteTracks, payload);
            yield put({
                type: 'updateState',
                payload: {
                    loadData: false,
                    loadtrend: false,
                }
            });
            if (data) {
                if (data.error || data.result == undefined) {
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            tracks: data.result.tracks,
                        }
                    });
                }
            }
        },
        *getSiteTrend({ payload }, { call, put, select }) {
            if (payload.fields == 'speed') {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: true,
                        loadtrend: true,
                        speedData: [],
                    }
                });
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: true,
                        loadtrend: true,
                        distanceData: [],
                        working_duration: [],
                    }
                });
            }
            const data = yield call(api.getSiteTrend, payload);
            yield put({
                type: 'updateState',
                payload: {
                    loadData: false,
                    loadtrend: false,
                }
            });
            if (data) {
                if (data.error || data.result == undefined) {
                } else {
                    if (payload.fields == 'speed') {
                        yield put({
                            type: 'updateState',
                            payload: {
                                speedData: data.result.values,
                            }
                        });
                    } else {
                        let distanceData = [];
                        let working_duration = [];
                        let durations = 0;
                        let distance = 0;
                        if (data.result && data.result.values) {
                            for (let i = 0; i < data.result.values.length; i++) {
                                const element = data.result.values[i];
                                working_duration.push([element[0], element[1]]);
                                distanceData.push([element[0], element[2]]);
                                if (element[1]) {
                                    durations = durations + element[1];
                                }
                                if (element[2]) {
                                    distance = distance + element[2];
                                }
                            }
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                distanceData: distanceData,
                                working_duration: working_duration,
                                durations: durations,
                                distance: distance,
                            }
                        });
                    }
                }
            }
        }
    },
}