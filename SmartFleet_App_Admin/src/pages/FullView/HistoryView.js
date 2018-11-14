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
import SearchView from '../../widget/SearchView';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';
import moment from 'moment';
import styles from '../../styles/FullView/historyStyle';
import siftStyle from '../../styles/siftViewStyle';
import ChartView from '../../widget/react-native-highcharts';

const timeLabel = ['', I18n.t('common.this_day'), I18n.t('common.this_week'), I18n.t('common.this_month'), I18n.t('common.this_year')]
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
        this.state = {
            tabNames: [I18n.t('detail.history_track'), I18n.t('detail.history_data')],
            tabImages: [Images.other_track, Images.other_history_data],
            tabSelectImages: [Images.other_track_select, Images.other_history_data_select],
            isShow: true,
            selectTime: 1,
            start_time: ihtool.getDateBegain(moment().format()),
            end_time: ihtool.getDateEnd(moment().format()),
        }
    }
    componentDidMount() {

    }
    onSubmitEditing(evt) {

    }
    selectAlarmType(value) {
        this.setState({ selectTime: value });
    }
    getTimeLabel(value) {
        let lable = '';
        if (value == 0) {
            lable = '23121312';
        } else {
            lable = timeLabel[value];
        }
        return lable;
    }
    render() {
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
                        <Text>sdlfjlsdkjf</Text>
                    </View>
                    <View tabLabel={I18n.t('detail.history_data')} style={styles.body}>
                        <Text>983247892374</Text>
                    </View>
                </ScrollableTabView>
                {
                    this.state.isShow ?
                        <View style={styles.siftView}>
                            <ScrollView style={siftStyle.backgroundView}>
                                <View style={siftStyle.bodyView}>
                                    <Text style={siftStyle.title}>{I18n.t('select_time')}</Text>
                                    <View style={siftStyle.wrapView}>
                                        <TouchableOpacity style={this.state.selectTime == 1 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(1)}>
                                            <Text style={this.state.selectTime == 1 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[1]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.selectTime == 2 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(2)}>
                                            <Text style={this.state.selectTime == 2 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[2]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.selectTime == 3 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(3)}>
                                            <Text style={this.state.selectTime == 3 ? siftStyle.itemText_ : siftStyle.itemText}>{timeLabel[3]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={this.state.selectTime == 4 ? siftStyle.itemView_ : siftStyle.itemView} activeOpacity={0.6} onPress={() => this.selectAlarmType(4)}>
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
                                            mode="date"
                                            placeholder={I18n.t('select_start_time')}
                                            format="YYYY-MM-DD"
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
                                            mode="date"
                                            placeholder={I18n.t('select_end_time')}
                                            format="YYYY-MM-DD"
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
    siftBtnAction() {
        if (this.state.isShow) {
            this.setState({ isShow: false });
        } else {
            this.setState({ isShow: true });
        }
    }
    resetAction() {

    }
    confirmAction() {

    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.historyView.isLoading,
    }
}
export default connect(mapStateToProps)(HistoryView);