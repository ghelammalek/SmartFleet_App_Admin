import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import Global from '../../utils/Global';
import I18n from '../../language/index';
import api from '../../constants/api';
import moment from 'moment';


export default {
    namespace: 'forgotPasswordView',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *getImageCode({ payload, onSuccess, onFailed }, { call, put, select }) {
            const data = yield call(api.getImageCode);
            if (data) {
                if (data.error) {
                    onFailed(data);
                } else {
                    onSuccess(data);
                }
            } else {
                onFailed(data);
            }
        },
        *getImage({ payload, onSuccess, onFailed }, { call, put, select }) {
            const data = yield call(api.getImage);
            if (data) {
                if (data.error) {
                    onFailed(data);
                } else {
                    onSuccess(data);
                }
            } else {
                onFailed(data);
            }
        },
        *postForgotPassword({ payload, onSuccess, onFailed }, { call, put, select }) {
            const data = yield call(api.forgotten_password, payload);
            if (data) {
                if (data.error) {
                    onFailed(data);
                } else {
                    onSuccess(data);
                }
            } else {
                onFailed(data);
            }
        }
    },
}