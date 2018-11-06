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
            <TouchableOpacity style={[styles.container, this.props.style]} activeOpacity={0.6} disabled={isEmpty(this.props.disabled) ? false : this.props.disabled} onPress={this.props.onPress}>
                {
                    this.props.title ?
                        <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text> :
                        this.props.source ?
                            <Image source={this.props.source} style={[styles.image, this.props.imageStyle]} /> : <View />
                }
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        minWidth: Platform.OS === 'android' ? 56 : 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 12,
        color: '#2d2d2d',
        fontWeight: 'bold'
    }
});