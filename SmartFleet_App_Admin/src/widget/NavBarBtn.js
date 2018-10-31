import React, { Component } from 'react';

import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';

import I18n from '../language/index';
import { isEmpty } from "../utils/index";
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
export default class NavBarBtn extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                {
                    this.props.title ?
                        <TouchableOpacity activeOpacity={0.6} disabled={isEmpty(this.props.disabled) ? false : this.props.disabled} onPress={this.props.onPress}>
                            <View style={styles.imageView}>
                                <Text style={styles.title}>{this.props.title}</Text>
                            </View>
                        </TouchableOpacity> :
                        this.props.source ?
                            <TouchableOpacity activeOpacity={0.6} disabled={isEmpty(this.props.disabled) ? false : this.props.disabled} onPress={this.props.onPress}>
                                <View style={styles.imageView}>
                                    <Image source={this.props.source} style={styles.image} />
                                </View>
                            </TouchableOpacity> : <View style={[styles.imageView]} />
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageView: {
        width: Platform.OS === 'android' ? 56 : 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 12,
        backgroundColor: 'red',
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
    }
});