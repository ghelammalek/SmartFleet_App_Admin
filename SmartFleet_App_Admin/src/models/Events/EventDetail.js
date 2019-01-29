import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';


export default {
    namespace: 'eventDetail',
    state: {},
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * postAlert({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.postAlert, payload._id);
            if (data && data.error === undefined) {
                onSuccess(data.result);
            } else {
                onFaild();
            }
        },
    },
}