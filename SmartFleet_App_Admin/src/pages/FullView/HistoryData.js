import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from '../../routes/dva';
import LoadingView from "../../widget/LoadingView";
import NoDataView from '../../widget/NoDataView';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import ihtool from '../../utils/ihtool';
import moment from 'moment';
import styles from '../../styles/FullView/historyStyle';
import siteDetailStyle from '../../styles/FullView/siteDetailStyle';
import siftStyle from '../../styles/siftViewStyle';
import ChartView from '../../widget/react-native-highcharts';

const timeLabel = ['', I18n.t('common.this_day'), I18n.t('common.this_week'), I18n.t('common.this_month'), I18n.t('common.this_year')]
const names = [I18n.t('worktime_duraction'), I18n.t('fuel_distance'), I18n.t('detail.temperature'), I18n.t('detail.braking_sign')]

class HistoryData extends Component {
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
            btnSelect: 0,
            state: 0,

        }
    }
    componentDidMount() {
        this.props.dispatch(createAction('historyData/updateState')({
            start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            isLoading: false,
            loadData: false,
            loadtrend: false,
            statistics: {},
            events: [],
            selectTime: 1,
            speedData: [],
            timeData: [],
            distanceData: [],
            working_duration: [],
        }));
        this.refresh();
    }
    refresh() {
        this.props.dispatch(createAction('historyData/getStatistics')({
            begin: moment(this.state.start_time).valueOf(),
            end: moment(this.state.end_time).valueOf(),
            plateNo: this.state.item.plateNo,
            queryType: 1,
        }));
        // this.props.dispatch(createAction('historyData/getAlerts')({
        //     cursor: 0,
        //     limit: 15,
        //     body: {
        //         begin: moment(this.state.start_time).utc().format(),
        //         end: moment(this.state.end_time).utc().format(),
        //         plateNo: this.state.item.plateNo,
        //         queryType: 1,
        //     }
        // }));
        this.getTrendData(this.state.btnSelect);
    }
    getTrendData(value) {
        this.props.dispatch(createAction('historyData/getSiteTrend')({
            plateNo: this.state.item.id,
            metric: 'location_data',
            fields: value == 1 ? 'fuel,distance' : 'working_duration,distance',
            start: moment(this.state.start_time).utc().format(),
            end: moment(this.state.end_time).utc().format(),
            interval: 3600,
            function: 'max'
        }))
    }
    selectDate(value) {
        let start_time = '';
        if (value == 1) {
            start_time = moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss');
        } else if (value == 2) {
            start_time = moment(moment().format('YYYY-MM-DD')).add(-7, 'days').format('YYYY-MM-DD HH:mm:ss');
        } else if (value == 3) {
            start_time = moment(moment().format('YYYY-MM')).format('YYYY-MM-DD HH:mm:ss');
        } else if (value == 4) {
            start_time = moment(moment().format('YYYY-01')).format('YYYY-MM-DD HH:mm:ss');
        }
        this.setState({
            selectTime: value,
            start_time: start_time,
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
        } else {
            lable = timeLabel[value];
        }
        return lable;
    }
    getSeries(data) {
        let text1 = I18n.t('dashboard.worktime');
        let text2 = I18n.t('dashboard.travlled_distance');

        if (this.state.btnSelect == 1) {
            text1 = I18n.t('detail.fuel_expend');
            text2 = I18n.t('historyTack.mileage');
        }

        const xAxis = [{
            categories: this.props.timeData,
            crosshair: true,
            type: 'datetime'
        }];
        const yAxis = [{
            title: {
                text: text1 + (this.state.btnSelect == 0 ? ' (s)' : ' (L)'),
                style: { color: '#1E90FF' }
            },
        }, {
            title: {
                text: text2 + ' (km)',
                style: { color: '#1cc593' },
            },
            opposite: true,
        }];
        const serieses = [{
            name: text1,
            type: 'column',
            data: this.props.working_duration,
        }, {
            name: text2,
            type: 'column',
            yAxis: 1,
            data: this.props.distanceData,
        }];
        return ihtool.getConfDouble(xAxis, yAxis, serieses);
    }
    getEventItems(items) {
        if (items && items.length > 0) {
            return items.map((item, index) =>
                <View style={styles.recordView} key={index}>
                    <View style={styles.recordLeftView}>
                        <Image style={styles.recordImage} source={Images.other_ico_planning} />
                        {
                            index + 1 == items.length ? <View /> :
                                <View style={styles.recordLine} />
                        }
                    </View>
                    <View style={styles.recordRightView}>
                        <View style={styles.recordTimeView}>
                            <Text style={styles.recordTime}>{moment().format('YYYY-MM-DD HH:mm')}</Text>
                        </View>
                        <Text style={styles.recordMsg}>{'更换左轮'}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <TouchableOpacity disabled={this.props.isLoading} style={styles.nodataView_} activeOpacity={0.6} onPress={() => this.refresh()} >
                    {
                        <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                    }
                </TouchableOpacity>
            );
        }
    }
    render() {
        const conf = this.getSeries();
        const statistics = this.props.statistics || {};
        return (
            <View style={styles.container}>
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
                        <View style={[siteDetailStyle.bodyItemView, { paddingTop: 0 }]}>
                            <View style={siteDetailStyle.detailView}>
                                <View style={siteDetailStyle.detailItemView}>
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'累计里程' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.distance, true) + ' 千米'}</Text>
                                        </View>
                                    </View>
                                    <View style={siteDetailStyle.line_vertical} />
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'累计时长' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.duration, true) + ' 小时'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={siteDetailStyle.line_horizontal} />

                                <View style={siteDetailStyle.detailItemView}>
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'出勤天数' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.working) + ' 天'}</Text>
                                        </View>
                                    </View>
                                    <View style={siteDetailStyle.line_vertical} />
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'累计油耗' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.fuelConsumption, true) + ' 升'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={siteDetailStyle.line_horizontal} />

                                <View style={siteDetailStyle.detailItemView}>
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'保养次数' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.maintainCount) + ' 次'}</Text>
                                        </View>
                                    </View>
                                    <View style={siteDetailStyle.line_vertical} />
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'违规驾驶' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.illegal) + ' 次'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={siteDetailStyle.line_horizontal} />

                                <View style={siteDetailStyle.detailItemView}>
                                    <View style={styles.detailItem}>
                                        <View style={siteDetailStyle.detailLabelView}><Text style={siteDetailStyle.detailLabel}>{'疑似事故' + ': '}</Text></View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={siteDetailStyle.message}>{ihtool.placeholderStr(statistics.accident) + ' 次'}</Text>
                                        </View>
                                    </View>
                                    <View style={siteDetailStyle.line_vertical} />
                                    <View style={styles.detailItem}>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={siteDetailStyle.bodyItemView}>
                            <View style={styles.trendTitleView}>
                                <TouchableOpacity style={styles.btnView} disabled={this.props.loadtrend} activeOpacity={0.6} onPress={() => this.btnAction(0)}>
                                    <View style={this.state.btnSelect == 0 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.btnSelect == 0 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('worktime_duraction')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnView} disabled={this.props.loadtrend} activeOpacity={0.6} onPress={() => this.btnAction(1)}>
                                    <View style={this.state.btnSelect == 1 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.btnSelect == 1 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{I18n.t('fuel_distance')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={siteDetailStyle.line} />
                            <View style={siteDetailStyle.chartView} >
                                <ChartView style={{ flex: 1 }} config={conf} more={true} stock={false}></ChartView>
                            </View>
                        </View>

                        <View style={siteDetailStyle.bodyItemView}>
                            <View style={styles.trendTitleView}>
                                <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.changeType(0)}>
                                    <View style={this.state.state == 0 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.state == 0 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{'维修保养记录'}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.changeType(1)}>
                                    <View style={this.state.state == 1 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.state == 1 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{'加油记录'}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.changeType(2)}>
                                    <View style={this.state.state == 2 ? styles.btn : styles.btn_}>
                                        <Text style={this.state.state == 2 ? siteDetailStyle.btnTitle : siteDetailStyle.btnTitle_}>{'事故记录'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={siteDetailStyle.line} />
                            <View style={styles.recordTitleView}>
                                <Image style={styles.recordImage} source={Images.other_ico_planning}></Image>
                                <View style={styles.recordLable}>
                                    <Text style={siteDetailStyle.btnTitle_}>{'计划中'}</Text>
                                </View>
                                <Image style={styles.recordImage} source={Images.other_ico_process}></Image>
                                <View style={styles.recordLable}>
                                    <Text style={siteDetailStyle.btnTitle_}>{'正在进行'}</Text>
                                </View>
                                <Image style={styles.recordImage} source={Images.other_ico_complete}></Image>
                                <View style={styles.recordLable}>
                                    <Text style={siteDetailStyle.btnTitle_}>{'已完成'}</Text>
                                </View>
                            </View>
                            <View style={[siteDetailStyle.line, { marginBottom: 12 }]} />
                            {
                                this.getEventItems(this.props.events)
                            }
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
                                        <TouchableOpacity style={this.state.selectTime == 1 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectDate(1)}>
                                            <Text style={this.state.selectTime == 1 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[1]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.selectTime == 2 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectDate(2)}>
                                            <Text style={this.state.selectTime == 2 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[2]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.selectTime == 3 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectDate(3)}>
                                            <Text style={this.state.selectTime == 3 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[3]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.selectTime == 4 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectDate(4)}>
                                            <Text style={this.state.selectTime == 4 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[4]}</Text>
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
        this.getTrendData(value);
    }
    siftBtnAction() {
        if (this.state.isShow) {
            this.setState({
                isShow: false,
                selectTime: this.props.selectTime,
                start_time: this.props.start_time,
                end_time: this.props.end_time,
            });
        } else {
            this.setState({
                isShow: true,
                selectTime: this.props.selectTime,
                start_time: this.props.start_time,
                end_time: this.props.end_time,
            });
        }
    }
    resetAction() {
        this.setState({
            selectTime: 0,
            start_time: moment(ihtool.getDateBegain(new Date())).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(ihtool.getDateEnd(new Date())).format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    confirmAction() {
        if (moment(this.state.end_time).unix() - moment(this.state.start_time).unix() <= 0) {
            Alert.alert('', I18n.t('start_must_earlier_end'), [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else {
            this.props.dispatch(createAction('historyData/updateState')({
                selectTime: this.state.selectTime,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
            }));
            this.setState({ isShow: false });
            this.refresh();
        }
    }
}
function mapStateToProps(state) {
    return {
        loadtrend: state.historyData.loadtrend,
        isLoading: state.historyData.isLoading,
        isLoad: state.historyData.isLoad,
        statistics: state.historyData.statistics,
        events: state.historyData.events,
        start_time: state.historyData.start_time,
        end_time: state.historyData.end_time,
        selectTime: state.historyData.selectTime,
        speedData: state.historyData.speedData,
        timeData: state.historyData.timeData,
        distanceData: state.historyData.distanceData,
        working_duration: state.historyData.working_duration,
    }
}
export default connect(mapStateToProps)(HistoryData);