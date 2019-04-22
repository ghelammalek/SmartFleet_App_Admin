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
        * getGatewayInfo({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.getGatewayInfo, payload);
            if (data) {
                if (data.error) {

                } else {
                    onSuccess(data.result);
                    return;
                }
            }
            onFaild(data);
        },
        * register({ payload, onSuccess, onFaild }, { call, put, select }) {
            const data = yield call(api.register, payload);
            if (data) {
                if (data.error) {
                    if (data.result) {
                        Alert.alert('', I18n.t('register_car_exist'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    } else {
                        Alert.alert('', I18n.t('register_failed'), [{ text: I18n.t('okText'), onPress: () => { } },]);
                    }
                } else {
                    Alert.alert('', I18n.t('register_successful'), [{
                        text: I18n.t('okText'), onPress: () => {
                            that.props.navigation.state.params.callback();
                            that.props.navigation.goBack();
                        }
                    },]);
                }
            }
        },
    },
}