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
import styles from '../../styles/FullView/SiteBigMapStyle';
import moment from 'moment';

class HistoryTracksMapView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('detail.history_track'),
        headerBackTitle: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({ isShow: true });
            this.timer && clearTimeout(this.timer);
        }, 100);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    getMarkers(markers, polylines) {
        let points = [];
        if (polylines) {
            if (polylines.length > 0) {
                for (let i = 0; i < polylines.length; i++) {
                    const tracks = polylines[i];
                    if (tracks.length > 0) {
                        const startLocation = tracks[0];
                        points.push({
                            latitude: startLocation.lat,
                            longitude: startLocation.lng,
                            extra: { imageName: 'start' }
                        });
                        if (tracks.length > 1) {
                            const index = tracks.length - 1;
                            const endLocation = tracks[index];
                            points.push({
                                latitude: endLocation.lat,
                                longitude: endLocation.lng,
                                extra: { imageName: 'stop' }
                            });
                        }
                    }
                }
            }
        }
        if (markers && markers.length > 0) {
            for (let i = 0; i < markers.length; i++) {
                const marker = markers[i];
                points.push({
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                    title: marker.title,
                    extra: { imageName: marker.extra.imageName }
                });
            }
        }
        return points;
    }
    render() {
        const markers = this.getMarkers(this.props.markers, this.props.tracks);
        const center = markers.length == 0 ? ihtool.getInitPs() : undefined;
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={false}
                    baiduHeatMapEnabled={false}
                    mapType={MapTypes.NORMAL}
                    style={styles.container}
                    center={center}
                    markers={markers}
                    polylines={this.state.isShow ? this.props.tracks : []}
                    onMapClick={(e) => {

                    }}
                />
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        markers: state.historyTracks.markers,
        tracks: state.historyTracks.tracks,
    }
}
export default connect(mapStateToProps)(HistoryTracksMapView);