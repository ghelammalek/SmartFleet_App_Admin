import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';


export default {
    namespace: 'events',
    state: {
        data: null,
        isLoading: false,
        isLoad: false,
        cursor: 0,
        level: 0,
        eventType: 0,
        start_time: '',
        end_time: '',
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * getAlerts({ payload }, { call, put, select }) {
            const data = yield call(api.getAlerts, payload);
            if (data.error) {
                Alert.alert('', I18n.t('loading_error'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                yield put({
                    type: 'updateState',
                    payload: {
                        isLoading: false,
                        isLoad: false,
                    }
                });
            } else {
                yield put({
                    type: 'updateState',
                    payload: {
                        cursor: data.cursor,
                        data: data.result,
                        isLoading: false,
                        isLoad: false,
                    }
                });
            }
        },
        * loadMore({ payload }, { call, put, select }) {
            var events = yield select(state => state.events.data);
            const data = yield call(api.getAlerts, payload);
            if (data.error) {
                Alert.alert('', I18n.t('loading_error'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                yield put({
                    type: 'updateState',
                    payload: {
                        isLoading: false,
                        isLoad: false,
                    }
                });
            } else {
                events = events.concat(data.result);
                if (data.result.length > 0) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            cursor: data.cursor,
                            data: events,
                            isLoading: false,
                            isLoad: false,
                        }
                    });
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            cursor: data.cursor - 20,
                            data: events,
                            isLoading: false,
                            isLoad: false,
                        }
                    });
                }
            }
        },
    },
}