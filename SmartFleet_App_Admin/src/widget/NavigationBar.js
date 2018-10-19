import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import styles from '../styles/navigationBarStyle';
export default class NavigationBar extends Component {

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.letfImage ?
                        <TouchableOpacity activeOpacity={0.6} onPress={this.props.leftAction}>
                            <View style={styles.imageView}>
                                <Image source={this.props.letfImage} style={styles.image} />
                            </View>
                        </TouchableOpacity> :
                        <View style={styles.imageView} />
                }
                <Text style={styles.title}>{this.props.title}</Text>

                {
                    this.props.rightImage ?
                        <TouchableOpacity activeOpacity={0.6} onPress={this.props.rightAction}>
                            <View style={styles.imageView}>
                                <Image source={this.props.rightImage} style={styles.image} />
                            </View>
                        </TouchableOpacity> :
                        <View style={styles.imageView} />
                }
            </View>
        )
    }
}