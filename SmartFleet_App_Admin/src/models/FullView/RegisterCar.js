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
                    Alert.alert('', '该车辆已经被注册了', [{
                        text: I18n.t('okText'), onPress: () => {
                            that.props.navigation.goBack();
                        }
                    },]);
                } else {
                    Alert.alert('', '注册失败', [{ text: I18n.t('okText'), onPress: () => { } },]);
                }
            } else {
                Alert.alert('', '注册成功', [{
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