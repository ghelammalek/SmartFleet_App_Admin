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
import moment, { unix } from 'moment';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import setting from '../../utils/setting';
import NavigationBar from '../../widget/NavigationBar';
import styles from '../../styles/setting/settingStyle.js';
const signin = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login' })
    ]
});

class Setting extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: I18n.t('tab_owner'),
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(createAction('setting/getVersion')({}));
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={I18n.t('tab_owner')} />
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
                    <View style={styles.scrollView}>
                        <View style={styles.bodyView}>
                            <View style={styles.titleView} >
                                <Text style={styles.title1} >{I18n.t('setting')}</Text>
                            </View>
                            <TouchableOpacity opacity={0.8} onPress={() => this.changeCompanys()}>
                                <View style={styles.itemView} >
                                    <View style={styles.itemLeftView}>
                                        <Image style={styles.itemLeftImage} source={Images.setting_owner} />
                                        <Text style={styles.title2} >{I18n.t('userInfo')}</Text>
                                    </View>
                                    <Text style={styles.title3} >{}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity opacity={0.8} onPress={() => this.notification()}>
                                <View style={styles.itemView} >
                                    <View style={styles.itemLeftView}>
                                        <Image style={styles.itemLeftImage} source={Images.setting_notification} />
                                        <Text style={styles.title2} >{I18n.t('notification')}</Text>
                                    </View>
                                    <Text style={styles.title3} >{}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bodyView}>
                            <View style={styles.titleView} >
                                <Text style={styles.title1} >{I18n.t('about')}</Text>
                            </View>
                            <TouchableOpacity opacity={0.8} onPress={() => this.about()}>
                                <View style={styles.itemView} >
                                    <View style={styles.itemLeftView}>
                                        <Image style={styles.itemLeftImage} source={Images.setting_about_us} />
                                        <Text style={styles.title2} >{I18n.t('about_us')}</Text>
                                    </View>
                                    <Text style={styles.title3} >{}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity opacity={0.8} onPress={() => this.update()}>
                                <View style={styles.itemView} >
                                    <View style={styles.itemLeftView}>
                                        <Image style={styles.itemLeftImage} source={Images.setting_version} />
                                        <Text style={styles.title2} >{I18n.t('version_info')}</Text>
                                    </View>
                                    {
                                        ihtool.getVersion(ihtool.getCurrentVersion(), this.props.version) ?
                                            <View style={styles.versionView}>
                                                <Text style={styles.versionText}>{'new'}</Text>
                                            </View> :
                                            <Text style={styles.title3} >{ihtool.getCurrentVersion()}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity opacity={0.8} onPress={() => this.help()}>
                                <View style={styles.itemView} >
                                    <View style={styles.itemLeftView}>
                                        <Image style={styles.itemLeftImage} source={Images.setting_help} />
                                        <Text style={styles.title2} >{I18n.t('help_and_feek')}</Text>
                                    </View>
                                    <Text style={styles.title3} >{}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btnView} opacity={0.8} onPress={() => { this.loginOut() }}>
                            <Text style={styles.btnTitle} >{I18n.t('loginOut')}</Text>
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
        // this.props.dispatch(createAction('setting/loginOut')({}));
        Global.cfg.access_token = '';
        Global.cfg.refresh_token = '';
        Global.cfg.setRunningConfig();
        Global.global.navigation.dispatch(signin);
    }
    /**
     * 切换用户单位
     */
    changeCompanys() {
        // 
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
        this.props.navigation.navigate('UpgradeVersionView');
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
        version: state.setting.version,
    }
}
export default connect(mapStateToProps)(Setting);