import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { connect } from '../../routes/dva';
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from "../../widget/LoadingView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';
import styles from '../../styles/Event/eventDetailStyle';
import homeStyle from '../../styles/Home/homeStyle';

class EventDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.item.moduleName,
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.state.params.item,
        };
    }
    componentDidMount() {
        this.props.dispatch(createAction('eventDetail/updateState')(this.state.data));
    }
    _renderItem = (item) => {
        return (
            <View style={homeStyle.itemView}>
                <View style={homeStyle.itemTopView}>
                    <View style={homeStyle.itemTopLeft}>
                        <Text style={homeStyle.itemTitle} >{item.moduleName}</Text>
                    </View>
                    <View style={homeStyle.itemTopRight}>
                        <Text style={homeStyle.time} >{ihtool.getSimpleDate(item.startsAt)}</Text>
                        <Image style={homeStyle.imgagRight} source={Images.other_right} />
                    </View>
                </View>
                <View style={homeStyle.itemBodyView}>
                    <View style={homeStyle.itemTextView}>
                        <Text style={homeStyle.itemText} >{I18n.t('event_type') + '：'}</Text>
                        <Text style={homeStyle.itemText} >{item.type}</Text>
                    </View>
                    <View style={homeStyle.itemTextView}>
                        <Text style={homeStyle.itemText} >{I18n.t('event_level') + '：'}</Text>
                        <Text style={homeStyle.itemText} >{item.level}</Text>
                    </View>
                    <View style={homeStyle.itemTextView}>
                        <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                        <Text style={homeStyle.itemText} >{item.endsAt}</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this._renderItem(this.props.data)
                }
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.eventDetail.isLoading,
        data: state.eventDetail.data,
    }
}
export default connect(mapStateToProps)(EventDetail);