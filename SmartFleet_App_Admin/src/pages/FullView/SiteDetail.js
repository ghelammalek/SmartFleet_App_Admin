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

const names = [I18n.t('detail.speed'), I18n.t('detail.voltage'), I18n.t('detail.temperature'), I18n.t('detail.braking_sign')]
const units = ['km/h', 'v', '℃', ''];
class SiteDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('car_detail'),
        headerBackTitle: null,
        headerRight: <NavBarBtn title={I18n.t('detail.history_data')} titleStyle={styles.navBarTitle} onPress={() => navigation.state.params.navAction()} />
    });
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.item.plateNo,
            location: this.props.navigation.state.params.item.location,
            item: this.props.navigation.state.params.item,
            mayType: MapTypes.NORMAL,
            zoom: 6,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            address: '',
            btnSelect: 1,
        };
    }
    componentDidMount() {
        this.getAddress(this.state.location.y, this.state.location.x);
        this.props.navigation.setParams({ navAction: this.navAction.bind(this) });
        this.getAllData();
    }
    getAddress(latitude, longitude) {
        Geolocation.reverseGeoCode(latitude, longitude)
            .then(data => {
                this.setState({ address: data.address });
            })
            .catch(e => {
                console.log(e, 'error');
            })
    }
    getAllData() {
        let marker = {};
        let center = {};
        if (this.state.location) {
            marker = {
                longitude: this.state.location.x,
                latitude: this.state.location.y,
                title: this.state.title
            };
            center = {
                longitude: this.state.location.x,
                latitude: this.state.location.y,
            };
        }
        // console.log(marker);
        this.props.dispatch(createAction('siteDetail/updateState')({
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
            isLoading: false,
            marker: marker,
            center: center,
        }));
        this.props.dispatch(createAction('siteDetail/getStatistics')({ queryType: '1', plateNo: this.state.title }));
        this.props.dispatch(createAction('siteDetail/getAlerts')({
            cursor: 0,
            limit: 1,
            body: {
                end: moment().add(1, 'days').utc().format(),
                moduleName: this.state.title,
            }
        }));
        this.props.dispatch(createAction('siteDetail/getSiteDetail')({ plateNo: this.state.title }));
        this.props.dispatch(createAction('siteDetail/getSiteData')({ mid: this.state.item.id }));

    }
    navAction() {
        // alert('sfsdf');
    }
    pushEventDetail(item) {
        // this.props.navigation.navigate('EventDetail', { item: item, callback: (backdata) => { } });
        this.props.navigation.navigate('EventDetail', {
            item: item,
            callback: (backdata) => {
                this.props.dispatch(createAction('events/updateState')({ event: [backdata] }));
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
                    <Image style={styles.eventImage} source={ihtool.getEventLevelImage(item.level)} />
                    <Text style={styles.message} >{ihtool.getEventDesc(item)}</Text>
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
        const name = names[this.state.btnSelect - 1];
        const unit = units[this.state.btnSelect - 1];
        if (this.state.btnSelect == 1) {
            serieses.push({
                type: 'area',
                name: name,
                data: [[1541561406000, 43], [1541561407000, 34], [1541561408000, 43], [1541561409000, 33], [1541561410000, 55]],
                lineWidth: 1,
            });
        } else {
            serieses.push({
                type: 'area',
                name: name,
                data: [],
                lineWidth: 1,
            });
        }
        return ihtool.getConf(serieses, unit);
    }
    render() {
        const conf = this.getSeries();
        const statistics = ihtool.getStatistics(this.props.statistics);
        const { siteData } = this.props;
        const { metrics } = siteData;
        const { iot_data, location_data } = metrics;
        const { odo_meter, water_temp, fuel_meter, fuel_capacity, speed, rpm, break_state } = iot_data;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.topItemView} activeOpacity={0.6} onPress={() => this.pushCarInfoView()}>
                    <Text style={styles.topTitle}>{this.state.title}</Text>
                    <Image style={styles.topImage} source={Images.other_right} />
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
                        <View style={styles.addressView}>
                            <View style={styles.row_left}>
                                <Image source={Images.other_location} style={styles.markImage} />
                                <Text numberOfLines={1} style={styles.message}>{this.state.address}</Text>
                            </View>
                            <View style={styles.row_right}>
                                <Text style={styles.weatherValue}>{'15°'}</Text>
                                <Image source={Images.weather_fine} style={styles.weatherImage} />
                            </View>
                        </View>
                        <Text style={styles.message}>{'行驶中，正常，司机张三'}</Text>
                        {
                            this.getEventItem(this.props.event)
                        }
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
                        <View style={styles.detailView}>
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.odometer') + '：'}</Text>
                                    <Text style={styles.message}>{(isEmpty(odo_meter) ? '--' : ihtool.changeNum(odo_meter)) + 'km'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('detail.environment_temperature') + '：'}</Text>
                                    <Text style={styles.message}>{ihtool.placeholderStr(water_temp) + '℃'}</Text>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.fuel_residue') + '：'}</Text>
                                    <Text style={styles.message}>{ihtool.placeholderStr(fuel_meter) + '%'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.current_speed') + '：'}</Text>
                                    <Text style={styles.message}>{ihtool.placeholderStr(speed) + 'km/h'}</Text>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.engine_RPM') + '：'}</Text>
                                    <Text style={styles.message}>{ihtool.placeholderStr(rpm) + 'rpm'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.voltage') + '：'}</Text>
                                    <Text style={styles.message}>{'48v'}</Text>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.brake_state') + '：'}</Text>
                                    <Text style={styles.message}>{break_state == 0 ? I18n.t('vehicle.on') : I18n.t('vehicle.off')}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.brake_fluid_level') + '：'}</Text>
                                    <Text style={styles.message}>{'45%'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyItemView}>
                        <View style={styles.trendTitleView}>
                            <TouchableOpacity style={styles.btnView} activeOpacity={0.6} onPress={() => this.btnAction(1)}>
                                <View style={this.state.btnSelect == 1 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 1 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.speed')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnView} activeOpacity={0.6} onPress={() => this.btnAction(2)}>
                                <View style={this.state.btnSelect == 2 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 2 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.voltage')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnView} activeOpacity={0.6} onPress={() => this.btnAction(3)}>
                                <View style={this.state.btnSelect == 3 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 3 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.temperature')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnView} activeOpacity={0.6} onPress={() => this.btnAction(4)}>
                                <View style={this.state.btnSelect == 4 ? styles.btn : styles.btn_}>
                                    <Text style={this.state.btnSelect == 4 ? styles.btnTitle : styles.btnTitle_}>{I18n.t('detail.braking_sign')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.moreView} activeOpacity={0.6} onPress={() => this.more()}>
                                <Text style={styles.more}>{I18n.t('common.more')}</Text>
                                <Image style={styles.moreBtn} source={Images.other_right} />
                            </TouchableOpacity>
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

    }
    btnAction(value) {
        this.setState({ btnSelect: value });
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.siteDetail.isLoading,
        statistics: state.siteDetail.statistics,
        event: state.siteDetail.event,
        siteDetail: state.siteDetail.siteDetail,
        siteData: state.siteDetail.siteData,
        speedData: state.siteData.speedData,
        marker: state.siteDetail.marker,
        center: state.siteDetail.center,
    }
}
export default connect(mapStateToProps)(SiteDetail);