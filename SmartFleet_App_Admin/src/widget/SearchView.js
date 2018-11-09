import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Images from '../constants/Images';
import styles from '../styles/searchViewStyle';
import { connect } from '../routes/dva';
import I18n from '../language/index';
import { isEmpty } from '../utils/index';
import Global from '../utils/Global';


export default class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: '',
        }
    }
    render() {
        return (
            <View>
                {
                    this.state.isEdit ?
                        <View style={[styles.container, styles.style]}>
                            <Image source={Images.other_search_light} style={styles.image} />
                            {
                                Platform.OS == 'ios' ?
                                    <TextInput
                                        style={[styles.textInput, this.props.textInput]}
                                        placeholder={this.props.placeholder}
                                        placeholderTextClolor='#adadad'
                                        underlineColorAndroid="transparent"
                                        returnKeyType='search'
                                        editable={!this.props.editable}
                                        value={this.state.value}
                                        autoFocus={this.state.isEdit}
                                        onFocus={() => this.setState({ value: '' })}
                                        onEndEditing={(evt) => this.setState({ value: evt.nativeEvent.text, isEdit: false })}
                                        clearButtonMode={'while-editing'}
                                        onChangeText={this.props.onChangeText}
                                        onSubmitEditing={this.props.onSubmitEditing}
                                    /> :
                                    <TextInput
                                        style={[styles.textInput, this.props.style]}
                                        placeholder={this.props.placeholder}
                                        placeholderTextClolor='#adadad'
                                        underlineColorAndroid="transparent"
                                        returnKeyType='search'
                                        editable={!this.props.editable}
                                        value={this.state.value}
                                        onFocus={() => this.setState({ value: '' })}
                                        onEndEditing={(evt) => this.setState({ value: evt.nativeEvent.text, isEdit: false })}
                                        clearButtonMode={'while-editing'}
                                        onChangeText={this.props.onChangeText}
                                        onSubmitEditing={this.props.onSubmitEditing}
                                    />
                            }
                        </View> :
                        <TouchableOpacity style={[styles.container, styles.style]} onPress={() => this.setState({ isEdit: true, value: '' })}>
                            <Image source={Images.other_search_light} style={styles.image} />
                            {
                                isEmpty(this.props.value) ?
                                    <Text style={styles.text_}>{this.props.placeholder}</Text> :
                                    <Text style={styles.text}>{this.props.value}</Text>
                            }

                        </TouchableOpacity>
                }
            </View>
        )
    }
}