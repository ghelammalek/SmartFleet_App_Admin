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
import moment from 'moment';

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
        this.props.dispatch(createAction('eventDetail/updateState')({ data: this.state.data }));
    }
    componentWillUnmount() {
        this.props.dispatch(createAction('eventDetail/updateState')({ data: null }));
    }
    postAlert() {
        this.props.dispatch(createAction('eventDetail/updateState')({ isLoading: true }));
        // this.props.dispatch(createAction('eventDetail/postAlert')({ _id: this.state.data._id }, this));
        this.props.dispatch({
            type: 'eventDetail/postAlert',
            payload: {
                _id: this.state.data._id
            },
            that: this,
        });
    }
    _renderItem = (item) => {
        if (item == null) {
            return <View />
        } else {
            return (
                <View style={styles.itemView}>
                    <View style={homeStyle.itemTopView}>
                        <View style={homeStyle.itemTopLeft}>
                            <Text style={homeStyle.itemTitle} >{item.moduleName}</Text>
                            <View style={item.confirmState ? homeStyle.itemClearView : homeStyle.itemClearView_}>
                                <Text style={homeStyle.itemClear} >{item.confirmState ? I18n.t('event_clear') : I18n.t('event_unclear')}</Text>
                            </View>
                        </View>
                        <View style={homeStyle.itemTopRight}>
                            <Text style={homeStyle.time} >{ihtool.getSimpleDate(item.startsAt)}</Text>
                        </View>
                    </View>
                    <View style={homeStyle.itemBodyView}>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_type') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventType(item)}</Text>
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_level') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventLevelLabel(item.level)}</Text>
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventLevelImage(item.level)} />
                        </View>
                        {
                            item.confirmState ?
                                <View style={homeStyle.itemTextView}>
                                    <Text style={homeStyle.itemText} >{I18n.t('notice.confirm_time') + '：'}</Text>
                                    <Text style={homeStyle.itemText} >{moment(item.confirmedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                </View> : null
                        }
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventDesc(item)}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={item.confirmState ? styles.clearBtnView_ : styles.clearBtnView} disabled={item.confirmState} activeOpacity={0.6} onPress={() => this.postAlert()} >
                        <Text style={styles.clearBtn}>{I18n.t('clear_event')}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this._renderItem(this.props.data)
                }
                {
                    this.props.isLoading ? <LoadingView /> : <View />
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