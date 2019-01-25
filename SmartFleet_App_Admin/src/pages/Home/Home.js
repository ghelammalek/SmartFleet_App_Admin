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

const eventTypes = ['', 'vehicle', 'driving', 'work', 'gateWay']
const topTypes = ['distance', 'running_duration', 'working_duration'];
const colors = ['#fd5f37', '#f8c521', '#bfc3c7', '#ebebeb', '#ebebeb'];
class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: I18n.t('tab_home'),
    });
    constructor(props) {
        super(props);
        this.state = {
            eventType: 0,
            topType: 0,
            selectIndex: 0,
            statistics: {},
            events: [],
            topData: [],
            isRefresh: false,
            isLoadEvents: false,
            isLoadTop: false,
            isLoadStastics: false,
        }

    }
    componentWillMount() {
        this.props.dispatch({
            type: 'home/getVersion',
            payload: {}
        });
    }
    componentDidMount() {
        this.getStatistics('1');
        this.getEvents(this.state.eventType);
    }
    refresh() {
        if (this.state.isRefresh === false) {
            this.setState({ isRefresh: true })
            this.getStatistics('1');
            this.getEvents(this.state.eventType);
        }
    }
    getStatistics(queryType) {
        if (this.state.isLoadStastics === false) {
            this.setState({ isLoadStastics: true })
            this.props.dispatch({
                type: 'home/getStatistics',
                payload: { queryType: queryType },
                onSuccess: (result) => {
                    this.setState({ statistics: result, isLoadStastics: false })
                },
                onFaild: (result) => {
                    this.setState({ statistics: {}, isLoadStastics: false })
                }
            });
        }
    }
    getEvents(value) {
        if (this.state.isLoadEvents === false) {
            this.setState({ eventType: value, isLoadEvents: true });
            let labels = {};
            if (value !== 0) {
                labels = { code: eventTypes[value] };
            }
            this.props.dispatch({
                type: 'home/getAlerts',
                payload: {
                    cursor: 0,
                    limit: 5,
                    body: {
                        end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
                        labels: labels,
                    }
                },
                onSuccess: (result) => {
                    this.setState({
                        isLoadEvents: false,
                        isRefresh: false,
                        events: result,
                    })
                },
                onFaild: (result) => {
                    this.setState({
                        isLoadEvents: false,
                        isRefresh: false,
                        events: result,
                    })
                }
            });
        }
    }
    getTops(value) {
        const { oid } = Global.cfg.userInfo;
        if (this.state.isLoadTop === false) {
            this.setState({ isLoadTop: true, topType: value })
            this.props.dispatch({
                type: 'home/getTops',
                payload: {
                    type: topTypes[value],
                    oid: oid,
                },
                onSuccess: (result) => {
                    this.setState({ topData: result, isLoadTop: false })
                },
                onFaild: (result) => {
                    this.setState({ topData: [], isLoadTop: false })
                }
            });
        }
    }
    pushEventDetail(item, index) {
        this.setState({ selectIndex: index });
        this.props.navigation.navigate('EventDetail', {
            item: item,
            callback: (backdata) => {
                let events = [];
                for (let i = 0; i < this.state.events.length; i++) {
                    const element = this.state.events[i];
                    if (index == i) {
                        events.push(backdata);
                    } else {
                        events.push(element);
                    }
                }
                this.setState({ events: events });
            }
        });
    }
    pushToEvents() {
        this.props.dispatch(createAction('events/updateState')({
            isLoading: true,
            data: [],
            cursor: 0,
            level: 0,
            plateNo: '',
            eventType: this.state.eventType,
            start_time: moment().add(-1, 'month').utc().format(),
            end_time: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }));
        let labels = {};
        if (this.state.eventType !== 0) {
            labels = { code: eventTypes[this.state.eventType] };
        }
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: {
                begin: moment().add(-1, 'month').utc().format(),
                end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
                labels: labels
            }
        }));
        this.props.navigation.navigate('Events', { eventsType: this.state.eventType + 1 });
    }
    _renderItem(data) {
        const { item, index } = data;
        return (
            <TouchableOpacity disabled={this.state.isLoadEvents} key={index} activeOpacity={0.6} onPress={() => this.pushEventDetail(item, index)} >
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
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventLevelImage(item.level)} />
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventDetailImage(item)} />
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventDesc(item)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    getItems(items) {
        if (items && items.length > 0) {
            return items.map((item, index) =>
                <View style={homeStyle.topView} key={index}>
                    <View style={[homeStyle.topMarkView, { backgroundColor: index < 5 ? colors[index] : colors[4] }]}>
                        <Text style={index < 3 ? homeStyle.topMarkLabel : homeStyle.topMarkLabel_}>{index + 1}</Text>
                    </View>
                    <View style={homeStyle.topNameView}>
                        <Text style={homeStyle.itemTitle}>{item.site_id}</Text>
                    </View>
                    <Text style={homeStyle.time}>
                        {(item[`${topTypes[this.state.topType]}`] || '--') + ' ' + I18n.t(`${this.state.topType === 0 ? 'common.km_per_hr' : 'common.hour'}`)}
                    </Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity disabled={this.state.isLoadTop}
                    style={homeStyle.nodataView}
                    activeOpacity={0.6}
                    onPress={() => this.getTops(this.state.topType)} >
                    <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                </TouchableOpacity>
            );
        }
    }
    render() {
        const statistics = ihtool.getStatistics(this.state.statistics);
        return (
            <View style={homeStyle.container}>
                <NavigationBar title={I18n.t('tab_home')} />
                <ScrollView
                    style={homeStyle.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
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
                                    <Text style={homeStyle.static_title}>{statistics.distance}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('km')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_duration} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_duration')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{statistics.duration}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('hour')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_fuelConsumption} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_fuelConsumption')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{statistics.fuelConsumption}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('sheng')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={homeStyle.staticView_}>
                            <Image style={homeStyle.static_image} source={Images.home_cars} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('label_cars')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{statistics.workPerson}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('liang')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={homeStyle.bodyView}>
                        <ScrollView horizontal={true} bounces={false}
                            style={homeStyle.titleView} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity disabled={this.state.isLoadTop}
                                style={this.state.topType == 0 ? homeStyle.btnView_ : homeStyle.btnView}
                                activeOpacity={0.6}
                                onPress={() => this.getTops(0)}
                            >
                                <Text style={this.state.topType == 0 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>
                                    {I18n.t('dashboard.travlled_distance')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.isLoadTop}
                                style={this.state.topType == 1 ? homeStyle.btnView_ : homeStyle.btnView}
                                activeOpacity={0.6}
                                onPress={() => this.getTops(1)}
                            >
                                <Text style={this.state.topType == 1 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>
                                    {I18n.t('runningTime')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.isLoadTop}
                                style={this.state.topType == 2 ? homeStyle.btnView_ : homeStyle.btnView}
                                activeOpacity={0.6}
                                onPress={() => this.getTops(2)}
                            >
                                <Text style={this.state.topType == 2 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>
                                    {I18n.t('dashboard.worktime')}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={homeStyle.line} />
                        {
                            this.getItems(this.state.topData)
                        }
                    </View>
                    <View style={homeStyle.bodyView}>
                        <View style={homeStyle.titleView}>
                            <ScrollView horizontal={true} bounces={true}
                                style={homeStyle.titleView} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity disabled={this.state.isLoadEvents} style={this.state.eventType == 0 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.getEvents(0)} >
                                    <Text style={this.state.eventType == 0 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_all')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={this.state.isLoadEvents} style={this.state.eventType == 1 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.getEvents(1)} >
                                    <Text style={this.state.eventType == 1 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_car')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={this.state.isLoadEvents} style={this.state.eventType == 2 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.getEvents(2)} >
                                    <Text style={this.state.eventType == 2 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_driving')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={this.state.isLoadEvents} style={this.state.eventType == 3 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.getEvents(3)} >
                                    <Text style={this.state.eventType == 3 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_work')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={this.state.isLoadEvents} style={this.state.eventType == 4 ? homeStyle.btnView_ : homeStyle.btnView} activeOpacity={0.6} onPress={() => this.getEvents(4)} >
                                    <Text style={this.state.eventType == 4 ? homeStyle.btnTitle_ : homeStyle.btnTitle}>{I18n.t('event_for_alarm')}</Text>
                                </TouchableOpacity>
                            </ScrollView>
                            <TouchableOpacity style={homeStyle.moreView} onPress={() => this.pushToEvents()}>
                                <Image style={homeStyle.moreImage}
                                    source={Images.other_more}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={homeStyle.line} />
                        {
                            this.state.events && this.state.events.length > 0 ?
                                <View style={{ maxHeight: 300 }}>
                                    <FlatList
                                        bounces={false}
                                        renderItem={this._renderItem.bind(this)}
                                        data={this.state.events}
                                        keyExtractor={(item, index) => index.toString()}
                                    >
                                    </FlatList>
                                </View> :
                                <TouchableOpacity disabled={this.state.isLoadEvents} style={homeStyle.nodataView} activeOpacity={0.6} onPress={() => this.refreshEvents(this.state.eventType)} >
                                    <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={homeStyle.space_Vertical} />
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(Home);