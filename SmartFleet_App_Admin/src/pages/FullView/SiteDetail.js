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
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { connect } from '../../routes/dva';
import NavigationBar from '../../widget/NavigationBar';
import NavBarBtn from '../../widget/NavBarBtn';
import LoadingView from '../../widget/LoadingView';
import moment from 'moment';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';
import styles from '../../styles/FullView/siteDetailStyle';
import homeStyle from '../../styles/Home/homeStyle';
import ChartView from '../../widget/react-native-highcharts';

const units = ['km/h', 'v', '℃', ''];
const params = ['speed', '', '', ''];
class SiteDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('car_detail'),
        headerBackTitle: null,
        headerRight: <NavBarBtn title={I18n.t('detail.history_data')} titleStyle={styles.navBarTitle} onPress={() => navigation.state.params.navAction()} />,
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
            mayType: MapTypes.NORMAL,
            zoom: 15,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            marker: {},
            address: '',
            btnSelect: 1,
            isUnflod: false,
            isTime: false,
            isMap: true,
            isLoading: false,
        };
        this.names = [I18n.t('detail.speed'), I18n.t('detail.voltage'), I18n.t('detail.temperature'), I18n.t('detail.braking_sign')]

    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.props.dispatch(createAction('siteDetail/updateState')({
            isLoading: false,
            isLoading: false,
            loadData: false,
            statistics: {},
            event: [],
            siteData: {
                metrics: {
                    iot_data: {},
                    location_data: {}
                }
            },
            siteDetail: {},
            speedData: [],
            marker: null,
            center: null,
        }));
    }
    componentDidMount() {
        // this.getAddress(this.state.location.y, this.state.location.x);
        this.props.navigation.setParams({ navAction: this.navAction.bind(this) });
        this.getAllData();
        this.timer = setInterval(() => {
            this.getAllData();
        }, 60000);
    }
    //地理编码获取详细地址
    getAddress(latitude, longitude) {
        this.setState({ isMap: true });
        Geolocation.reverseGeoCode(latitude, longitude)
            .then(data => {
                this.setState({ isMap: false, address: data.address });
            })
            .catch(e => {
                this.setState({ isMap: false });
                console.log(e, 'error');
            })
    }
    getAllData() {
        this.props.dispatch(createAction('siteDetail/updateState')({
            isLoading: false,
        }));
        this.props.dispatch(createAction('siteDetail/getStatistics')({ queryType: '1', plateNo: this.state.title }));
        this.props.dispatch(createAction('siteDetail/getAlerts')({
            cursor: 0,
            limit: 1,
            body: {
                end: moment().add(1, 'day').utc().format(),
                labels: {
                    site_name: this.state.title,
                }
            }
        }));
        this.props.dispatch(createAction('siteDetail/getSiteDetail')({ plateNo: this.state.title }));
        this.props.dispatch({
            type: 'siteDetail/getSiteData',
            payload: {
                mid: this.state.item.id
            },
            onSuccess: (location) => {
                if (location.latitude && location.longitude) {
                    this.setState({ marker: location });
                    this.getAddress(location.latitude, location.longitude);
                } else {
                    this.setState({ isMap: false });
                }
            },
            onFailed: () => {
                this.setState({ isMap: false });
            }
        })
        const fields = params[this.state.btnSelect - 1];
        this.props.dispatch(createAction('siteDetail/getSiteTrend')({
            plateNo: this.state.item.id,
            metric: 'iot_data',
            fields: fields,
            start: moment().add(-24, 'hour').utc().format(),
            end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
            interval: 60,
            function: 'max'
        }))

    }
    navAction() {
        this.props.navigation.navigate('HistoryView', { item: this.state.item });
    }
    pushEventDetail(item) {
        // this.props.navigation.navigate('EventDetail', { item: item, callback: (backdata) => { } });
        this.props.navigation.navigate('EventDetail', {
            item: item,
            callback: (backdata) => {
                this.props.dispatch(createAction('siteDetail/updateState')({ event: [backdata] }));
            }
        });
    }
    pushCarInfoView() {

    }
    refresh() {
        this.getAllData();
    }
    getEventItem(items) {
        if (items && items.length > 0) {
            const item = items[0];
            return (
                <TouchableOpacity style={styles.eventItemView} disabled={this.props.isLoading} activeOpacity={0.6} onPress={() => this.pushEventDetail(item)} >
                    <Image style={styles.eventImage} source={ihtool.getEventDetailImage(item)} />
                    <Text style={styles.message_} >{ihtool.getEventDesc(item)}</Text>
                    <Text style={styles.eventTime} >{ihtool.getSimpleDate(item.startsAt)}</Text>
                    <Image style={styles.eventRightImage} source={Images.other_right} />
                </TouchableOpacity>
            )
        } else {
            return <View />;
        }
    }
    getSeries() {
        var serieses = [];
        const name = this.names[this.state.btnSelect - 1];
        const unit = units[this.state.btnSelect - 1];
        // if (this.state.btnSelect == 1) {
        serieses.push({
            type: 'spline',
            name: name,
            dataGrouping: {
                enabled: false,
            },
            data: this.props.speedData,
            lineWidth: 1,
        });
        return ihtool.getConf(serieses, unit);
    }
    pushBigMapView() {
        this.props.navigation.navigate('SiteBigMap', {
            title: this.state.title,
            center: this.props.center,
            marker: {
                title: this.state.address,
                longitude: this.props.marker.longitude,
                latitude: this.props.marker.latitude,
            },
        });
    }
    render() {
        const conf = this.getSeries();
        const statistics = ihtool.getStatistics(this.props.statistics);
        const { siteData } = this.props;
        const { metrics } = siteData || {};
        const { iot_data, location_data } = metrics || {};
        // const { odo_meter, water_temp, fuel_meter, fuel_capacity, speed, rpm, break_state } = iot_data;
        return (
            <View style={styles.container}>
                <TouchableOpacity disabled={true} style={styles.topItemView} activeOpacity={0.6} onPress={() => this.pushCarInfoView()}>
                    <Text style={styles.topTitle}>{this.state.title}</Text>
                    {/* <Image style={styles.topImage} source={Images.other_right} /> */}
                </TouchableOpacity>
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
                                    <Text style={homeStyle.static_title}>{statistics.working}</Text>
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
                            <Image style={homeStyle.static_image} source={Images.home_illegal} />
                            <View style={homeStyle.static_titleView}>
                                <Text style={homeStyle.static_sunTitle}>{I18n.t('dashboard.day_illegal_drive')}</Text>
                                <View style={homeStyle.static_subView}>
                                    <Text style={homeStyle.static_title}>{statistics.illegal}</Text>
                                    <Text style={homeStyle.static_sunTitle}>{I18n.t('common.times')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyItemView}>
                        {/* <View style={styles.addressView}>
                            <View style={styles.row_left}>
                                <Image source={Images.other_location} style={styles.markImage} />
                                <Text numberOfLines={1} style={styles.message_}>{this.state.address}</Text>
                            </View>
                            <View style={styles.row_right}>
                                <Text style={styles.weatherValue}>{'15°'}</Text>
                                <Image source={Images.weather_fine} style={styles.weatherImage} />
                            </View>
                        </View>
                        <Text style={styles.message_}>{'行驶中，正常，司机张三'}</Text> */}
                        {
                            this.getEventItem(this.props.event)
                        }
                        <View style={styles.mapView}>
                            <MapView
                                trafficEnabled={false}
                                baiduHeatMapEnabled={false}
                                zoom={15}
                                mapType={MapTypes.NORMAL}
                                center={this.props.center}
                                marker={this.props.marker}
                                style={{ flex: 1 }}
                                onMapClick={(e) => {
                                }}
                            />
                            {
                                this.state.isMap ? <View /> :
                                    <View style={styles.mapMsgView}>
                                        <View style={styles.mapMsg}>
                                            <Text style={styles.message}>{this.state.address}</Text>
                                        </View>
                                        <View style={styles.mapArrow} />
                                    </View>
                            }
                            <TouchableOpacity style={styles.mapBtn}
                                onPress={() => this.pushBigMapView()}
                                activeOpacity={0.6}
                                disabled={this.state.isMap}
                            >
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.timeView}
                            onPress={() => { this.setState({ isTime: !this.state.isTime }) }}
                        >
                            <View style={styles.space} />
                            <Text style={styles.time}>
                                {
                                    this.state.isTime ? ihtool.changeDateFormat(iot_data.timestamp) :
                                        ihtool.getSimpleDate_(iot_data.timestamp)
                                }
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.detailView}>
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_speed') + ':'}</Text></View>
                                    <View style={styles.messageView_}>
                                        <Text style={styles.message}>{ihtool.placeholderStr(iot_data.speed) + 'km/h'}</Text>
                                    </View>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_rpm') + ':'}</Text></View>
                                    <View style={styles.messageView_}>
                                        <Text style={styles.message}>{ihtool.placeholderStr(iot_data.rpm, true) + 'rpm'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_fuel_level') + ':'}</Text></View>
                                    <View style={styles.messageView_}>
                                        <Text style={styles.message}>{ihtool.placeholderStr(iot_data.fuel_level, true) + '%'}</Text>
                                    </View>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_engine_load') + ':'}</Text></View>
                                    <View style={styles.messageView_}>
                                        <Text style={styles.message}>{ihtool.placeholderStr(iot_data.engine_load, true) + '%'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_brake_switch') + ':'}</Text></View>
                                    <View style={styles.messageView_}>
                                        <Text style={styles.message}>{ihtool.placeholderStr(iot_data.brake_switch)}</Text>
                                    </View>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_parking_switch') + ':'}</Text></View>
                                    <View style={styles.messageView_}>
                                        <Text style={styles.message}>{ihtool.placeholderStr(iot_data.parking_switch)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            {
                                this.state.isUnflod ?
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_steering_wheel_angle') + ':'}</Text></View>
                                                <View style={styles.messageView_}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.steering_wheel_angle, true)}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.line_vertical} />
                                            <View style={styles.detailItem}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_dtcs') + ':'}</Text></View>
                                                <View style={styles.messageView_}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.dtcs)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_mil') + ':'}</Text></View>
                                                <View style={styles.messageView_}>
                                                    <Text style={styles.message}>
                                                        {isEmpty(iot_data.mil) ? '--' : iot_data.mil == 1 ? 'on' : 'off'}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.line_vertical} />
                                            <View style={styles.detailItem}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_fuel_pressure') + ':'}</Text></View>
                                                <View style={styles.messageView_}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.fuel_pressure) + 'kPa'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_battery_volt') + ':'}</Text></View>
                                                <View style={styles.messageView_}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.battery_volt, true) + 'v'}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.line_vertical} />
                                            <View style={styles.detailItem}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_ambient_air_temp') + ':'}</Text></View>
                                                <View style={styles.messageView_}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.ambient_air_temp) + '℃'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_throttle_pos') + ':'}</Text></View>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.throttle_pos, true) + '%'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_coolant_temp') + ':'}</Text></View>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.coolant_temp) + '℃'}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_engine_oil_temp') + ':'}</Text></View>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.engine_oil_temp) + '℃'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_engine_start_time') + ':'}</Text></View>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.engine_start_time) + 'sec'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <View style={styles.detailLabelView}><Text style={styles.detailLabel}>{I18n.t('event_vin') + ':'}</Text></View>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.vin)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <Text style={styles.detailLabel}>{I18n.t('event_mil_activated_dist') + ':'}</Text>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.mil_activated_dist) + 'km'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <Text style={styles.detailLabel}>{I18n.t('event_dtc_cleared_dist') + ':'}</Text>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.dtc_cleared_dist) + 'km'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <Text style={styles.detailLabel}>{I18n.t('event_mil_activated_time') + ':'}</Text>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.mil_activated_time) + 'min'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                        <View style={styles.detailItemView}>
                                            <View style={styles.detailItem_}>
                                                <Text style={styles.detailLabel}>{I18n.t('event_dtc_cleared_time') + ':'}</Text>
                                                <View style={styles.messageView}>
                                                    <Text style={styles.message}>{ihtool.placeholderStr(iot_data.dtc_cleared_time) + 'min'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.line_horizontal} />
                                    </View> : <View />
                            }
                            <TouchableOpacity activeOpacity={0.6} onPress={() => { this.setState({ isUnflod: !this.state.isUnflod }) }} style={styles.unflodBtn} >
                                <Text style={styles.unflodBtnTitle}>{this.state.isUnflod ? I18n.t('event_hide') : I18n.t('event_unflod')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bodyItemView}>
                        <View style={styles.trendTitleView}>
                            <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.btnAction(1)}>
                                <View style={this.state.btnSelect == 1 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 1 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.speed')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.btnAction(2)}>
                                <View style={this.state.btnSelect == 2 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 2 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.voltage')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.btnAction(3)}>
                                <View style={this.state.btnSelect == 3 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 3 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.temperature')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnView} disabled={this.props.loadData} activeOpacity={0.6} onPress={() => this.btnAction(4)}>
                                <View style={this.state.btnSelect == 4 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 4 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.braking_sign')}</Text>
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.moreView} activeOpacity={0.6} onPress={() => this.more()}>
                                <Text style={styles.more}>{I18n.t('common.more')}</Text>
                                <Image style={styles.moreBtn} source={Images.other_right} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.line} />
                        <View style={styles.chartView} >
                            <ChartView style={{ flex: 1 }} config={conf} stock={true}></ChartView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    more() {
        // alert(typeof (true));
    }
    btnAction(value) {

        this.setState({ btnSelect: value });
        const fields = params[value - 1];

        this.props.dispatch(createAction('siteDetail/getSiteTrend')({
            plateNo: this.state.item.id,
            metric: 'iot_data',
            fields: fields,
            start: moment().add(-24, 'hour').utc().format(),
            end: moment(moment().format('YYYY-MM-DD HH:mm:ss.SSS')).utc().format(),
            interval: 60,
            function: 'max'
        }))
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.siteDetail.isLoading,
        statistics: state.siteDetail.statistics,
        event: state.siteDetail.event,
        siteDetail: state.siteDetail.siteDetail,
        siteData: state.siteDetail.siteData,
        speedData: state.siteDetail.speedData,
        marker: state.siteDetail.marker,
        center: state.siteDetail.center,
        loadData: state.siteDetail.loadData,
    }
}
export default connect(mapStateToProps)(SiteDetail);