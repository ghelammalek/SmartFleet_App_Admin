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

export default class SiteBigMap extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
        headerBackTitle: null,
    });

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params;
        this.state = {
            params: params,
            center: params.center,
            marker: params.marker,
        };
        // alert(JSON.stringify(params.marker))
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={false}
                    baiduHeatMapEnabled={false}
                    zoom={15}
                    mapType={MapTypes.NORMAL}
                    center={this.state.center}
                    // marker={this.state.marker}
                    markers={[this.state.marker]}
                    style={{ flex: 1 }}
                />
            </View>
        );
    }
}