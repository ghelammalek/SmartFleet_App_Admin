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
import styles from '../../styles/Home/homeStyle';

class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '首页',
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(createAction('home/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('home/getData')({}));
    }
    refresh() {
        this.props.dispatch(createAction('home/getData')({}));
    }
    goEventDetail(item) {
        this.props.navigation.navigate('EventDetail', { item: item });
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }

    getItems(items) {
        if (isEmpty(items)) {
            return (<View />);
        } else {
            return items.map((item, index) =>
                <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => this.goEventDetail(item)} >
                    <View style={styles.itemView}>
                        <View style={styles.itemviewLeft}>
                            <View style={styles.topView}>
                                <Text style={styles.itemName} >{item.moduleName}</Text>
                            </View>
                            <View style={styles.bodyView}>
                                <View style={styles.texView}>
                                    <Text style={styles.textBody} >{item.startsAt}</Text>
                                </View>
                                <View style={styles.texView}>
                                    <Text style={styles.textBody} >{item.desc}</Text>
                                </View>
                                {/* <View style={styles.texView}>
                                <Text style={styles.textBody} >{item.duration + ' 小时'}</Text>
                            </View> */}
                            </View>
                        </View>
                        <Image style={styles.image_right} source={Images.other_ico_entrance} />
                    </View>
                    <View style={styles.separator} />
                </TouchableOpacity>
            )
        }
    }
    render() {
        // alert(JSON.stringify(this.props.data));
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
                    // style={{ backgroundColor: '#f3f3f3' }}
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
                    <View style={styles.titleView}>
                        <Text style={styles.text1}>{'概览'}</Text>
                    </View>
                    <View style={styles.staticView}>
                        <Image style={styles.image} source={Images.tab_home_h} />
                        <View style={styles.rightView}>
                            <View style={styles.textView}>
                                <Text style={styles.text2}>{'今日总行驶里程'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text3}>{data.distance}</Text>
                                <Text style={styles.text4}>{'千米'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'本月 ' + data.distance + '千米'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'预计再行驶756千米后保养'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.staticView}>
                        <Image style={styles.image} source={Images.tab_home_h} />
                        <View style={styles.rightView}>
                            <View style={styles.textView}>
                                <Text style={styles.text2}>{'今日总工作时长'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text3}>{data.duration}</Text>
                                <Text style={styles.text4}>{'小时'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'本月 ' + data.duration + '小时'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'预计再工作23小时后保养'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.staticView}>
                        <Image style={styles.image} source={Images.tab_home_h} />
                        <View style={styles.rightView}>
                            <View style={styles.textView}>
                                <Text style={styles.text2}>{'今日总燃料消耗'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text3}>{data.fuelConsumption}</Text>
                                <Text style={styles.text4}>{'升'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'本月 ' + data.fuelConsumption + '升'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'燃油消耗情况正常'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.staticView}>
                        <Image style={styles.image} source={Images.tab_home_h} />
                        <View style={styles.rightView}>
                            <View style={styles.textView}>
                                <Text style={styles.text2}>{'今日总出勤车辆'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text3}>{data.cars}</Text>
                                <Text style={styles.text4}>{'辆'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'本月 ' + data.cars + '辆'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'出勤率0%'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.staticView}>
                        <Image style={styles.image} source={Images.tab_home_h} />
                        <View style={styles.rightView}>
                            <View style={styles.textView}>
                                <Text style={styles.text2}>{'今日总违规驾驶行为'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text3}>{data.illegal}</Text>
                                <Text style={styles.text4}>{'次'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'本月 ' + data.illegal + '次'}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text5}>{'可能事故0次'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 20, flex: 1, backgroundColor: '#f7f7f7' }} />
                    <View style={styles.titleView}>
                        <Text style={styles.text1}>{'车辆事件'}</Text>
                    </View>
                    {
                        this.getItems(this.props.events)
                    }
                    <View style={{ height: 20, flex: 1, backgroundColor: '#fff' }} />
                </ScrollView>
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
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