import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Linking,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import VersionNumber from 'react-native-version-number';
import { NavigationActions, StackActions } from 'react-navigation';
import LoadingView from "../../widget/LoadingView";
import { connect } from '../../routes/dva';
import moment, { unix } from 'moment';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import config from '../../utils/config';
import ihtool from '../../utils/ihtool';
import setting from '../../utils/setting';
import NavigationBar from '../../widget/NavigationBar';
import styles from '../../styles/setting/settingStyle.js';


class UpgradeVersionView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('version_info'),
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
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
                    <View style={styles.scrollView}>
                        <View style={styles.logo} >
                            <Image style={styles.logoImage} source={Images.other_logo} />
                            <Text style={styles.logoTitle} >{I18n.t('logo_title')}</Text>
                        </View>
                        <View style={styles.bodyView}>
                            <View style={styles.itemView} >
                                <Text style={styles.title2} >{I18n.t('current_version')}</Text>
                                <Text style={styles.title3} >{ihtool.getCurrentVersion()}</Text>
                            </View>
                            <View style={styles.space} />
                            <View style={styles.itemView} >
                                <Text style={styles.title2} >{I18n.t('new_version')}</Text>
                                <Text style={styles.title3} >{this.props.version}</Text>
                            </View>
                        </View>
                        {
                            ihtool.getVersion(ihtool.getCurrentVersion(), this.props.version) ?
                                <TouchableOpacity style={styles.btnView_} opacity={0.8} onPress={() => this.upgrade()}>
                                    <Text style={styles.btnTitle} >{I18n.t('upgrade_version')}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity disabled={this.props.isLoading} style={styles.btnView_} opacity={0.8} onPress={() => this.check()}>
                                    {
                                        this.props.isLoading ?
                                            <Text style={styles.btnTitle} >{I18n.t('check_versioning')}</Text> :
                                            <Text style={styles.btnTitle} >{I18n.t('check_version')}</Text>
                                    }
                                </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
    /**
     * 更新检查
     */
    check() {
        this.props.dispatch(createAction('setting/getVersion')({}));
    }
    /**
     * 升级
     */
    upgrade() {
        var url = config.ios_download_url;
        Linking.openURL(url).catch((err) => {
        });
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.setting.isLoading,
        version: state.setting.version,
    }
}
export default connect(mapStateToProps)(UpgradeVersionView);