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
        padding: 10,
    },
    itemView: {
        width: Dimensions.get('window').width - 20,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        borderWidth: 1,
        borderRadius: 3,
        marginVertical: 5,
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