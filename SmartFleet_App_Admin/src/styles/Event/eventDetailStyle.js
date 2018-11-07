import {
    StyleSheet,
    Dimensions,
} from 'react-native';


export default eventDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 10,
    },
    map: {
        width: Dimensions.get('window').width,
        // height: 180,
        flex: 1,
    },
    itemView: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        position: 'absolute',
        borderWidth: 1,
        borderRadius: 3,
        // marginVertical: 10,
        bottom: 10,
    },
    itemView_: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        // position: 'absolute',
        borderWidth: 1,
        borderRadius: 3,
        marginVertical: 10,
        // top: 10,
    },
    itemText: {
        fontSize: 14,
        color: '#2d2d2d',
    },
    clearBtnView: {
        width: Dimensions.get('window').width - 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24ba8e',
        marginTop: 30,
        marginBottom: 40,
        marginHorizontal: 10,
        borderRadius: 3,
    },
    clearBtnView_: {
        width: Dimensions.get('window').width - 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#adadad',
        marginTop: 30,
        marginBottom: 40,
        marginHorizontal: 10,
        borderRadius: 3,
    },
    clearBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});