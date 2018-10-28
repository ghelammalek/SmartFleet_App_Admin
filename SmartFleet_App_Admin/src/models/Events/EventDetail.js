import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';


export default {
    namespace: 'eventDetail',
    state: {
        data: {},
        isLoading: false,
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * postAlert({ payload }, { call, put, select }) {
            const data = yield call(api.postAlert, payload._id);
            if (data.error) {
                Alert.alert('', I18n.t('loading_error'), [{ text: I18n.t('okText'), onPress: () => { } },]);
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
                        data: data.result,
                        isLoading: false,
                    }
                });
            }
        },
    },
}