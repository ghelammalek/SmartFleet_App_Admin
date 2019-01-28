import React, { Component } from 'react';

import {
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
} from 'react-native';

import Images from '../constants/Images';
import I18n from '../language/index';
import { isEmpty } from "../utils";
import PropTypes from "prop-types";

export default class CopyBtn extends Component {
    static propTypes = {
        ...View.propTypes,
        backgroundColor: PropTypes.string,
        onPress: PropTypes.func,
        titles: PropTypes.array,
        images: PropTypes.array,
        arrowStyle: PropTypes.object,
        style: PropTypes.object,
        titleStyle: PropTypes.object,
    };

    static defaultProps = {
        backgroundColor: 'white',
        titles: [],
        images: [],
        arrowStyle: null,
        style: null,
        titleStyle: null,
    }
    constructor(props) {
        super(props)
    }
    getItems(items) {
        if (items && items.length > 0) {
            return items.map((item, index) =>
                <TouchableOpacity key={index}
                    style={[styles.btnView, { borderTopWidth: index === 0 ? 0 : 1 }]} activeOpacity={1} onPress={() => this.props.onPress(index)}>
                    {
                        this.props.images && this.props.images.length === items.length ?
                            <View >
                                <Image style={styles.image}
                                    source={this.props.images[index]}
                                />
                            </View> : <View />
                    }
                    <View>
                        <Text style={[styles.title, this.props.titleStyle]}>{item}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <View />
        }
    }
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={[styles.arrow, { borderBottomColor: this.props.backgroundColor }, this.props.arrowStyle]} />
                <View style={[styles.context, { backgroundColor: this.props.backgroundColor }]}>
                    {
                        this.getItems(this.props.titles)
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    context: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 5,
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderBottomColor: 'black',
        borderBottomWidth: 10,
    },
    btnView: {
        flexDirection: 'row',
        minHeight: 30,
        minWidth: 60,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#f3f3f3',
        maxWidth: Dimensions.get('window').width * 2 / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: '#2d2d2d',
    },
    image: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    }
});