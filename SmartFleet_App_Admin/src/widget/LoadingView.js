import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
} from 'react-native';

import { isEmpty } from "../utils/index";

export default class LoadingView extends Component {

    render() {
        return (
            <View style={styles.container} >
                <View style={[styles.loadingView, this.props.style]} >
                    <ActivityIndicator style={styles.loading} />
                    {
                        isEmpty(this.props.title) ? <View /> : <Text style={styles.text} >{this.props.title}</Text>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loadingView: {
        width: 100,
        height: 100,
        marginBottom: 100,
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(27,27,28,0.7)',
    },
    loading: {
        width: 30,
        height: 30,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
    }
})