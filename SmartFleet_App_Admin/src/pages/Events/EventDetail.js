import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
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
import ihtool from '../../utils/ihtool';
import styles from '../../styles/Event/eventDetailStyle';
import homeStyle from '../../styles/Home/homeStyle';
import moment from 'moment';

class EventDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.item.moduleName,
        headerBackTitle: null,
    });

    constructor(props) {
        super(props);
        const item = this.props.navigation.state.params.item;
        let markers = [];
        let maxLng = -360;
        let minLng = 360;
        let maxLat = -360;
        let minLat = 360;
        if (item.fields) {
            if (item.fields.start_location) {
                const marker = item.fields.start_location;
                if (marker.longitude > maxLng) maxLng = marker.longitude;
                if (marker.longitude < minLng) minLng = marker.longitude;
                if (marker.latitude > maxLat) maxLat = marker.latitude;
                if (marker.latitude < minLat) minLat = marker.latitude;
                markers.push({
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    title: I18n.t('start_location'),
                })
            }
            if (item.fields.end_location) {
                const marker = item.fields.end_location;
                if (marker.longitude > maxLng) maxLng = marker.longitude;
                if (marker.longitude < minLng) minLng = marker.longitude;
                if (marker.latitude > maxLat) maxLat = marker.latitude;
                if (marker.latitude < minLat) minLat = marker.latitude;
                markers.push({
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    title: I18n.t('end_location'),
                })
            }
        }
        let cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
        let cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
        let centerPoint = {
            latitude: cenLat,
            longitude: cenLng
        }
        this.state = {
            data: item,
            mayType: MapTypes.NORMAL,
            zoom: 15,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            center: centerPoint,
            markers: markers,
            isLoading: false,
        };
    }
    postAlert() {
        this.setState({ isLoading: true });
        this.props.dispatch({
            type: 'eventDetail/postAlert',
            payload: {
                _id: this.state.data._id
            },
            onSuccess: (result) => {
                let data = { ...this.state.data };
                data.confirmState = result.confirmState;
                data.confirmedAt = result.confirmedAt;
                this.setState({ isLoading: false, data: data });
                Alert.alert('', I18n.t('successful'), [{
                    text: I18n.t('okText'), onPress: () => {
                        this.props.navigation.state.params.callback(data);
                        this.props.navigation.goBack();
                    }
                },]);
            },
            onFaild: () => {
                this.setState({ isLoading: false });
            }
        });
    }
    _renderItem = (item) => {
        if (item == null) {
            return <View />
        } else {
            const { fields } = item;
            const { alarm_message } = fields || {};
            return (
                <View style={this.state.markers.length > 0 ? styles.itemView : styles.itemView_}>
                    <View style={homeStyle.itemTopView}>
                        <View style={homeStyle.itemTopLeft}>
                            <Text style={homeStyle.itemTitle} >{item.moduleName}</Text>
                            <View style={item.confirmState ? homeStyle.itemClearView : homeStyle.itemClearView_}>
                                <Text style={homeStyle.itemClear} >{item.confirmState ? I18n.t('event_confirm') : I18n.t('event_unconfirm')}</Text>
                            </View>
                        </View>
                        <View style={homeStyle.itemTopRight}>
                            <Text style={homeStyle.time} >{moment(item.startsAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        </View>
                    </View>
                    <View style={homeStyle.itemBodyView}>
                        <View style={homeStyle.itemTextView}>
                            <Text style={styles.itemText} >{I18n.t('event_type') + '：'}</Text>
                            <Text style={styles.itemText} >{ihtool.getEventType(item)}</Text>
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={styles.itemText} >{I18n.t('event_level') + '：'}</Text>
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventLevelImage(item.level)} />
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventDetailImage(item)} />
                        </View>
                        {
                            item.confirmedAt ?
                                <View style={homeStyle.itemTextView}>
                                    <Text style={styles.itemText} >{I18n.t('event_confirm') + '：'}</Text>
                                    <Text style={styles.itemText} >{moment(item.confirmedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                </View> : null
                        }
                        {
                            item.endAt ?
                                <View style={homeStyle.itemTextView}>
                                    <Text style={styles.itemText} >{I18n.t('recover_time') + '：'}</Text>
                                    <Text style={styles.itemText} >{moment(item.endAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                </View> : null
                        }
                        <View style={homeStyle.itemTextView}>
                            <Text style={styles.itemText} >{I18n.t('event_desc') + '：'}</Text>
                            <Text style={styles.itemText} >{alarm_message}</Text>
                        </View>
                    </View>
                    {
                        item.confirmState ? <View /> :
                            <TouchableOpacity style={item.confirmState ? styles.clearBtnView_ : styles.clearBtnView} disabled={item.confirmState} activeOpacity={0.6} onPress={() => this.postAlert()} >
                                <Text style={styles.clearBtn}>{I18n.t('confirm_event')}</Text>
                            </TouchableOpacity>
                    }
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.markers.length > 0 ?
                        this.state.markers.length === 2 ?
                            <MapView
                                trafficEnabled={this.state.trafficEnabled}
                                baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                                // zoom={this.state.zoom}
                                mapType={this.state.mapType}
                                center={this.state.center}
                                markers={this.state.markers}
                                style={styles.map}
                            /> :
                            <MapView
                                trafficEnabled={this.state.trafficEnabled}
                                baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                                zoom={this.state.zoom}
                                mapType={this.state.mapType}
                                center={this.state.center}
                                markers={this.state.markers}
                                style={styles.map}
                            /> : <View />
                }
                {
                    this._renderItem(this.state.data)
                }
                {
                    this.state.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
}
function mapStateToProps(state) {
    return { ...state }
}
export default connect(mapStateToProps)(EventDetail);