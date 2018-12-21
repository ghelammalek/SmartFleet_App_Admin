import { StyleSheet, Dimensions } from 'react-native';

export default changeViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
    },
    itemView_: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
    },
    title: {
        flex: 1,
        fontSize: 14,
        color: '#1c1c1d',
        fontWeight: 'bold',
    },
    subTitle: {
        flex: 0,
        fontSize: 13,
        color: '#9797a3',
    },
    imageRight: {
        width: 10,
        height: 15,
        resizeMode: 'contain',
        marginLeft: 6,
        // backgroundColor: 'green',
    },
    imageLeft: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginRight: 8,
    },
    leftView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    rightView: {
        flex: 2,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
})