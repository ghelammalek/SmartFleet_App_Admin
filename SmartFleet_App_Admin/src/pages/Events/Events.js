import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    Keyboard,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import { connect } from '../../routes/dva';
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from '../../widget/LoadingView';
import NoDataView from '../../widget/NoDataView';
import SearchView from '../../widget/SearchView';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import moment from 'moment';
import ihtool from '../../utils/ihtool';
import styles from '../../styles/Event/eventStyle';
import homeStyle from '../../styles/Home/homeStyle';
import siftStyle from '../../styles/siftViewStyle';

const eventTypes = ['', 'vehicle', 'driving', 'driving', 'driving']
class Events extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: I18n.t('tab_events'),
    });
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            isShow: false,
            hasSelect: false,
            eventType: 0,
            level: 0,
            start_time: moment().add(-1, 'month').format('YYYY-MM-DD'),
            end_time: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        }
    }
    // componentWillMount() {
    //     console.log('componentWillMount');
    // }
    // componentWillUpdate() {
    //     console.log('componentWillUpdate');
    // }
    // componentDidUpdate() {
    //     console.log('componentDidUpdate');
    // }
    // componentDidCatch() {
    //     console.log('componentDidCatch');
    // }
    // componentWillReceiveProps() {
    //     console.log('componentWillReceiveProps');
    // }
    // componentWillUnmount() {
    //     console.log('componentWillUnmount');
    // }
    componentDidMount() {
        let body = {};
        let labels = {};
        if (this.props.eventType > 0) {
            labels.code = eventTypes[this.props.eventType];
        }
        if (this.props.level > 0) {
            body.level = this.props.level;
        }
        if (this.props.start_time !== '') {
            body.begin = moment(this.props.start_time).utc().format();
        }
        if (this.props.end_time !== '') {
            body.end = moment(this.props.end_time).utc().format();
        }
        if (this.props.plateNo !== '') {
            labels.site_name = this.props.plateNo;
        }
        body.labels = labels;
        this.props.dispatch(createAction('events/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: body,
        }));
    }
    refresh() {
        let body = {};
        let labels = {};
        if (this.props.eventType > 0) {
            labels.code = eventTypes[this.props.eventType];
        }
        if (this.props.level > 0) {
            body.level = this.props.level;
        }
        if (this.props.start_time !== '') {
            body.begin = moment(this.props.start_time).utc().format();
        }
        var end = this.state.end_time;
        if (this.state.end_time !== '') {
            const current = moment().format('YYYY-MM-DD');
            if (moment(moment(this.state.end_time).format('YYYY-MM-DD')).unix() == moment(current).unix()) {
                end = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
            }
            body.end = moment(end).utc().format();
        }
        if (this.props.plateNo !== '') {
            labels.site_name = this.props.plateNo;
        }
        body.labels = labels;
        this.props.dispatch(createAction('events/updateState')({ isLoad: true, end_time: end }));
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: body,
        }));
    }
    loadMore() {
        let body = {};
        let labels = {};
        if (this.props.eventType > 0) {
            labels.code = eventTypes[this.props.eventType];
        }
        if (this.props.level > 0) {
            body.level = this.props.level;
        }
        if (this.props.start_time !== '') {
            body.begin = moment(this.props.start_time).utc().format();
        }
        if (this.props.end_time !== '') {
            body.end = moment(this.props.end_time).utc().format();
        }
        if (this.props.plateNo !== '') {
            labels.site_name = this.props.plateNo;
        }
        body.labels = labels;
        this.props.dispatch(createAction('events/loadMore')({
            cursor: this.props.cursor + 20,
            limit: 20,
            body: body,
        }));
    }
    siftAction() {
        Keyboard.dismiss();
        const { eventType, level, start_time, end_time } = this.props;
        this.setState({
            eventType: eventType,
            level: level,
            start_time: start_time,
            end_time: end_time,
        });
        if (this.state.isShow) {
            this.setState({
                isShow: false,
            });
        } else {
            this.setState({
                isShow: true,
            });
        }
    }
    pushEventDetail(item) {
        this.setState({ selectIndex: item.index });
        this.props.navigation.navigate('EventDetail', {
            item: item.item,
            callback: (backdata) => {
                var events = [];
                for (let i = 0; i < this.props.data.length; i++) {
                    const element = this.props.data[i];
                    if (item.index == i) {
                        events.push(backdata);
                    } else {
                        events.push(element);
                    }
                }
                this.props.dispatch(createAction('events/updateState')({ data: events }));
            }
        });
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity disabled={this.props.isLoad} key={item.index} activeOpacity={0.6} onPress={() => this.pushEventDetail(item)} >
                <View style={homeStyle.itemView}>
                    <View style={homeStyle.itemTopView}>
                        <View style={homeStyle.itemTopLeft}>
                            <Text style={homeStyle.itemTitle} >{item.item.moduleName}</Text>
                            <View style={item.item.confirmState ? homeStyle.itemClearView : homeStyle.itemClearView_}>
                                <Text style={homeStyle.itemClear} >{item.item.confirmState ? I18n.t('event_confirm') : I18n.t('event_unconfirm')}</Text>
                            </View>
                        </View>
                        <View style={homeStyle.itemTopRight}>
                            <Text style={homeStyle.time} >{ihtool.getSimpleDate(item.item.startsAt)}</Text>
                            <Image style={homeStyle.imgagRight} source={Images.other_right} />
                        </View>
                    </View>
                    <View style={homeStyle.itemBodyView}>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_type') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventType(item.item)}</Text>
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_level') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventLevelLabel(item.item.level)}</Text>
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventLevelImage(item.item.level)} />
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventDesc(item.item)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={I18n.t('tab_events')}
                    rightImage={this.state.isShow ? Images.other_sift_select : Images.other_sift}
                    rightAction={this.siftAction.bind(this)}
                />
                <View style={styles.container}>
                    <SearchView
                        placeholder={I18n.t('pleaseholder_plateNo')}
                        value={this.props.plateNo}
                        onSubmitEditing={(evt) => this.onSubmitEditing(evt.nativeEvent.text)}
                    />
                    {
                        this.props.data && this.props.data.length > 0 ?
                            <View style={[styles.container, { paddingHorizontal: 10 }]}>
                                <FlatList
                                    refreshing={this.props.isLoad}
                                    // ItemSeparatorComponent={this._separator}
                                    renderItem={this._renderItem}
                                    data={this.props.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReachedThreshold={0.3}
                                    onEndReached={(info) => this.loadMore()}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.props.isLoad}
                                            onRefresh={() => this.refresh()}
                                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                            progressBackgroundColor="#ffffff"
                                        />
                                    }
                                />
                            </View> :
                            <View style={styles.container}>
                                {
                                    this.props.isLoading ? <View /> :
                                        <TouchableOpacity disabled={this.props.isLoading} style={homeStyle.nodataView} activeOpacity={0.6} onPress={() => this.refresh()} >
                                            <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                                        </TouchableOpacity>
                                }
                            </View>
                    }
                    {
                        this.state.isShow ?
                            <View style={siftStyle.container}>
                                <ScrollView style={siftStyle.backgroundView} bounces={false}>
                                    <View style={siftStyle.bodyView}>
                                        <Text style={siftStyle.title}>{I18n.t('event_type')}</Text>
                                        <View style={siftStyle.wrapView}>
                                            <TouchableOpacity style={this.state.eventType == 0 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectEventType(0)}>
                                                <Text style={this.state.eventType == 0 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('all')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.eventType == 1 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectEventType(1)}>
                                                <Text style={this.state.eventType == 1 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('event_for_car')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.eventType == 2 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectEventType(2)}>
                                                <Text style={this.state.eventType == 2 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('event_for_driving')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.eventType == 3 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectEventType(3)}>
                                                <Text style={this.state.eventType == 3 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('event_for_work')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.eventType == 4 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectEventType(4)}>
                                                <Text style={this.state.eventType == 4 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('event_for_alarm')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={siftStyle.separator} />
                                        <Text style={siftStyle.title}>{I18n.t('alarm_state')}</Text>
                                        <View style={siftStyle.wrapView}>
                                            <TouchableOpacity style={this.state.level == 0 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(0)}>
                                                <Text style={this.state.level == 0 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('all')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.level == 1 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(1)}>
                                                <Text style={this.state.level == 1 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('level1')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.level == 2 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(2)}>
                                                <Text style={this.state.level == 2 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('level2')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.level == 3 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(3)}>
                                                <Text style={this.state.level == 3 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('level3')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.level == 4 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(4)}>
                                                <Text style={this.state.level == 4 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('level4')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.level == 5 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(5)}>
                                                <Text style={this.state.level == 5 ? siftStyle.itemText_ : siftStyle.itemText}>{I18n.t('level5')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={siftStyle.separator} />
                                        <Text style={siftStyle.title}>{I18n.t('search_time')}</Text>
                                        <View style={siftStyle.timeView}>
                                            <Text style={siftStyle.timeTitle}>{I18n.t('start_time')}</Text>
                                            <DatePicker
                                                locale={I18n.locale}
                                                style={styles.datePicker}
                                                date={this.state.start_time}
                                                mode="date"
                                                placeholder={I18n.t('select_start_time')}
                                                format="YYYY-MM-DD"
                                                maxDate={moment().format('YYYY-MM-DD')}
                                                confirmBtnText={I18n.t('okText')}
                                                cancelBtnText={I18n.t('cancelText')}
                                                allowFontScaling={false}
                                                customStyles={{
                                                    dateIcon: {
                                                        height: 0,
                                                        width: 0,
                                                    },
                                                    dateInput: {
                                                        height: 40,
                                                        borderWidth: 0,
                                                        // alignItems: 'flex-start'
                                                    },
                                                    dateText: {
                                                        fontSize: 14,
                                                        color: '#2d2d2d',
                                                    }
                                                }}
                                                onDateChange={(date) => { this.setState({ start_time: date }); }}
                                            />
                                        </View>
                                        <View style={siftStyle.separator_} />
                                        <View style={siftStyle.timeView}>
                                            <Text style={siftStyle.timeTitle}>{I18n.t('end_time')}</Text>
                                            <DatePicker
                                                locale={I18n.locale}
                                                style={styles.datePicker}
                                                date={this.state.end_time}
                                                mode="date"
                                                placeholder={I18n.t('select_end_time')}
                                                format="YYYY-MM-DD"
                                                maxDate={moment().format('YYYY-MM-DD')}
                                                confirmBtnText={I18n.t('okText')}
                                                cancelBtnText={I18n.t('cancelText')}
                                                allowFontScaling={false}
                                                customStyles={{
                                                    dateIcon: {
                                                        height: 0,
                                                        width: 0,
                                                    },
                                                    dateInput: {
                                                        height: 40,
                                                        borderWidth: 0,
                                                        // alignItems: 'flex-start'
                                                    },
                                                    dateText: {
                                                        fontSize: 14,
                                                        color: '#2d2d2d',
                                                    }
                                                }}
                                                onDateChange={(date) => this.changeEndTime(date)}
                                            />
                                        </View>
                                        <View style={siftStyle.separator} />
                                        <View style={siftStyle.btnView}>
                                            <TouchableOpacity style={siftStyle.resetView} activeOpacity={0.6} onPress={() => this.resetAction()}>
                                                <Text style={siftStyle.reset} >{I18n.t('reset')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={siftStyle.confirmView} activeOpacity={0.6} onPress={() => this.confirmAction()}>
                                                <Text style={siftStyle.confirm} >{I18n.t('confirm')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>

                            </View> : <View />
                    }
                </View>
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
    onSubmitEditing(text) {
        let body = {};
        let labels = {};
        if (this.props.eventType > 0) {
            labels.code = eventTypes[this.props.eventType];
        }
        if (this.props.level > 0) {
            body.level = this.props.level;
        }
        if (this.props.start_time !== '') {
            body.begin = moment(this.props.start_time).utc().format();
        }
        var end = this.state.end_time;
        if (this.state.end_time !== '') {
            const current = moment().format('YYYY-MM-DD');
            if (moment(moment(this.state.end_time).format('YYYY-MM-DD')).unix() == moment(current).unix()) {
                end = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
            }
            body.end = moment(end).utc().format();
        }
        if (!isEmpty(text)) {
            labels.site_name = text;
        }
        body.labels = labels;
        this.setState({
            end_time: end
        });
        this.props.dispatch(createAction('events/updateState')({
            isLoading: true,
            data: [],
            cursor: 0,
            plateNo: text,
            end_time: end,
        }));
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: body,
        }));
    }
    selectAlarmType(value) {
        this.setState({ level: value })
    }
    selectEventType(value) {
        this.setState({ eventType: value })
    }
    confirmAction() {
        if (!isEmpty(this.state.start_time)
            && !isEmpty(this.state.end_time)
            && (moment(this.state.start_time).unix() >= moment(this.state.end_time).unix())
        ) {
            Alert.alert('', I18n.t('start_must_earlier_end'), [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else {
            let body = {};
            let labels = {};
            if (this.state.eventType > 0) {
                labels.code = eventTypes[this.state.eventType];
            }
            if (this.state.level > 0) {
                body.level = this.state.level;
            }
            if (this.state.start_time !== '') {
                body.begin = moment(this.state.start_time).utc().format();
            }
            var end = this.state.end_time;
            if (this.state.end_time !== '') {
                const current = moment().format('YYYY-MM-DD');
                if (moment(moment(this.state.end_time).format('YYYY-MM-DD')).unix() == moment(current).unix()) {
                    end = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                }
                body.end = moment(end).utc().format();
            }
            if (this.props.plateNo !== '') {
                labels.site_name = this.props.plateNo;
            }
            body.labels = labels;
            this.setState({
                isShow: false,
                end_time: end
            });
            this.props.dispatch(createAction('events/updateState')({
                isLoading: true,
                data: [],
                cursor: 0,
                level: this.state.level,
                eventType: this.state.eventType,
                start_time: this.state.start_time,
                end_time: end,
            }));
            this.props.dispatch(createAction('events/getAlerts')({
                cursor: 0,
                limit: 20,
                body: body,
            }));
        }
    }
    resetAction() {
        this.setState({
            level: 0,
            eventType: 0,
            start_time: moment().add(-1, 'month').format('YYYY-MM-DD'),
            end_time: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        })
    }
    changeEndTime(date) {
        const current = moment().format('YYYY-MM-DD');
        if (moment(date).unix() == moment(current).unix()) {
            this.setState({ end_time: moment().format('YYYY-MM-DD HH:mm:ss.SSS') })
        } else {
            this.setState({ end_time: ihtool.getDateEnd(date) })
        }
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.events.isLoading,
        data: state.events.data,
        isLoad: state.events.isLoad,
        cursor: state.events.cursor,
        level: state.events.level,
        plateNo: state.events.plateNo,
        eventType: state.events.eventType,
        start_time: state.events.start_time,
        end_time: state.events.end_time,
    }
}
export default connect(mapStateToProps)(Events);