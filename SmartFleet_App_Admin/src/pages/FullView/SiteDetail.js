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
import LoadingView from "../../widget/LoadingView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import styles from '../../styles/FullView/siteDetailStyle';

class SiteDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.item.plateNo,
        headerBackTitle: null,
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
        this.props.dispatch(createAction('siteDetail/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('siteDetail/getAlerts')({
            // start_time: '2017-10-20T16:01:26.399Z',
            // end_time: '2018-10-20T16:01:26.399Z',
            // eventsTypes: null,
            // labels: {
            //     code: null,
            // },
            moduleName: '川WFF111',
        }));
    }
    componentWillUnmount() {
        this.props.dispatch(createAction('siteDetail/updateState')({
            data: null,
            isLoading: false,
        }));

    }
    refresh() {
        this.props.dispatch(createAction('siteDetail/getAlerts')({
            // start_time: '2017-10-20T16:01:26.399Z',
            // end_time: '2018-10-20T16:01:26.399Z',
            // eventsTypes: null,
            // labels: {
            //     code: null,
            // },
            moduleName: '川WFF111',
        }));
    }
    goEventDetail(item) {
        this.props.navigation.navigate('EventDetail', { item: item });
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }
    _renderItem = (item) => {
        return (
            <TouchableOpacity key={item.index} activeOpacity={0.6} onPress={() => this.goEventDetail(item.item)} >
                <View style={styles.itemView}>
                    <View style={styles.itemviewLeft}>
                        <View style={styles.topView}>
                            <Text style={styles.itemName} >{item.item.moduleName}</Text>
                        </View>
                        <View style={styles.bodyView}>
                            <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.item.startsAt}</Text>
                            </View>
                            <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.item.desc}</Text>
                            </View>
                            {/* <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.item.duration + ' 小时'}</Text>
                            </View> */}
                        </View>
                    </View>
                    <Image style={styles.image_right} source={Images.other_ico_entrance} />
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>

                <ScrollableTabView
                    locked={false}
                    style={styles.tabbar}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#FF0000'
                >
                    <View tabLabel='实时状态' style={styles.container}>
                        <View style={styles.mapView}>
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
                        </View>
                        <ScrollView style={{ flex: 0, paddingLeft: 8 }}>
                            <Text style={styles.textFont} >{'基本信息'}</Text>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'车牌号:'}</Text>
                                    <Text style={styles.subTitle} >{this.state.title}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'资产编号:'}</Text>
                                    <Text style={styles.subTitle} >{'123112'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'车型:'}</Text>
                                    <Text style={styles.subTitle} >{'沃尔沃XC90'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'网关序列号:'}</Text>
                                    <Text style={styles.subTitle} >{'IR915-5993481'}</Text>
                                </View>
                            </View>
                            <Text style={styles.textFont} >{'最近状态(5分钟前)'}</Text>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'当前状态:'}</Text>
                                    <Text style={styles.subTitle} >{'行驶中'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'车况:'}</Text>
                                    <Text style={styles.subTitle} >{'正常'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'司机:'}</Text>
                                    <Text style={styles.subTitle} >{'李四'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'地点:'}</Text>
                                    <Text style={styles.subTitle} >{'朝阳望京科技园附近'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'天气:'}</Text>
                                    <Text style={styles.subTitle} >{'晴'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'温度:'}</Text>
                                    <Text style={styles.subTitle} >{'24℃'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'里程表:'}</Text>
                                    <Text style={styles.subTitle} >{'362千米'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'环境温度:'}</Text>
                                    <Text style={styles.subTitle} >{'24℃'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'邮箱余量:'}</Text>
                                    <Text style={styles.subTitle} >{'45%'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'当前速度:'}</Text>
                                    <Text style={styles.subTitle} >{'76千米/小时'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'电池电压:'}</Text>
                                    <Text style={styles.subTitle} >{'48V'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'发动机RPM:'}</Text>
                                    <Text style={styles.subTitle} >{'1200转/分钟'}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontal}>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'刹车状态:'}</Text>
                                    <Text style={styles.subTitle} >{'关'}</Text>
                                </View>
                                <View style={[styles.horizontal, styles.frame]} >
                                    <Text style={styles.title} >{'制动液位:'}</Text>
                                    <Text style={styles.subTitle} >{'34%'}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View tabLabel='车辆事件' style={styles.container}>
                        <View style={styles.container}>
                            <FlatList
                                refreshing={false}
                                ItemSeparatorComponent={this._separator}
                                renderItem={this._renderItem}
                                data={this.props.data}
                                keyExtractor={(item, index) => item._id}
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
        isLoading: state.siteDetail.isLoading,
        data: state.siteDetail.data,
        markers: state.siteDetail.markers,
        center: state.siteDetail.center,
    }
}
export default connect(mapStateToProps)(SiteDetail);