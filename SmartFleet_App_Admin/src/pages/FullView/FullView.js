import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
    FlatList,
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
import TabBarTop from "../../widget/TabBarTop";
import LoadingView from "../../widget/LoadingView";
import SearchView from '../../widget/SearchView';
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import styles from '../../styles/FullView/fullViewStyle';

class FullView extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: I18n.t('tab_cars'),
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 6,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            tabNames: [I18n.t('car_map'), I18n.t('car_list')],
            tabImages: [Images.other_map, Images.other_list],
            tabSelectImages: [Images.other_map_select, Images.other_list_select],
        };
    }
    componentDidMount() {
        this.props.dispatch(createAction('fullView/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('fullView/getSites')({}));
    }
    refresh() {
        this.props.dispatch(createAction('fullView/getSites')({}));
    }
    refresh_() {
        this.props.dispatch(createAction('fullView/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('fullView/getSites')({}));
    }
    _annotationClinck_(event) {
        var item = {};
        for (let i = 0; i < this.props.data.length; i++) {
            const site = this.props.data[i];
            if (site.plateNo === event.title) {
                item = site;
                break;
            }
        }
        this.props.navigation.navigate('SiteDetail', { item: item });
    }
    pushSiteDetailView(item) {
        this.props.navigation.navigate('SiteDetail', { item: item });
    }
    pushRegisterCarView() {
        this.props.navigation.navigate('RegisterCar', {
            callback: () => {
                this.props.dispatch(createAction('fullView/updateState')({ isLoading: true }));
                this.props.dispatch(createAction('fullView/getSites')({}));
            }
        });
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }
    _renderItem = (item) => {
        return (
            <TouchableOpacity disabled={this.props.isLoad} key={item.index} activeOpacity={0.6} onPress={() => this.pushSiteDetailView(item.item)} >
                <View style={styles.itemView}>
                    <View style={styles.itemTopView}>
                        <View style={styles.itemTopLeft}>
                            <Text style={styles.itemTitle} >{item.item.plateNo}</Text>
                        </View>
                        <View style={styles.itemTopRight}>
                            <Text style={styles.time} >{item.item.minutes + I18n.t('before_minutes')}</Text>
                            <Image style={styles.imgagRight} source={Images.other_right} />
                        </View>
                    </View>
                    <View style={styles.itemBodyView}>
                        <View style={styles.itemTextView}>
                            <Text style={styles.itemText} >{I18n.t('distance') + '：'}</Text>
                            <Text style={styles.itemText} >{item.item.distance + I18n.t('km')}</Text>
                        </View>
                        <View style={styles.itemTextView}>
                            <Text style={styles.itemText} >{I18n.t('duration') + '：'}</Text>
                            <Text style={styles.itemText} >{item.item.duration + I18n.t('hour')}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        var center = this.state.center;
        return (
            <View style={styles.container}>
                {/* <NavigationBar
                    title={I18n.t('tab_cars')}
                /> */}
                <ScrollableTabView
                    locked={true}
                    style={styles.tabbar}
                    renderTabBar={() =>
                        <TabBarTop
                            style={{ height: Platform.OS == 'ios' ? 64 : 44 }}
                            tabNames={this.state.tabNames}
                            tabImages={this.state.tabImages}
                            tabSelectImages={this.state.tabSelectImages}
                            customView={() =>
                                <SearchView
                                    placeholder={I18n.t('pleaseholder_plateNo')}
                                    value={this.props.plateNo}
                                    onSubmitEditing={this.onSubmitEditing.bind(this)}
                                />}
                        />
                    }
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#24ba8e'>
                    <View tabLabel={I18n.t('car_map')} style={styles.container}>
                        <MapView
                            trafficEnabled={this.state.trafficEnabled}
                            baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                            zoom={this.state.zoom}
                            mapType={this.state.mapType}
                            center={this.props.center}
                            markers={this.props.markers}
                            style={styles.map}
                            onMarkerClick={this._annotationClinck_.bind(this)}
                            onMapClick={(e) => {
                            }}
                        />

                        <TouchableOpacity style={styles.refreshView} disabled={this.props.isLoading} activeOpacity={0.7} onPress={() => this.refresh_()}>
                            <Image style={styles.refreshImage} source={Images.ico_refresh} />
                        </TouchableOpacity>
                    </View>
                    <View
                        tabLabel={I18n.t('car_list')}
                        style={styles.bodyView}
                    >
                        <FlatList
                            refreshing={false}
                            ItemSeparatorComponent={this._separator}
                            renderItem={this._renderItem}
                            data={this.props.data}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={() => this.refresh()}
                                    colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                    progressBackgroundColor="#ffffff"
                                />
                            }
                        />
                    </View>
                </ScrollableTabView>
                <TouchableOpacity style={styles.addView} disabled={this.props.isLoading} activeOpacity={0.7} onPress={() => this.pushRegisterCarView()}>
                    <Image style={styles.refreshImage} source={Images.other_add_select} />
                </TouchableOpacity>
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
    onSubmitEditing(evt) {

        var maxLng = 116.4136103013;
        var minLng = 116.4136103013;
        var maxLat = 39.9110666857;
        var minLat = 39.9110666857;
        let markers = [];
        let data = [];
        for (let i = 0; i < this.props.rootData.length; i++) {
            const site = this.props.rootData[i];
            if (site.plateNo.indexOf(evt.nativeEvent.text) > -1) {
                const marker = {
                    longitude: site.location.x,
                    latitude: site.location.y,
                    title: site.plateNo,
                    extenInfo: {
                        name: '',
                    }
                }
                if (marker.longitude > maxLng) maxLng = marker.longitude;
                if (marker.longitude < minLng) minLng = marker.longitude;
                if (marker.latitude > maxLat) maxLat = marker.latitude;
                if (marker.latitude < minLat) minLat = marker.latitude;

                markers.push(marker);
                data.push(site);
            }
        }
        var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
        var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
        var centerPoint = {
            latitude: cenLat,
            longitude: cenLng
        }
        this.props.dispatch({
            type: 'fullView/updateState',
            payload: {
                plateNo: evt.nativeEvent.text,
                data: data,
                markers: markers,
                center: centerPoint,
            }
        });
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.fullView.isLoading,
        data: state.fullView.data,
        rootData: state.fullView.rootData,
        markers: state.fullView.markers,
        center: state.fullView.center,
        plateNo: state.fullView.plateNo,
    }
}
export default connect(mapStateToProps)(FullView);