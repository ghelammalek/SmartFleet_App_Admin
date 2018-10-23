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
import ihtool from '../../utils/ihtool';
import styles from '../../styles/Event/eventStyle';

class Events extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '事件',
    });
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(createAction('events/updateState')({ isLoading: true }));
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: {}
        }));
    }
    refresh() {
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: {}
        }));
    }
    goEventDetail(item) {
        // this.props.navigation.navigate('EventDetail', { item: item });
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity key={item.index} activeOpacity={0.6} onPress={() => this.goEventDetail(item.item)} >
                <View style={styles.itemView}>
                    <View style={styles.itemviewLeft}>
                        <View style={styles.itemTitleView}>
                            <Text style={styles.itemName} >{item.item.moduleName}</Text>
                        </View>
                        <View style={styles.texView}>
                            {
                                isEmpty(item.item.desc) ? <View /> :
                                    <Text style={styles.textBody} >{item.item.desc}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.texView}>
                        <Text style={styles.textBody} >{ihtool.getSimpleDate(item.item.startsAt)}</Text>
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