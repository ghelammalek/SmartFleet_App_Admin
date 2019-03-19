import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import api from '../../constants/api';

export default {
    namespace: 'historyTracks',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getStatistics({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getStatisticsTime, payload);
            if (data) {
                if (data.error) {
                } else {
                    onSuccess(ihtool.getStatistics(data.result));
                    return;
                }
            }
            onFaild();
        },
        * getAlerts({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getAlerts, payload);
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
                                title: ihtool.getEventDesc(element),
                                extra: { imageName: ihtool.getEventDetailImageName(element) }
                            });
                        }
                        if (element.labels && element.labels.code && element.labels.code === 'driving') {
                            if (element.level > 1) {
                                count = count + 1;
                            }
                        }
                    }
                    onSuccess({
                        markers: markers,
                        events: data.result,
                        count: count,
                    });
                    return;
                }
            }
            onFaild();
        },
        *getSiteTracks({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getSiteTracks, payload);
            if (data) {
                if (data.error || data.result == undefined) {
                } else {
                    onSuccess(data.result.tracks);
                    return;
                }
            }
            onFaild();
        },
        *getSiteTrend({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getSiteTrend, payload);
            if (data) {
                if (data.error || data.result == undefined) {
                } else {
                    if (payload.fields == 'speed') {
                        onSuccess(data.result.values);
                        return;
                    } else {
                        let distanceData = [];
                        let working_duration = [];
                        if (data.result && data.result.values) {
                            for (let i = 0; i < data.result.values.length; i++) {
                                const element = data.result.values[i];
                                working_duration.push([element[0], element[1]]);
                                distanceData.push([element[0], element[2]]);
                            }
                        }
                        onSuccess({
                            distanceData: distanceData,
                            working_duration: working_duration,
                        });
                        return;
                    }
                }
            }
            onFaild();
        }
    },
}