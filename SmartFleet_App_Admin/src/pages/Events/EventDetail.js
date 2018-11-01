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
        var markers = [];
        var maxLng = 116.4136103013;
        var minLng = 116.4136103013;
        var maxLat = 39.9110666857;
        var minLat = 39.9110666857;
        if (item.fields) {
            if (item.fields.start_location) {
                maxLng = item.fields.start_location.longitude;
                minLng = item.fields.start_location.longitude;
                maxLat = item.fields.start_location.latitude;
                minLat = item.fields.start_location.latitude;
                markers.push({
                    latitude: item.fields.start_location.latitude,
                    longitude: item.fields.start_location.longitude,
                    title: I18n.t('start_location'),
                })
            }
            if (item.fields.end_location) {
                maxLng = item.fields.end_location.longitude;
                minLng = item.fields.end_location.longitude;
                maxLat = item.fields.end_location.latitude;
                minLat = item.fields.end_location.latitude;
                markers.push({
                    latitude: item.fields.end_location.latitude,
                    longitude: item.fields.end_location.longitude,
                    title: I18n.t('end_location'),
                })
            }
        }

        for (let i = 0; i < markers.length; i++) {
            const marker = markers[i];
            if (marker.longitude > maxLng) maxLng = marker.longitude;
            if (marker.longitude < minLng) minLng = marker.longitude;
            if (marker.latitude > maxLat) maxLat = marker.latitude;
            if (marker.latitude < minLat) minLat = marker.latitude;
        }
        var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
        var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
        var centerPoint = {
            latitude: cenLat,
            longitude: cenLng
        }
        this.state = {
            data: item,
            mayType: MapTypes.NORMAL,
            // zoom: 6,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            center: centerPoint,
            markers: markers,
        };
    }
    componentDidMount() {
        this.props.dispatch(createAction('eventDetail/updateState')({ data: this.state.data }));
    }
    componentWillUnmount() {
        this.props.dispatch(createAction('eventDetail/updateState')({ data: null }));
    }
    postAlert() {
        this.props.dispatch(createAction('eventDetail/updateState')({ isLoading: true }));
        // this.props.dispatch(createAction('eventDetail/postAlert')({ _id: this.state.data._id }, this));
        this.props.dispatch({
            type: 'eventDetail/postAlert',
            payload: {
                _id: this.state.data._id
            },
            that: this,
        });
    }
    _renderItem = (item) => {
        if (item == null) {
            return <View />
        } else {
            return (
                <View style={styles.itemView}>
                    <View style={homeStyle.itemTopView}>
                        <View style={homeStyle.itemTopLeft}>
                            <Text style={homeStyle.itemTitle} >{item.moduleName}</Text>
                            <View style={item.confirmState ? homeStyle.itemClearView : homeStyle.itemClearView_}>
                                <Text style={homeStyle.itemClear} >{item.confirmState ? I18n.t('event_clear') : I18n.t('event_unclear')}</Text>
                            </View>
                        </View>
                        <View style={homeStyle.itemTopRight}>
                            <Text style={homeStyle.time} >{ihtool.getSimpleDate(item.startsAt)}</Text>
                        </View>
                    </View>
                    <View style={homeStyle.itemBodyView}>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_type') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventType(item)}</Text>
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_level') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventLevelLabel(item.level)}</Text>
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventLevelImage(item.level)} />
                        </View>
                        {
                            item.confirmState ?
                                <View style={homeStyle.itemTextView}>
                                    <Text style={homeStyle.itemText} >{I18n.t('notice.confirm_time') + '：'}</Text>
                                    <Text style={homeStyle.itemText} >{moment(item.confirmedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                </View> : null
                        }
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventDesc(item)}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={item.confirmState ? styles.clearBtnView_ : styles.clearBtnView} disabled={item.confirmState} activeOpacity={0.6} onPress={() => this.postAlert()} >
                        <Text style={styles.clearBtn}>{I18n.t('clear_event')}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.markers.length > 0 ?
                        <MapView
                            trafficEnabled={this.state.trafficEnabled}
                            baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                            // zoom={this.state.zoom}
                            mapType={this.state.mapType}
                            center={this.state.center}
                            markers={this.state.markers}
                            style={styles.map}
                        /> : <View />
                }
                {
                    this._renderItem(this.props.data)
                }
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.eventDetail.isLoading,
        data: state.eventDetail.data,
    }
}
export default connect(mapStateToProps)(EventDetail);