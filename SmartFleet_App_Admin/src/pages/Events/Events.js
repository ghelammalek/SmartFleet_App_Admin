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

import { connect } from '../../routes/dva';
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from "../../widget/LoadingView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import moment from 'moment';
import styles from '../../styles/FullView/fullViewStyle';

class Events extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '事件',
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(createAction('events/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('events/getAlerts')({}));
    }
    refresh() {
        this.props.dispatch(createAction('events/getAlerts')({}));
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
                <NavigationBar title='事件' />
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
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.events.isLoading,
        data: state.events.data,
    }
}
export default connect(mapStateToProps)(Events);