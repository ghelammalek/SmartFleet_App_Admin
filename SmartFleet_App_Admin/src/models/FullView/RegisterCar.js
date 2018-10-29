import { NavigationActions, StackActions } from 'react-navigation';
import { Alert } from 'react-native';
import moment from 'moment';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import api from '../../constants/api';

export default {
    namespace: 'registerCar',
    state: {
        isLoading: false,
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * register({ payload, that }, { call, put, select }) {
            yield put({
                type: 'updateState',
                isLoading: true,
            })
            const data = yield call(api.register, payload);
            if (data.error) {
                if (data.result) {
                    Alert.alert('', I18n.t('register_car_exist'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                } else {
                    Alert.alert('', I18n.t('register_failed'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                }
            } else {
                Alert.alert('', I18n.t('register_successful'), [{
                    text: I18n.t('okText'), onPress: () => {
                        that.props.navigation.goBack();
                    }
                },]);
            }
            yield put({
                type: 'updateState',
                isLoading: false,
            })
        },
    },
}