import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import VersionNumber from 'react-native-version-number';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import NavigationBar from '../../widget/NavigationBar';
import styles from '../../styles/setting/settingStyle.js';


class Setting extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '我',
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // console.log(VersionNumber.appVersion);
        // console.log(VersionNumber.buildVersion);
        // console.log(VersionNumber.bundleIdentifier);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title='我' />
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
                    <View style={styles.scrollView}>
                        <View style={styles.view_20} />
                        <View style={styles.titleView} >
                            <Text style={styles.title1} >常规设置</Text>
                        </View>
                        <TouchableOpacity opacity={0.8} onPress={() => { this.changeCompanys() }}>
                            <View style={styles.bodyView} >
                                <Text style={styles.title2} >个人信息</Text>
                                <Text style={styles.title3} >{}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity opacity={0.8} onPress={() => { this.notification() }}>
                            <View style={styles.bodyView} >
                                <Text style={styles.title2} >消息通知</Text>
                                <Text style={styles.title3} >{}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.view_30} />
                        <View style={styles.titleView} >
                            <Text style={styles.title1} >关于</Text>
                        </View>
                        <TouchableOpacity opacity={0.8} onPress={() => { this.about() }}>
                            <View style={styles.bodyView} >
                                <Text style={styles.title2} >关于我们</Text>
                                <Text style={styles.title3} >{}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity opacity={0.8} onPress={() => { this.update() }}>
                            <View style={styles.bodyView} >
                                <Text style={styles.title2} >版本更新</Text>
                                <Text style={styles.title3} >{VersionNumber.appVersion}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity opacity={0.8} onPress={() => { this.help() }}>
                            <View style={styles.bodyView} >
                                <Text style={styles.title2} >帮助与反馈</Text>
                                <Text style={styles.title3} >{}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnView} opacity={0.8} onPress={() => { this.loginOut() }}>
                            <Text style={styles.btnTitle} >退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    /**
     * 跳转到登录界面
     */
    loginOut() {
        this.props.dispatch(createAction('setting/loginOut')({}));

        Global.cfg.access_token = '';
        Global.cfg.refresh_token = '';
        Global.cfg.setRunningConfig();
        this.props.navigation.navigate('Login');
    }
    /**
     * 切换用户单位
     */
    changeCompanys() {
        // this.props.navigation.navigate('SelectCompany');
    }
    /**
     * 消息提醒
     */
    notification() {
        // this.props.navigation.navigate('JPushView');
    }

    /**
     * 设置
     */
    _setting() {

    }
    /**
     * 关于
     */
    about() {

    }
    /**
     * 更新检查
     */
    update() {

    }
    /**
     * 帮助和反馈
     */
    help() {

    }

}
function mapStateToProps(state) {
    return {
        isLoading: state.setting.isLoading,
        data: state.setting.data,
    }
}
export default connect(mapStateToProps)(Setting);