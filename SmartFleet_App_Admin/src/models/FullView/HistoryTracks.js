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
        timeData: [],
        distanceData: [],
        working_duration: [],
        distance: null,
        count: null,
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
                    markers: [],
                    events: [],
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
                let markers = [];
                for (let i = 0; i < data.result.length; i++) {
                    const element = data.result[i];
                    if (element.fields && element.fields.start_location) {
                        const location = element.fields.start_location;
                        markers.push({ latitude: location.latitude, longitude: location.longitude, extra: { imageName: ihtool.getTrackTypeImageName(element) } });
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        markers: markers,
                        events: data.result,
                        isLoading: false,
                    }
                });
            }
        },
        *getSiteTracks({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    loadData: true,
                    loadtracks: true,
                    tracks: [],
                    distance: null,
                    count: null,
                }
            });
            const data = yield call(api.getSiteTracks, payload);
            // console.log(data);
            if (data.error || data.result == undefined) {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: false,
                        loadtrend: false,
                    }
                });
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: false,
                        loadtrend: false,
                        tracks: data.result.tracks,
                        distance: data.result.distance,
                        count: data.result.count,
                    }
                });
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
                        timeData: [],
                        distanceData: [],
                        working_duration: [],
                    }
                });
            }
            const data = yield call(api.getSiteTrend, payload);
            if (data.error || data.result == undefined) {
                yield put({
                    type: 'updateState',
                    payload: {
                        loadData: false,
                        loadtrend: false,
                    }
                });
            } else {
                if (payload.fields == 'speed') {
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
        }
    },
}