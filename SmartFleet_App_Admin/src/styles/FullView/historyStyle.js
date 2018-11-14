import {
    StyleSheet,
    Dimensions
} from 'react-native';

export default historyStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    TabBarTop: {
        height: 40,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
    },
    topView: {
        width: Dimensions.get('window').width,
        height: 44,
        backgroundColor: '#fff',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
    },
    siftBtnView: {
        // flex: 1,
        minWidth: 80,
        flexDirection: 'row',
        height: 44,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    siftBtnImage: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    datePicker: {
        height: 40,
        width: Dimensions.get('window').width / 2,
    },
    siftView: {
        top: 1,
        // backgroundColor: 'green',
        width: Dimensions.get('window').width,
        backgroundColor: 'red',
        position: 'absolute',
        marginTop: 83,
    },
    timeTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d2d2d',
    },
    timeLable: {
        fontSize: 14,
        color: '#24ba8e',
    },
    body: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },

})