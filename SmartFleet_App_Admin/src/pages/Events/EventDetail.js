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
import styles from '../../styles/Event/eventDetailStyle';

class EventDetail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.item.moduleName,
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
        // this.props.dispatch(createAction('fullView/updateState')({ isLoading: true }));
        // this.props.dispatch(createAction('fullView/getSites')({}));
    }
    refresh() {
        // this.props.dispatch(createAction('fullView/getSites')({}));
    }
    refresh_() {
        // this.props.dispatch(createAction('fullView/updateState')({ isLoading: true }));
        // this.props.dispatch(createAction('fullView/getSites')({}));
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
                    <Image style={styles.image_right} source={Images.other_right} />
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>

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
        markers: state.eventDetail.markers,
        center: state.eventDetail.center,
    }
}
export default connect(mapStateToProps)(EventDetail);