import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
    FlatList,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from '../../widget/LoadingView';
import NoDataView from '../../widget/NoDataView';
import moment from 'moment';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';
import homeStyle from '../../styles/Home/homeStyle';

const eventTypes = ['vehicle', 'driving', 'driving', 'driving',]
class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: I18n.t('tab_home'),
    });
    constructor(props) {
        super(props);
        this.state = {
            eventType: 0,
            selectIndex: 0,
        }
    }
    componentWillMount() {
        this.props.dispatch(createAction('home/getVersion')({}));
    }
    componentDidMount() {
        this.props.dispatch(createAction('home/getStatistics')({ queryType: '1' }));
        this.props.dispatch(createAction('home/getAlerts')({
            cursor: 0,
            limit: 5,
            body: {
                end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
                labels: {
                    code: eventTypes[this.state.eventType],
                },
            }
        }));
    }
    refresh() {
        this.props.dispatch(createAction('home/getStatistics')({ queryType: '1' }));
        this.props.dispatch(createAction('home/getAlerts')({
            cursor: 0,
            limit: 5,
            body: {
                end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
                labels: {
                    code: eventTypes[this.state.eventType],
                },
            }
        }));
    }

    pushEventDetail(item, index) {
        this.setState({ selectIndex: index });
        this.props.navigation.navigate('EventDetail', {
            item: item,
            callback: (backdata) => {
                var events = [];
                for (let i = 0; i < this.props.events.length; i++) {
                    const element = this.props.events[i];
                    if (index == i) {
                        events.push(backdata);
                    } else {
                        events.push(element);
                    }
                }
                this.props.dispatch(createAction('home/updateState')({ events: events }));
            }
        });
    }
    refreshEvents(value) {
        this.setState({ eventType: value });
        this.props.dispatch(createAction('home/getAlerts')({
            cursor: 0,
            limit: 5,
            body: {
                end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
                labels: {
                    code: eventTypes[value],
                },
            }
        }));
    }
    returnEvents() {
        this.props.dispatch(createAction('events/updateState')({
            isLoading: true,
            data: [],
            cursor: 0,
            level: 0,
            plateNo: '',
            eventType: this.state.eventType + 1,
            start_time: moment().add(-1, 'month').utc().format(),
            end_time: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }));
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: {
                begin: moment().add(-1, 'month').utc().format(),
                end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
                labels: {
                    code: eventTypes[this.state.eventType]
                }
            }
        }));
        this.props.navigation.navigate('Events', { eventsType: this.state.eventType + 1 });
    }
    getMoreView(items) {
        if (items && items.length > 0) {
            return (
                <TouchableOpacity activeOpacity={0.6} onPress={() => this.returnEvents()} >
                    <View style={homeStyle.moreView}>
                        <Text style={homeStyle.itemTitle}>{I18n.t('common.more')}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <View />
        }
    }
    getItems(items) {
        if (items && items.length > 0) {
            return items.map((item, index) =>
                <TouchableOpacity disabled={this.props.isLoading} key={index} activeOpacity={0.6} onPress={() => this.pushEventDetail(item, index)} >
                    <View style={homeStyle.itemView}>
                        <View style={homeStyle.itemTopView}>
                            <View style={homeStyle.itemTopLeft}>
                                <Text style={homeStyle.itemTitle} >{item.moduleName}</Text>
                                <View style={item.confirmState ? homeStyle.itemClearView : homeStyle.itemClearView_}>
                                    <Text style={homeStyle.itemClear} >{item.confirmState ? I18n.t('event_confirm') : I18n.t('event_unconfirm')}</Text>
                                </View>
                            </View>
                            <View style={homeStyle.itemTopRight}>
                                <Text style={homeStyle.time} >{ihtool.getSimpleDate(item.startsAt)}</Text>
                                <Image style={homeStyle.imgagRight} source={Images.other_right} />
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
                            <View style={homeStyle.itemTextView}>
                                <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                                <Text style={homeStyle.itemText} >{ihtool.getEventDesc(item)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity disabled={this.props.isLoading} style={homeStyle.nodataView} activeOpacity={0.6} onPress={() => this.refreshEvents(this.state.eventType)} >
                    <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                </TouchableOpacity>
            );
        }
    }
    render() {
        const data = ihtool.getStatistics(this.props.data);
        return (
            <View style={homeStyle.container}>
                <NavigationBar title={I18n.t('tab_home')} />
                <ScrollView
                    style={homeStyle.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.refresh()}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                >
                    <View style={homeStyle.staticView}>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_distance} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_distance')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{data.distance}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('km')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_duration} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_duration')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{data.duration}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('hour')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_fuelConsumption} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_fuelConsumption')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{data.fuelConsumption}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('sheng')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_cars} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_cars')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{data.workPerson}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('liang')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={homeStyle.bodyView}>
                        <View style={homeStyle.titleView}>
                            <TouchableOpacity disabled={this.props.isLoading} style={this.state.eventType == 0 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.refreshEvents(0)} >
                                <Text style={this.state.eventType == 0 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_car')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.props.isLoading} style={this.state.eventType == 1 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.refreshEvents(1)} >
                                <Text style={this.state.eventType == 1 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_driving')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.props.isLoading} style={this.state.eventType == 2 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.refreshEvents(2)} >
                                <Text style={this.state.eventType == 2 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_work')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.props.isLoading} style={this.state.eventType == 3 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.refreshEvents(3)} >
                                <Text style={this.state.eventType == 3 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_alarm')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={homeStyle.line} />
                        {
                            this.getItems(this.props.events)
                        }
                    </View>
                    {
                        this.getMoreView(this.props.events)
                    }
                    <View style={homeStyle.space_Vertical} />
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        events: state.home.events,
        isLoading: state.home.isLoading,
        data: state.home.data,
    }
}
export default connect(mapStateToProps)(Home);