import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import Images from '../constants/Images';
import styles from '../styles/searchViewStyle';
import { connect } from '../routes/dva';
import I18n from '../language/index';
import { isEmpty } from '../utils/index';
import Global from '../utils/Global';


export default class SearchView extends Component {
    render() {
        return (
            <View style={styles.searchView}>
                <Image source={Images.other_ico_search_shallow} style={styles.image} />
                <TextInput
                    style={styles.searchBar}
                    placeholder={this.props.placeholder}
                    placeholderTextClolor='#979797'
                    underlineColorAndroid="transparent"
                    editable={!this.props.editable}
                    clearButtonMode={'always'}
                    onChangeText={this.props.onChangeText}
                />
                <TouchableOpacity activeOpacity={0.6} disabled={this.props.editable} onPress={this.props.searchAction} >
                    <View style={styles.searchBtnView}>
                        <Text style={styles.searchBtn}>{I18n.t('search')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}