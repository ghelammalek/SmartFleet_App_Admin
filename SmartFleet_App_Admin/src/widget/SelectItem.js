import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';

import selectItemStyle from '../style/selectItemStyle';
import Images from '../constants/Images/Images.js';

export default class SelectItem extends Component {
    render() {
        return (
            <TouchableHighlight underlayColor="#E6E6E6" onPress={this.props.onPress}>
                <View style={selectItemStyle.item}>
                    <View style={selectItemStyle.container}>
                        <Image source={this.props.icon} style={selectItemStyle.img} />
                        <Text style={selectItemStyle.title}>{this.props.title}</Text>
                        <Image source={Images.other_right} style={selectItemStyle.skipImg} />
                    </View>
                    {this.props.showline ? <View style={selectItemStyle.underline} /> : <View />}
                </View>
            </TouchableHighlight>
        )
    }
}