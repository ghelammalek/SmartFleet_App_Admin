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
    searchAction() {

    }
    goSiteDetail(item) {
        this.props.navigation.navigate('SiteDetail', { item: item });
    }
    goRegisterCar() {
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
            <TouchableOpacity disabled={this.props.isLoad} key={item.index} activeOpacity={0.6} onPress={() => this.goSiteDetail(item.item)} >
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
                <NavigationBar
                    title={I18n.t('tab_cars')}
                    rightImage={Images.other_search}
                    rightAction={this.searchAction.bind(this)}
                    letfImage={Images.other_add}
                    leftAction={this.goRegisterCar.bind(this)}
                />
                <ScrollableTabView
                    locked={true}
                    style={styles.tabbar}
                    renderTabBar={() =>
                        <TabBarTop
                            tabNames={this.state.tabNames}
                            tabImages={this.state.tabImages}
                            tabSelectImages={this.state.tabSelectImages}
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

                        <TouchableOpacity disabled={this.props.isLoading} activeOpacity={0.7} onPress={() => this.refresh_()} style={styles.refreshView}>
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
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.fullView.isLoading,
        data: state.fullView.data,
        markers: state.fullView.markers,
        center: state.fullView.center,
    }
}
export default connect(mapStateToProps)(FullView);