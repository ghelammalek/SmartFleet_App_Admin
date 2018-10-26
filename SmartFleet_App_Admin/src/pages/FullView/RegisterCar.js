import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { connect } from '../../routes/dva';
import NavigationBar from '../../widget/NavigationBar';
import LoadingView from "../../widget/LoadingView";
import { isEmpty, createAction } from '../../utils/index';
import Images from '../../constants/Images';
import I18n from '../../language/index';
import Global from '../../utils/Global';
import setting from '../../utils/setting';
import moment from 'moment';
import ihtool from '../../utils/ihtool';
import styles from '../../styles/FullView/registerCarStyle';

class RegisterCar extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '添加车辆',
        headerBackTitle: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            plateNo: '豫G98333',
            asset_no: '11021212',
            sn: 'IR911-338299',
            type: 'IR911',
            email: Global.cfg.userInfo.email,
        }
    }
    goRegisterCar(value) {
        if (value == 1) {
            this.props.navigation.navigate('ScanView', {
                callback: (backdata) => {
                    this.setState({
                        asset_no: backdata,
                    })
                }
            });
        } else {

            this.props.navigation.navigate('ScanView', {
                callback: (backdata) => {
                    this.setState({
                        sn: backdata,
                    })
                }
            });
        }
    }
    addImage() {

    }
    submit() {
        if (this.state.plateNo == '') {
            Alert.alert('温馨提示', '请填写车牌号', [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else if (this.state.grayway == '') {
            Alert.alert('温馨提示', '请填写网关序列号', [{ text: I18n.t('okText'), onPress: () => { } },]);
        } else {
            this.props.dispatch({
                type: 'registerCar/register',
                payload: {
                    sn: this.state.grayway,
                    email: this.state.email,
                    body: {
                        prodcut: 'smartfleet.gateway',
                        site_name: this.state.plateNo,
                        asset_no: this.state.asset_no
                    }
                },
                that: this,
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} bounces={false} >
                    <View style={styles.topView}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.addImage()} >
                            <Image source={Images.other_default_car} style={styles.topImage} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemTitle}>{'车牌号'}</Text>
                        <View style={styles.itemRightView}>
                            <TextInput
                                style={styles.itemTextInput}
                                value={this.state.plateNo}
                                placeholder={'请填写'}
                                placeholderTextClolor='#979797'
                                // editable={!this.props.visible}
                                underlineColorAndroid="transparent"
                                onEndEditing={(evt) => { this.setState({ plateNo: evt.nativeEvent.text }) }}
                            />
                            <View style={styles.space} />
                        </View>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemTitle}>{'资产编号'}</Text>
                        <View style={styles.itemRightView}>
                            <TextInput
                                style={styles.itemTextInput}
                                value={this.state.asset_no}
                                placeholder={'请填写'}
                                placeholderTextClolor='#979797'
                                // editable={!this.props.visible}
                                underlineColorAndroid="transparent"
                                onEndEditing={(evt) => this.setState({ asset_no: evt.nativeEvent.text })}
                            />
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.goRegisterCar(1)} >
                                <View style={styles.itemImageView}>
                                    <Image style={styles.itemImage} source={Images.other_scan} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemTitle}>{'网关序列号'}</Text>
                        <View style={styles.itemRightView}>
                            <TextInput
                                style={styles.itemTextInput}
                                value={this.state.sn}
                                placeholder={'请填写'}
                                placeholderTextClolor='#979797'
                                // editable={!this.props.visible}
                                underlineColorAndroid="transparent"
                                onEndEditing={(evt) => this.setState({ sn: evt.nativeEvent.text })}
                            />
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.goRegisterCar(2)} >
                                <View style={styles.itemImageView}>
                                    <Image style={styles.itemImage} source={Images.other_scan} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemTitle}>{'网关型号'}</Text>
                        <View style={styles.itemRightView}>
                            <TextInput
                                style={styles.itemTextInput}
                                value={this.state.type}
                                placeholder={'请填写'}
                                placeholderTextClolor='#979797'
                                // editable={!this.props.visible}
                                underlineColorAndroid="transparent"
                                onEndEditing={(evt) => this.setState({ type: evt.nativeEvent.text })}
                            />
                            <View style={styles.space} />
                        </View>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemTitle}>{'账号'}</Text>
                        <View style={styles.itemRightView}>
                            <TextInput
                                style={styles.itemTextInput}
                                value={this.state.email}
                                placeholderTextClolor='#979797'
                                editable={false}
                                underlineColorAndroid="transparent"
                            />
                            <View style={styles.space} />
                        </View>
                    </View>
                    <View style={styles.centter}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.submit()} >
                            <View style={styles.btnView}>
                                <Text style={styles.btnTitle}>{'提交'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {
                    this.props.isLoading ? <LoadingView /> : <View />
                }
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoading: state.registerCar.isLoading,
    }
}
export default connect(mapStateToProps)(RegisterCar);