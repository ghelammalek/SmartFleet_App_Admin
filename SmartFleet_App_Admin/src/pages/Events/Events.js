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
import NoDataView from "../../widget/NoDataView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import moment from 'moment';
import ihtool from '../../utils/ihtool';
import styles from '../../styles/Event/eventStyle';
import homeStyle from '../../styles/Home/homeStyle';

class Events extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: I18n.t('tab_events'),
    });
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
        }
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
        this.props.dispatch(createAction('events/updateState')({ isLoad: true }));
        this.props.dispatch(createAction('events/getAlerts')({
            cursor: 0,
            limit: 20,
            body: {}
        }));
    }
    loadMore() {
        // this.props.dispatch(createAction('events/updateState')({ isLoad: true }));
        if (this.props.isLoad == false) {
            this.props.dispatch(createAction('events/loadMore')({
                cursor: this.props.cursor + 20,
                limit: 20,
                body: {}
            }));
        }
    }
    goEventDetail(item) {
        this.setState({ selectIndex: item.index });
        this.props.navigation.navigate('EventDetail', {
            item: item.item,
            callback: (backdata) => {
                var events = [];
                for (let i = 0; i < this.props.data.length; i++) {
                    const element = this.props.data[i];
                    if (item.index == i) {
                        events.push(backdata);
                    } else {
                        events.push(element);
                    }
                }
                this.props.dispatch(createAction('events/updateState')({ data: events }));
            }
        });
    }
    _separator = () => {
        return <View style={styles.separator} />;
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity disabled={this.props.isLoad} key={item.index} activeOpacity={0.6} onPress={() => this.goEventDetail(item)} >
                <View style={homeStyle.itemView}>
                    <View style={homeStyle.itemTopView}>
                        <View style={homeStyle.itemTopLeft}>
                            <Text style={homeStyle.itemTitle} >{item.item.moduleName}</Text>
                            {
                                item.item.confirmState ? <Text style={homeStyle.itemClear} >{I18n.t('event_clear')}</Text> :
                                    <Text style={homeStyle.itemClear_} >{I18n.t('event_unclear')}</Text>
                            }
                        </View>
                        <View style={homeStyle.itemTopRight}>
                            <Text style={homeStyle.time} >{ihtool.getSimpleDate(item.item.startsAt)}</Text>
                            <Image style={homeStyle.imgagRight} source={Images.other_right} />
                        </View>
                    </View>
                    <View style={homeStyle.itemBodyView}>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_type') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventType(item.item)}</Text>
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_level') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventLevelLabel(item.item.level)}</Text>
                            <Image style={homeStyle.itemLevelImage} source={ihtool.getEventLevelImage(item.item.level)} />
                        </View>
                        <View style={homeStyle.itemTextView}>
                            <Text style={homeStyle.itemText} >{I18n.t('event_desc') + '：'}</Text>
                            <Text style={homeStyle.itemText} >{ihtool.getEventDesc(item.item)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={I18n.t('tab_events')} />
                <View style={[styles.container, { paddingHorizontal: 10 }]}>
                    {
                        this.props.data && this.props.data.length > 0 ?
                            <FlatList
                                refreshing={this.props.isLoad}
                                // ItemSeparatorComponent={this._separator}
                                renderItem={this._renderItem}
                                data={this.props.data}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReachedThreshold={0.3}
                                onEndReached={(info) => this.loadMore()}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.props.isLoad}
                                        onRefresh={() => this.refresh()}
                                        colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                        progressBackgroundColor="#ffffff"
                                    />
                                }
                            /> :
                            <TouchableOpacity disabled={this.props.isLoading} style={homeStyle.nodataView} activeOpacity={0.6} onPress={() => this.refresh()} >
                                <NoDataView label1={I18n.t('home_nodata_label')} label2={I18n.t('home_refresh_label')} />
                            </TouchableOpacity>
                    }

                    {
                        this.props.isLoading ? <LoadingView /> : <View />
                    }
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.events.isLoading,
        data: state.events.data,
        isLoad: state.events.isLoad,
        cursor: state.events.cursor,
    }
}
export default connect(mapStateToProps)(Events);