import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import LoadingView from '../../widget/LoadingView';
import NavBarBtn from '../../widget/NavBarBtn';
import { connect } from '../../routes/dva';
import Global from '../../utils/Global';
import I18n from '../../language/index';
import Images from '../../constants/Images';
import styles from '../../styles/Login/changeViewStyles';

class ServerIPView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('select_serverIP'),
        headerBackTitle: null,
        headerRight: <NavBarBtn
            title={I18n.t('done')}
            titleStyle={{ fontSize: 14, color: 'blue' }}
            onPress={() => { navigation.state.params.navAction() }}
        />,
    });
    constructor(props) {
        super(props);
        this.state = {
            url: Global.cfg.serverIP,
            name: Global.cfg.serverName,
            data: [
                {
                    url: 'http://cd.inhandcloud.com:20080',
                    name: 'dev'
                },
                {
                    url: 'http://smartfleet.inhandiot.com',
                    name: 'test'
                }
            ]
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ navAction: this.navAction.bind(this) });
    }
    navAction() {
        Global.cfg.serverIP = this.state.url;
        Global.cfg.serverName = this.state.name;
        Global.cfg.setRunningConfig();
        this.props.navigation.goBack();
    }
    changeLaguage(item) {
        this.setState({
            url: item.url,
            name: item.name,
        });
    }
    getItems(data) {
        return data.map((item, i) =>
            <TouchableOpacity key={i} onPress={() => this.changeLaguage(item)}>
                <View style={styles.itemView} >
                    <View style={styles.rightView}>
                        <Image style={styles.imageLeft} source={item.url == this.state.url ? Images.Multiple_Choice_h : Images.Multiple_Choice} />
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                    <Text style={styles.subTitle}>{item.url}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} >
                <ScrollView bounces={false}>
                    {
                        this.getItems(this.state.data)
                    }
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        language: state.login.language,
    }
}
export default connect(mapStateToProps)(ServerIPView);

