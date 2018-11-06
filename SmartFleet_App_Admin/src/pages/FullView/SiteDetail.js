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

class SiteDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('car_detail'),
        headerBackTitle: null,
        headerRight: <NavBarBtn title={I18n.t('detail.history_data')} titleStyle={styles.navBarTitle} onPress={() => navigation.state.params.navAction()} />
    });
    constructor(props) {
        super(props);
        var location = this.props.navigation.state.params.item.location;
        var title = this.props.navigation.state.params.item.plateNo
        this.state = {
            title: title,
            mayType: MapTypes.NORMAL,
            zoom: 6,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            marker: {
                longitude: location.x,
                latitude: location.y,
                title: title
            },
            center: {
                longitude: location.x,
                latitude: location.y
            },
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({ navAction: this.navAction.bind(this) });
        this.getAllData();
    }
    getAllData() {
        this.props.dispatch(createAction('siteDetail/updateState')({
            statistics: {},
            event: [],
            isLoading: false,
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
    }
    navAction() {
        alert('sfsdf');
    }
    pushEventDetail(item) {
        this.props.navigation.navigate('EventDetail', { item: item });
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
    render() {
        const statistics = ihtool.getStatistics(this.props.statistics);
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
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    <Text numberOfLines={1} style={styles.message}>{'朝阳区望江科技附近朝阳区望江科技附近朝阳区望江科技附近朝阳区望江科技附近'}</Text>
                                </View>
                            </View>
                            <View style={styles.row_right}>
                                <Text style={styles.weatherValue}>{'24°'}</Text>
                                <Image source={Images.weather_fine} style={styles.weatherImage} />
                            </View>
                        </View>
                        <View style={{ flex: 1, margin: 3 }}>
                            <Text style={styles.message}>{'行驶中，正常，司机张三'}</Text>
                        </View>
                        {
                            this.getEventItem(this.props.event)
                        }
                        <MapView
                            trafficEnabled={this.state.trafficEnabled}
                            baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                            zoom={this.state.zoom}
                            mapType={this.state.mapType}
                            center={this.state.center}
                            marker={this.state.marker}
                            style={styles.mapView}
                            onMapClick={(e) => {
                            }}
                        />
                        <View style={styles.detailView}>
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.odometer') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('detail.environment_temperature') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.fuel_residue') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.current_speed') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.engine_RPM') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.voltage') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                            </View>
                            <View style={styles.line_horizontal} />
                            <View style={styles.detailItemView}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.brake_state') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                                <View style={styles.line_vertical} />
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{I18n.t('vehicle.brake_fluid_level') + '：'}</Text>
                                    <Text style={styles.message}>{'9666km'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyItemView}>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.siteDetail.isLoading,
        statistics: state.siteDetail.statistics,
        event: state.siteDetail.event,
        markers: state.siteDetail.markers,
        center: state.siteDetail.center,
    }
}
export default connect(mapStateToProps)(SiteDetail);