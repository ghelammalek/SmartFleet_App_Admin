import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';


export default {
    namespace: 'fullView',
    state: {
        data: null,
        rootData: null,
        isLoading: false,
        markers: [],
        plateNo: '',
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
        * getSites({ payload }, { call, put, select }) {
            var markers = [];
            const data = yield call(api.getSites);
            if (data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        isLoading: false,
                    }
                });
                Alert.alert('', I18n.t('loading_error'), [{ text: I18n.t('okText'), onPress: () => { } },]);
            } else {
                var maxLng = 116.4136103013;
                var minLng = 116.4136103013;
                var maxLat = 39.9110666857;
                var minLat = 39.9110666857;

                for (let i = 0; i < data.result.length; i++) {
                    const site = data.result[i];
                    const marker = {
                        longitude: site.location.x,
                        latitude: site.location.y,
                        title: site.plateNo,
                        extenInfo: {
                            name: '',
                        }
                    }
                    if (marker.longitude > maxLng) maxLng = marker.longitude;
                    if (marker.longitude < minLng) minLng = marker.longitude;
                    if (marker.latitude > maxLat) maxLat = marker.latitude;
                    if (marker.latitude < minLat) minLat = marker.latitude;

                    markers.push(marker);
                }
                var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
                var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
                var centerPoint = {
                    latitude: cenLat,
                    longitude: cenLng
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        data: data.result,
                        rootData: data.result,
                        markers: markers,
                        isLoading: false,
                        center: centerPoint,
                    }
                });
            }
        },
    }
}