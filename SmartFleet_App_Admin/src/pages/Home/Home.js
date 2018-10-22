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

import { connect } from '../../routes/dva';
import { isEmpty, createAction } from '../../utils/index';
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from "../../widget/LoadingView";
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import ihtool from '../../utils/ihtool';
import styles from '../../styles/Home/homeStyle';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '首页',
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(createAction('home/getStatistics')({ queryType: '1' }));
        this.props.dispatch(createAction('home/getAlerts')({
            cursor: 0,
            limit: 5,
            body: {}
        }));
    }
    refresh() {
        this.props.dispatch(createAction('home/getStatistics')({ queryType: '1' }));
        this.props.dispatch(createAction('home/getAlerts')({
            cursor: 0,
            limit: 5,
            body: {}
        }));
    }
    goEventDetail(item) {
        this.props.navigation.navigate('EventDetail', { item: item });
    }
    goEvents() {
        this.props.navigation.navigate('Events');
    }

    getItems(items) {
        if (isEmpty(items)) {
            return (<View />);
        } else {
            return items.map((item, index) =>
                <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => this.goEventDetail(item)} >
                    <View style={styles.itemView}>
                        <View style={styles.itemviewLeft}>
                            <View style={styles.itemTitleView}>
                                <Text style={styles.itemName} >{item.moduleName}</Text>
                            </View>
                            <View style={styles.texView}>
                                {
                                    isEmpty(item.desc) ? <View /> :
                                        <Text style={styles.textBody} >{item.desc}</Text>
                                }
                            </View>
                        </View>

                        <View style={styles.texView}>
                            <Text style={styles.textBody} >{ihtool.getSimpleDate(item.startsAt)}</Text>
                        </View>
                        <Image style={styles.image_right} source={Images.other_ico_entrance} />
                    </View>
                    <View style={styles.separator} />
                </TouchableOpacity>
            )
        }
    }
    render() {
        const data = {
            id: this.props.data.id == undefined ? '--' : this.props.data.id,
            distance: this.props.data.distance == undefined ? '--' : this.props.data.distance,
            duration: this.props.data.duration == undefined ? '--' : this.props.data.duration,
            fuelConsumption: this.props.data.fuelConsumption == undefined ? '--' : this.props.data.fuelConsumption,
            illegal: this.props.data.illegal == undefined ? '--' : this.props.data.illegal,
            accident: this.props.data.accident == undefined ? '--' : this.props.data.accident,
            createTime: this.props.data.createTime == undefined ? '--' : this.props.data.createTime,
            queryType: this.props.data.queryType == undefined ? '--' : this.props.data.queryType,
            cars: this.props.data.cars == undefined ? '--' : this.props.data.cars,
            workPerson: this.props.data.workPerson == undefined ? '--' : this.props.data.workPerson
        }
        // alert(JSON.stringify(data));
        return (
            <View style={styles.container}>
                <NavigationBar title='首页' />
                <ScrollView
                    style={styles.scrollView}
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
                    <View style={styles.staticView}>
                        <View style={styles.staticView_}>
                            <View style={styles.static_titleView}>
                                <Text style={styles.static_title}>{data.distance}</Text>
                                <Text style={styles.static_sunTitle}>{'千米'}</Text>
                            </View>
                            <Image style={styles.static_image} source={Images.home_distance} />
                        </View>
                        <View style={styles.staticView_}>
                            <View style={styles.static_titleView}>
                                <Text style={styles.static_title}>{data.duration}</Text>
                                <Text style={styles.static_sunTitle}>{'小时'}</Text>
                            </View>
                            <Image style={styles.static_image} source={Images.home_duration} />
                        </View>

                        <View style={styles.staticView_}>
                            <View style={styles.static_titleView}>
                                <Text style={styles.static_title}>{data.workPerson}</Text>
                                <Text style={styles.static_sunTitle}>{'辆'}</Text>
                            </View>
                            <Image style={styles.static_image} source={Images.home_workPerson} />
                        </View>
                        <View style={styles.staticView_}>
                            <View style={styles.static_titleView}>
                                <Text style={styles.static_title}>{data.fuelConsumption}</Text>
                                <Text style={styles.static_sunTitle}>{'次'}</Text>
                            </View>
                            <Image style={styles.static_image} source={Images.home_fuelConsumption} />
                        </View>
                    </View>
                    <View style={styles.space_horizontal} />
                    <View style={styles.titleView}>
                        <Text style={styles.text1}>{'车辆事件'}</Text>
                        <TouchableOpacity style={styles.moreEvents} activeOpacity={0.6} onPress={() => this.goEvents()} >
                            <Image style={styles.btnImage} source={Images.other_more} />
                        </TouchableOpacity>
                    </View>
                    {
                        this.getItems(this.props.events)
                    }
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        events: state.home.events,
        isLoading: state.home.isLoading,
        data: state.home.data,
    }
}
export default connect(mapStateToProps)(Home);