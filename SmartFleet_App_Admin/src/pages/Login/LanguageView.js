import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import NavBarBtn from '../../widget/NavBarBtn';
import { connect } from '../../routes/dva';
import Global from '../../utils/Global';
import I18n from '../../language/index';
import Images from '../../constants/Images';
import styles from '../../styles/Login/changeViewStyles';

class LanguageView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('select_language'),
        headerBackTitle: null,
        headerRight: <NavBarBtn
            title={I18n.t('done')}
            onPress={() => { navigation.state.params.navAction() }}
        />,
    });
    constructor(props) {
        super(props);
        this.state = {
            language: I18n.locale,
        }
        console.log(this.state.language);
    }
    componentDidMount() {
        this.props.navigation.setParams({ navAction: this.navAction.bind(this) });
    }
    navAction() {
        I18n.locale = this.state.language;
        Global.cfg.language = this.state.language;
        Global.cfg.setRunningConfig();
        this.props.dispatch({
            type: 'login/updateState',
            payload: {
                language: I18n.locale,
            }
        });
        // this.props.navigation.state.params.callback(I18n.t('select_language'));
        this.props.navigation.goBack();
    }
    changeLaguage(item) {
        this.setState({
            language: item.id,
        });
        console.log(item.id);
    }
    getItems(data) {
        return data.map((item, i) =>
            <TouchableOpacity key={i} onPress={() => this.changeLaguage(item)}>
                <View style={styles.itemView_} >
                    <Image style={styles.imageLeft} source={item.id == this.state.language ? Images.Multiple_Choice_h : Images.Multiple_Choice} />
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        const serverName = Global.cfg.serverName;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} >
                <ScrollView bounces={false}>
                    {
                        this.getItems(Global.languages)
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
export default connect(mapStateToProps)(LanguageView);

