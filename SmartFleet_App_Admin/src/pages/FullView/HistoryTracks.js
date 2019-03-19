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
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import DatePicker from 'react-native-datepicker';
import { connect } from '../../routes/dva';
import NavigationBar from '../../widget/NavigationBar';
import TabBarTop from "../../widget/TabBarTop";
import LoadingView from "../../widget/LoadingView";
import NoDataView from '../../widget/NoDataView';
import SearchView from '../../widget/SearchView';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';
import moment from 'moment';
import styles from '../../styles/FullView/historyStyle';
import siteDetailStyle from '../../styles/FullView/siteDetailStyle';
import siftStyle from '../../styles/siftViewStyle';
import homeStyle from '../../styles/Home/homeStyle';
import ChartView from '../../widget/react-native-highcharts';

const units = ['km/h', 'v', '℃', ''];
const params = ['speed', '', '', ''];
class HistoryTracks extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('common.history'),
        headerBackTitle: null,
        headerStyle: {
            borderBottomWidth: 0,
        },
    });
    constructor(props) {
        super(props);
        const item = this.props.item;
        this.state = {
            title: item.plateNo,
            location: item.location,
            item: item,
            tabNames: [I18n.t('detail.history_track'), I18n.t('detail.history_data')],
            tabImages: [Images.other_track, Images.other_history_data],
            tabSelectImages: [Images.other_track_select, Images.other_history_data_select],
            isShow: false,
            selectTime: 1,
            start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            btnSelect: 1,
            state: 1,
            isFlod: false,
            isLoading: false,
            markers: [],
            events: [],
            loadtracks: false,
            tracks: [],
            loadtrend: false,
            speedData: [],
            distanceData: [],
            working_duration: [],
            statistics: {},
        }
        this.selectTime = 1;
        this.start_time = moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            this.end_time = moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            this.timeLabel = ['', I18n.t('common.this_day'), I18n.t('custom'), I18n.t('common.this_month'), I18n.t('common.this_year')]
        this.names = [I18n.t('speed'), I18n.t('worktime_duraction'), I18n.t('detail.temperature'), I18n.t('detail.braking_sign')]

    }
    componentDidMount() {
        this.refresh();
    }
    refresh() {
        this.getAlerts();
        this.getTrendData(this.state.btnSelect);
        this.getSiteTracks(this.state.btnSelect);
        this.getStatistics();
    }
    getStatistics() {
        this.props.dispatch({
            type: 'historyTracks/getStatistics',
            payload: {
                plateNo: this.state.item.id,
                begin: moment(this.state.start_time).utc().format(),
                end: moment(this.state.end_time).utc().format(),
            },
            onSuccess: (result) => {
                this.setState({
                    statistics: result,
                });
            },
            onFaild: () => {
                this.setState({
                    statistics: {},
                });
            }
        });
    }
    getAlerts() {
        this.setState({ isLoading: true, events: [] });
        this.props.dispatch({
            type: 'historyTracks/getAlerts',
            payload: {
                cursor: 0,
                limit: 0,
                body: {
                    begin: moment(this.state.start_time).utc().format(),
                    end: moment(this.state.end_time).utc().format(),
                    labels: {
                        code: 'driving',
                    },
                    mid: this.state.item.id,
                }
            },
            onSuccess: (result) => {
                this.setState({
                    isLoading: false,
                    markers: result.markers,
                    events: result.events,
                })
            },
            onFaild: () => {
                this.setState({
                    isLoading: false,
                    markers: [],
                    events: [],
                })
            }
        })
    }
    getSiteTracks() {
        this.setState({
            loadtracks: false,
        })
        this.props.dispatch({
            type: 'historyTracks/getSiteTracks',
            payload: {
                plateNo: this.state.item.id,
                start: moment(this.state.start_time).utc().format(),
                end: moment(this.state.end_time).utc().format(),
            },
            onSuccess: (result) => {
                this.setState({
                    loadtracks: false,
                    tracks: result,
                });
            },
            onFaild: () => {
                this.setState({
                    loadtracks: false,
                    tracks: [],
                });
            }
        });
    }
    getTrendData(value) {
        this.setState({
            loadtrend: false,
        });
        if (value == 1) {
            this.props.dispatch({
                type: 'historyTracks/getSiteTrend',
                payload: {
                    plateNo: this.state.item.id,
                    metric: 'iot_data',
                    fields: 'speed',
                    start: moment(this.state.start_time).utc().format(),
                    end: moment(this.state.end_time).utc().format(),
                    interval: 60,
                    function: 'max'
                },
                onSuccess: (result) => {
                    this.setState({
                        loadtrend: false,
                        speedData: result,
                    });
                },
                onFaild: () => {
                    this.setState({
                        loadtrend: false,
                        speedData: [],
                    });
                }
            });
        } else {
            this.props.dispatch({
                type: 'historyTracks/getSiteTrend',
                payload: {
                    plateNo: this.state.item.id,
                    metric: 'iot_data',
                    fields: 'working_duration,distance',
                    start: moment(this.state.start_time).utc().format(),
                    end: moment(this.state.end_time).utc().format(),
                    interval: 3600,
                    function: 'max'
                },
                onSuccess: (result) => {
                    this.setState({
                        loadtrend: false,
                        distanceData: result.distanceData,
                        working_duration: result.working_duration,
                    });
                },
                onFaild: () => {
                    this.setState({
                        loadtrend: false,
                        distanceData: [],
                        working_duration: [],
                    });
                }
            });
        }
    }
    selectToday(value) {
        this.setState({
            selectTime: value,
            start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    getTimeLabel(value) {
        let lable = '';
        if (value == 0) {
            if (moment(this.state.start_time).get('date') == moment(this.state.end_time).get('date')) {
                lable = moment(this.state.start_time).format('YYYY-MM-DD HH:mm') + ' ~ ' + moment(this.state.end_time).format('HH:mm');
            } else {
                lable = moment(this.state.start_time).format('YYYY-MM-DD HH:mm') + ' ~ ' + moment(this.state.end_time).format('MM-DD HH:mm');
            }
        } else if (value == 2) {
            lable = moment(this.state.start_time).format('YYYY-MM-DD');
        } else {
            lable = this.timeLabel[value];
        }
        return lable;
    }
    getSeries(data) {
        if (this.state.btnSelect == 1) {
            var serieses = [];
            const name = this.names[this.state.btnSelect - 1];
            const unit = units[this.state.btnSelect - 1];
            serieses.push({
                type: 'spline',
                name: name,
                dataGrouping: {
                    enabled: false,
                },
                data: this.state.speedData,
                lineWidth: 1,
            });
            return ihtool.getConf(serieses, unit);
        } else {
            const yAxis = [{
                title: {
                    text: I18n.t('dashboard.worktime') + ' (s)',
                    style: { color: '#1E90FF' }
                },
            }, {
                title: {
                    text: I18n.t('dashboard.travlled_distance') + ' (km)',
                    style: { color: '#1cc593' },
                },
                opposite: true,
            }];
            const serieses = [{
                name: I18n.t('dashboard.worktime'),
                type: 'column',
                dataGrouping: {
                    enabled: false,
                },
                data: this.state.working_duration,
            }, {
                name: I18n.t('dashboard.travlled_distance'),
                type: 'column',
                yAxis: 1,
                dataGrouping: {
                    enabled: false,
                },
                data: this.state.distanceData,
            }];
            return ihtool.getConfDouble(yAxis, serieses);
        }
    }
    pushBigMapView() {
        Global.global.navigation.navigate(
            'HistoryTracksBigMap',
            {
                markers: this.getMarkers(this.state.markers, this.state.tracks),
                tracks: this.state.tracks
            }
        );
    }
    getMarkers(markers, polylines) {
        let points = [];
        if (polylines) {
            if (polylines.length > 0) {
                for (let i = 0; i < polylines.length; i++) {
                    const tracks = polylines[i];
                    if (tracks.length > 0) {
                        const startLocation = tracks[0];
                        points.push({
                            latitude: startLocation.lat,
                            longitude: startLocation.lng,
                            title: I18n.t('start_location'),
                            extra: { imageName: 'start' }
                        });
                        if (tracks.length > 1) {
                            const index = tracks.length - 1;
                            const endLocation = tracks[index];
                            points.push({
                                latitude: endLocation.lat,
                                longitude: endLocation.lng,
                                title: I18n.t('end_location'),
                                extra: { imageName: 'stop' }
                            });
                        }
                    }
                }
            }
        }
        if (markers && markers.length > 0) {
            for (let i = 0; i < markers.length; i++) {
                const marker = markers[i];
                points.push({
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    title: marker.title,
                    extra: { imageName: marker.extra.imageName }
                });
            }
        }
        return points;
    }
    _renderItem(data) {
        const { item, index } = data;
        const { fields } = item;
        const { alarm_message } = fields || {};
        return (
            <View style={styles.itemView} key={index}>
                <View style={styles.itemStateView}>
                    <Image style={styles.itemImage}
                        source={ihtool.getEventDetailImage(item)}
                    />
                </View>
                <View style={styles.line} />
                <View style={styles.itemTimeView}>
                    <Text style={styles.text14}>
                        {moment(item.startsAt).format('YYYY-MM-DD HH:mm')}
                    </Text>
                </View>
                <View style={styles.line} />
                <View style={styles.itemMesgView}>
                    <Text
                        style={styles.text14}
                    >
                        {alarm_message}
                    </Text>
                </View>
            </View>
        )
    }
    render() {
        const conf = this.getSeries();
        const markers = this.getMarkers(this.state.markers, this.state.tracks);
        const center = markers.length == 0 ? ihtool.getInitPs() : undefined;
        const statistics = ihtool.getStatistics(this.state.statistics);
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Text style={styles.timeTitle}>{I18n.t('sift_time') + ': '}</Text>
                    <TouchableOpacity
                        style={styles.siftBtnView}
                        onPress={() => this.siftBtnAction()}
                        activeOpacity={0.6}
                        disabled={this.state.isLoading}
                    >
                        <Text style={styles.timeLable}>
                            {this.getTimeLabel(this.state.selectTime)}
                        </Text>
                        <Image style={styles.siftBtnImage}
                            source={this.state.isShow ?
                                Images.other_triangle_up_select :
                                Images.other_triangle_down_select
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <ScrollView
                        style={styles.scrollView}
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
                        <View style={siteDetailStyle.bodyItemView}>
                            <MapView
                                trafficEnabled={false}
                                baiduHeatMapEnabled={false}
                                mapType={MapTypes.NORMAL}
                                style={styles.mapView}
                                center={center}
                                markers={markers}
                                polylines={this.state.tracks}
                                onMapClick={(e) => {

                                }}
                            />
                            <TouchableOpacity style={styles.mapViewBtn}
                                onPress={() => { this.pushBigMapView() }}
                            >
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <View style={styles.statictView}>
                                    <View style={styles.statictItem_}>
                                        <View style={styles.statictItem}>
                                            <View style={styles.statictPoint} />
                                            <Text style={styles.text14_bold}>{I18n.t('historyTack.mileage') + ': '}</Text>
                                            <Text style={styles.text14}>{statistics.distance + I18n.t('km')}</Text>
                                        </View>
                                        <View style={styles.statictItem}>
                                            <View style={styles.statictPoint} />
                                            <Text style={styles.text14_bold}>{I18n.t('common.when') + ': '}</Text>
                                            <Text style={styles.text14}>{statistics.working_duration + I18n.t('hour')}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.statictItem_}>
                                        <View style={styles.statictItem}>
                                            <View style={styles.statictPoint} />
                                            <Text style={styles.text14_bold}>{I18n.t('common.alarms') + ': '}</Text>
                                            <Text style={styles.text14}>{statistics.event + I18n.t('pc')}</Text>
                                        </View>
                                        <View style={styles.statictItem}>
                                            <View style={styles.statictPoint} />
                                            <Text style={styles.text14_bold}>{I18n.t('dashboard.illegal_drive_behavior') + ': '}</Text>
                                            <Text style={styles.text14}>{statistics.illegalBehavior + I18n.t('times')}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.eventView}>
                                    <View style={styles.itemView_}>
                                        <View style={styles.itemStateView_}>
                                            <Text style={styles.text14_bold}>{I18n.t('historyTack.state')}</Text>
                                        </View>
                                        <View style={styles.itemTimeView_}>
                                            <Text style={styles.text14_bold}>{I18n.t('common.when')}</Text>
                                        </View>
                                        <View style={styles.itemMesgView_}>
                                            <Text style={styles.text14_bold}>{I18n.t('detail.content')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 300 }}>
                                        {
                                            this.state.events && this.state.events.length > 0 ?
                                                <FlatList
                                                    bounces={false}
                                                    showsVerticalScrollIndicator={false}
                                                    renderItem={this._renderItem.bind(this)}
                                                    data={this.state.events}
                                                    keyExtractor={(item, index) => index.toString()}
                                                >
                                                </FlatList> :
                                                <View style={styles.itemView}>
                                                    {
                                                        this.state.isLoading ?
                                                            <View style={homeStyle.loadingView}>
                                                                <ActivityIndicator style={homeStyle.loading} />
                                                            </View> :
                                                            <TouchableOpacity disabled={this.state.isLoading}
                                                                style={homeStyle.nodataView}
                                                                activeOpacity={0.6}
                                                                onPress={() => this.getAlerts()}
                                                            >
                                                                <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                                                            </TouchableOpacity>
                                                    }
                                                </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={siteDetailStyle.bodyItemView}>
                            <View style={styles.trendTitleView}>
                                <TouchableOpacity style={styles.btnView}
                                    disabled={this.state.loadtrend}
                                    activeOpacity={0.6}
                                    onPress={() => this.btnAction(1)}
                                >
                                    <View style={this.state.btnSelect == 1 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.btnSelect == 1 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('speed')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnView}
                                    disabled={this.state.loadtrend}
                                    activeOpacity={0.6} onPress={() => this.btnAction(2)}
                                >
                                    <View style={this.state.btnSelect == 2 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.btnSelect == 2 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('worktime_duraction')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={siteDetailStyle.line} />
                            <View style={siteDetailStyle.chartView} >
                                <ChartView style={{ flex: 1 }}
                                    config={conf}
                                    more={this.state.btnSelect == 1 ? false : true}
                                    stock={false}
                                >
                                </ChartView>
                            </View>
                        </View>
                        <View style={{ height: 20 }} />
                    </ScrollView>
                </View>
                {
                    this.state.isShow ?
                        <View style={styles.siftView}>
                            <ScrollView style={siftStyle.backgroundView} bounces={false}>
                                <View style={siftStyle.bodyView}>
                                    <Text style={siftStyle.title}>{I18n.t('select_time')}</Text>
                                    <View style={siftStyle.wrapView}>
                                        <TouchableOpacity style={
                                            this.state.selectTime == 1 ?
                                                siftStyle.itemView_ : siftStyle.itemView
                                        }
                                            activeOpacity={0.6}
                                            onPress={() => this.selectToday(1)}
                                        >
                                            <Text style={this.state.selectTime == 1 ? siftStyle.itemText_ : siftStyle.itemText}>{this.timeLabel[1]}</Text>
                                        </TouchableOpacity>
                                        <View style={
                                            this.state.selectTime == 2 ?
                                                siftStyle.itemView_ : siftStyle.itemView}
                                        >
                                            <Text style={this.state.selectTime == 2 ?
                                                siftStyle.itemText_ : siftStyle.itemText
                                            }
                                            >{this.timeLabel[2]}</Text>
                                            <DatePicker
                                                hideText={true}
                                                showIcon={false}
                                                onOpenModal={() => this.setState({ selectTime: 2 })}
                                                locale={I18n.locale}
                                                style={styles.customBtnView}
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
                                                onDateChange={(date) => this.changeCustomTime(date)}
                                            />
                                        </View>
                                    </View>
                                    <View style={siftStyle.separator} />
                                    <Text style={siftStyle.title}>{I18n.t('search_time')}</Text>
                                    <View style={siftStyle.timeView}>
                                        <Text style={siftStyle.timeTitle}>{I18n.t('start_time')}</Text>
                                        <DatePicker
                                            locale={I18n.locale}
                                            style={styles.datePicker}
                                            date={this.state.start_time}
                                            mode="datetime"
                                            placeholder={I18n.t('select_start_time')}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            maxDate={moment().format('YYYY-MM-DD HH:mm:ss')}
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
                                            onDateChange={(date) => {
                                                this.setState({ start_time: date, selectTime: 0 });
                                            }}
                                        />
                                    </View>
                                    <View style={siftStyle.separator_} />
                                    <View style={siftStyle.timeView}>
                                        <Text style={siftStyle.timeTitle}>{I18n.t('end_time')}</Text>
                                        <DatePicker
                                            locale={I18n.locale}
                                            style={styles.datePicker}
                                            date={this.state.end_time}
                                            mode="datetime"
                                            placeholder={I18n.t('select_end_time')}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            maxDate={moment().format('YYYY-MM-DD HH:mm:ss')}
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
                                            onDateChange={(date) => {
                                                this.setState({ end_time: date, selectTime: 0 });
                                            }}
                                        />
                                    </View>
                                    <View style={siftStyle.separator} />
                                    <View style={siftStyle.btnView}>
                                        <TouchableOpacity style={siftStyle.resetView}
                                            activeOpacity={0.6}
                                            onPress={() => this.resetAction()}
                                        >
                                            <Text style={siftStyle.reset} >{I18n.t('reset')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={siftStyle.confirmView}
                                            activeOpacity={0.6}
                                            onPress={() => this.confirmAction()}
                                        >
                                            <Text style={siftStyle.confirm} >{I18n.t('confirm')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View> : <View />
                }
            </View>
        )
    }
    changeCustomTime(date) {
        this.setState({
            start_time: moment(ihtool.getDateBegain(date)).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(date)).format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    changeType(value) {
        this.setState({ state: value })
    }
    btnAction(value) {
        this.setState({ btnSelect: value });
        this.getTrendData(value);
    }
    siftBtnAction() {
        if (this.state.isShow) {
            this.setState({
                isShow: false,
                selectTime: this.selectTime,
                start_time: this.start_time,
                end_time: this.end_time,
            });
        } else {
            this.setState({
                isShow: true,
                selectTime: this.selectTime,
                start_time: this.start_time,
                end_time: this.end_time,
            });
        }
    }
    resetAction() {
        this.setState({
            selectTime: 1,
            start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    confirmAction() {
        if (moment(this.state.end_time).unix() - moment(this.state.start_time).unix() <= 0) {
            Alert.alert('', I18n.t('start_must_earlier_end'), [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else if (moment(this.state.end_time).unix() - moment(this.state.start_time).unix() > 3600 * 24) {
            Alert.alert('', I18n.t('time_interval_less_24'), [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else {
            this.selectTime = this.state.selectTime;
            this.start_time = this.state.start_time,
                this.end_time = this.state.end_time,
                this.setState({ isShow: false });
            this.refresh();
        }
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps)(HistoryTracks);