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
import LoadingView from "../../widget/LoadingView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import styles from '../../styles/FullView/fullViewStyle';

class FullView extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '车辆',
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 6,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
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
    goSiteDetail(item) {
        this.props.navigation.navigate('SiteDetail', { item: item });
    }
    goRegisterCar() {
        this.props.navigation.navigate('RegisterCar');
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }
    _renderItem = (item) => {
        return (
            <TouchableOpacity key={item.index} activeOpacity={0.6} onPress={() => this.goSiteDetail(item.item)} >
                <View style={styles.itemView}>
                    <View style={styles.itemviewLeft}>
                        <View style={styles.topView}>
                            <Text style={styles.itemName} >{item.item.plateNo}</Text>
                        </View>
                        <View style={styles.bodyView}>
                            <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.item.minutes + ' 分钟'}</Text>
                            </View>
                            <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.item.distance + ' 千米'}</Text>
                            </View>
                            <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.item.duration + ' 小时'}</Text>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.image_right} source={Images.other_ico_entrance} />
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        var center = this.state.center;

        return (
            <View style={styles.container}>
                <NavigationBar title='车辆' rightImage={Images.other_add} rightAction={this.goRegisterCar.bind(this)} />
                <ScrollableTabView
                    locked={true}
                    style={styles.tabbar}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#FF0000'>
                    <View tabLabel='地图' style={styles.container}>
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

                        <TouchableOpacity disabled={this.props.isLoading} onPress={() => this.refresh_()} style={{ position: 'absolute', bottom: 30, right: 20, height: 50, width: 50 }}>
                            <Image style={{ margin: 5, height: 40, width: 40, resizeMode: 'stretch' }} source={Images.ico_refresh} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        tabLabel='列表'
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