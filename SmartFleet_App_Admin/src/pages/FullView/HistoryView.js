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
import ChartView from '../../widget/react-native-highcharts';

const timeLabel = ['', I18n.t('common.this_day'), I18n.t('custom'), I18n.t('common.this_month'), I18n.t('common.this_year')]
const names = [I18n.t('speed'), I18n.t('worktime_duraction'), I18n.t('detail.temperature'), I18n.t('detail.braking_sign')]
const units = ['km/h', 'v', '℃', ''];
const params = ['speed', '', '', ''];
class HistoryView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('common.history'),
        headerBackTitle: null,
        headerStyle: {
            borderBottomWidth: 0,
        },
    });
    constructor(props) {
        super(props);
        const item = this.props.navigation.state.params.item;
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
            custom_time: '',
            btnSelect: 1,
            state: 1,

        }
    }
    componentDidMount() {
        this.props.dispatch(createAction('historyView/getAlerts')({
            start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            isLoading: false,
            loadData: false,
            statistics: {},
            events: [],
            siteData: {
                metrics: {
                    iot_data: {},
                    location_data: {}
                }
            },
            siteDetail: {},
            speedData: [],
            marker: {

            },
            center: {
                longitude: 116.981718,
                latitude: 39.542449
            },
        }));
        this.refreshEvents();
    }

    onSubmitEditing(evt) {

    }
    refresh() {

    }
    refreshEvents() {
        this.props.dispatch(createAction('historyView/getAlerts')({
            cursor: 0,
            limit: 15,
            body: {
                begin: moment(this.state.start_time).utc().format(),
                end: moment(this.state.end_time).utc().format(),
                labels: {
                    code: 'driving',
                },
                mid: this.state.item.id,
            }
        }));
    }
    selectTimeType(value) {
        this.setState({ selectTime: value });
    }
    getTimeLabel(value) {
        let lable = '';
        if (value !== 1) {
            lable = moment(this.state.start_time).format('MM-DD HH:mm') + ' ~ ' + moment(this.state.end_time).format('MM-DD HH:mm');
        } else {
            lable = timeLabel[value];
        }
        return lable;
    }
    getSeries() {
        var serieses = [];
        const name = names[this.state.btnSelect - 1];
        const unit = units[this.state.btnSelect - 1];
        let data = [];
        for (let i = 0; i < 10000; i++) {
            const time = 1542106890000 + i * 60000;
            const value = Math.random() * 90;
            data.push([time, value]);
        }
        serieses.push({
            type: 'spline',
            name: name,
            data: data,
            lineWidth: 1,
        });
        return ihtool.getConf(serieses, unit);
    }
    getEventItems(items) {
        if (items && items.length > 0) {
            return items.map((item, index) =>
                <View style={styles.itemView} key={index}>
                    <View style={styles.itemStateView}>
                        <Image style={styles.itemImage} source={ihtool.getTrackTypeImage(item)} />
                    </View>
                    <View style={styles.itemTimeView}>
                        <Text style={styles.text14}>{moment(item.startsAt).format('YYYY-MM-DD HH:mm')}</Text>
                    </View>
                    <View style={styles.itemMesgView}>
                        <Text numberOfLines={2} style={styles.text14}>{ihtool.getEventDesc(item)}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <TouchableOpacity disabled={this.props.isLoading} style={styles.nodataView} activeOpacity={0.6} onPress={() => this.refreshEvents()} >
                    <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                </TouchableOpacity>
            );
        }
    }
    render() {
        const conf = this.getSeries();
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    locked={true}
                    renderTabBar={() =>
                        <TabBarTop
                            style={styles.TabBarTop}
                            tabNames={this.state.tabNames}
                            tabImages={this.state.tabImages}
                            tabSelectImages={this.state.tabSelectImages}
                            customView={() =>
                                <View style={styles.topView}>
                                    <Text style={styles.timeTitle}>{I18n.t('sift_time') + ': '}</Text>
                                    <TouchableOpacity
                                        style={styles.siftBtnView}
                                        onPress={() => this.siftBtnAction()}
                                        activeOpacity={0.6}
                                        disabled={this.props.isLoading}
                                    >
                                        <Text style={styles.timeLable}>{this.getTimeLabel(this.state.selectTime)}</Text>
                                        <Image style={styles.siftBtnImage} source={this.state.isShow ? Images.other_triangle_up_select : Images.other_triangle_down_select} />
                                    </TouchableOpacity>
                                </View>
                            }
                            changeTab={(value) => console.log(value)}
                        />
                    }
                >
                    <View tabLabel={I18n.t('etail.history_track')} style={styles.body}>
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
                                <View style={styles.trendTitleView}>
                                    <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.changeType(1)}>
                                        <View style={this.state.state == 1 ? styles.btn : styles.btn_}>
                                            <Text style={this.state.state == 1 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('historyTack.vehicle_state')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.changeType(2)}>
                                        <View style={this.state.state == 2 ? styles.btn : styles.btn_}>
                                            <Text style={this.state.state == 2 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('historyTack.history_tack')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={siteDetailStyle.line} />
                                {
                                    this.state.state == 1 ?
                                        <View>
                                            <View style={styles.statictView}>
                                                <View style={styles.statictItem}>
                                                    <View style={styles.statictItem}>
                                                        <View style={styles.statictPoint} />
                                                        <Text style={styles.text14_bold}>里程：</Text>
                                                        <Text style={styles.text14}>34.5公里</Text>
                                                    </View>
                                                    <View style={styles.statictItem}>
                                                        <View style={styles.statictPoint} />
                                                        <Text style={styles.text14_bold}>时间：</Text>
                                                        <Text style={styles.text14}>34小时</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.statictItem}>
                                                    <View style={styles.statictItem}>
                                                        <View style={styles.statictPoint} />
                                                        <Text style={styles.text14_bold}>告警：</Text>
                                                        <Text style={styles.text14}>4</Text>
                                                    </View>
                                                    <View style={styles.statictItem}>
                                                        <View style={styles.statictPoint} />
                                                        <Text style={styles.text14_bold}>违规驾驶行为：</Text>
                                                        <Text style={styles.text14}>0</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.eventView}>
                                                <View style={styles.itemView_}>
                                                    <View style={styles.itemStateView_}>
                                                        <Text style={styles.text14_bold}>状态</Text>
                                                    </View>
                                                    <View style={styles.itemTimeView_}>
                                                        <Text style={styles.text14_bold}>时间</Text>
                                                    </View>
                                                    <View style={styles.itemMesgView_}>
                                                        <Text style={styles.text14_bold}>内容</Text>
                                                    </View>
                                                </View>
                                                {
                                                    this.getEventItems(this.props.events)
                                                }
                                            </View>
                                        </View> :
                                        <MapView
                                            trafficEnabled={false}
                                            baiduHeatMapEnabled={false}
                                            zoom={6}
                                            mapType={MapTypes.NORMAL}
                                            center={this.props.center}
                                            marker={this.props.marker}
                                            style={styles.mapView}
                                            onMapClick={(e) => {
                                            }}
                                        />
                                }
                            </View>
                            <View style={siteDetailStyle.bodyItemView}>
                                <View style={styles.trendTitleView}>
                                    <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.btnAction(1)}>
                                        <View style={this.state.btnSelect == 1 ? styles.btn : styles.btn_}>
                                            <Text style={this.state.btnSelect == 1 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('speed')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.btnAction(2)}>
                                        <View style={this.state.btnSelect == 2 ? styles.btn : styles.btn_}>
                                            <Text style={this.state.btnSelect == 2 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('worktime_duraction')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={siteDetailStyle.line} />
                                <View style={siteDetailStyle.chartView} >
                                    <ChartView style={{ flex: 1 }} config={conf} stock={true}></ChartView>
                                </View>
                            </View>
                            <View style={{ height: 20 }} />
                        </ScrollView>
                    </View>
                    <View tabLabel={I18n.t('detail.history_data')} style={styles.body}>
                        <Text></Text>
                    </View>
                </ScrollableTabView>
                {
                    this.state.isShow ?
                        <View style={styles.siftView}>
                            <ScrollView style={siftStyle.backgroundView} bounces={false}>
                                <View style={siftStyle.bodyView}>
                                    <Text style={siftStyle.title}>{I18n.t('select_time')}</Text>
                                    <View style={siftStyle.wrapView}>
                                        <TouchableOpacity style={this.state.selectTime == 1 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectTimeType(1)}>
                                            <Text style={this.state.selectTime == 1 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[1]}</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity style={this.state.selectTime == 2 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectTimeType(2)}>
                                            <Text style={this.state.selectTime == 2 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[2]}</Text>
                                        </TouchableOpacity> */}
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
                                            onDateChange={(date) => { this.setState({ start_time: date, selectTime: 0 }); }}
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
                                            onDateChange={(date) => { this.setState({ end_time: date, selectTime: 0 }); }}
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
        )
    }
    changeType(value) {
        this.setState({ state: value })
    }
    btnAction(value) {
        this.setState({ btnSelect: value });
    }
    siftBtnAction() {
        if (this.state.isShow) {
            this.setState({
                isShow: false,
                start_time: this.props.start_time,
                end_time: this.props.end_time,
            });
        } else {
            this.setState({
                isShow: true,
                start_time: this.props.start_time,
                end_time: this.props.end_time,
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
        if (moment(this.state.end_time).unix() - moment(this.state.start_time).unix() > 3600 * 24) {
            Alert.alert('', I18n.t('time_interval_less_24'), [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else {
            this.props.dispatch(createAction('historyView/updateState')({
                start_time: this.state.start_time,
                end_time: this.state.end_time,
            }));
            this.setState({ isShow: false });
            this.refreshEvents();
        }
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.historyView.isLoading,
        events: state.historyView.events,
        marker: state.historyView.marker,
        center: state.historyView.center,
        start_time: state.historyView.start_time,
        end_time: state.historyView.end_time,
    }
}
export default connect(mapStateToProps)(HistoryView);