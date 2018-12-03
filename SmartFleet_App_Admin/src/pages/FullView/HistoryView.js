import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import TabBarTop from "../../widget/TabBarTop";
import Images from '../../constants/Images';
import I18n from '../../language/index';
import styles from '../../styles/FullView/historyStyle';
import HistoryData from './HistoryData';
import HistoryTracks from './HistoryTracks';

export default class HistoryView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: I18n.t('common.history'),
        headerBackTitle: null,
        headerStyle: {
            borderBottomWidth: 0,
        },
    });
    constructor(props) {
        super(props);
        const item = this.props.navigation.state.params.item;
        this.state = {
            title: item.plateNo,
            location: item.location,
            item: item,
            tabNames: [I18n.t('detail.history_track'), I18n.t('detail.history_data')],
            tabImages: [Images.other_track, Images.other_history_data],
            tabSelectImages: [Images.other_track_select, Images.other_history_data_select],
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    locked={true}
                    renderTabBar={() =>
                        <TabBarTop
                            style={styles.TabBarTop}
                            tabNames={this.state.tabNames}
                            tabImages={this.state.tabImages}
                            tabSelectImages={this.state.tabSelectImages}
                            customView={() => <View />
                            }
                            changeTab={(value) => console.log(value)}
                        />
                    }
                >
                    <HistoryTracks tabLabel={I18n.t('etail.history_track')} style={styles.body} item={this.state.item} />
                    <HistoryData tabLabel={I18n.t('detail.history_data')} style={styles.body} item={this.state.item} />
                </ScrollableTabView>
            </View>
        )
    }
}