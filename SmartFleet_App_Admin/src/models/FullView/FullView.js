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
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getSites({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    plateNo: '',
                }
            });
            var markers = [];
            const data = yield call(api.getSites);
            yield put({
                type: 'updateState',
                payload: {
                    isLoading: false,
                }
            });
            if (data) {
                if (data.error) {
                    Alert.alert('', I18n.t('loading_error'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                } else {
                    for (let i = 0; i < data.result.length; i++) {
                        const site = data.result[i];
                        if (site.location) {
                            const marker = {
                                longitude: site.location.x,
                                latitude: site.location.y,
                                title: site.plateNo,
                                extenInfo: {
                                    name: '',
                                }
                            }
                            markers.push(marker);
                        }
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            data: data.result,
                            rootData: data.result,
                            markers: markers,
                        }
                    });
                }
            }
        },
    }
}