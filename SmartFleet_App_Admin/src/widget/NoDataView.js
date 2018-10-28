import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { isEmpty } from "../utils/index";
import Images from '../constants/Images';

export default class NoDataView extends Component {

    render() {
        return (
            <View style={[styles.container, this.props.style]} >
                <Image source={Images.other_nodata} style={styles.image} />
                <Text style={styles.text}>{this.props.label1}</Text>
                <Text style={styles.text}>{this.props.label2}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 3,
    },
    text: {
        marginTop: 3,
        fontSize: 12,
        color: '#9797a3',
    }
})