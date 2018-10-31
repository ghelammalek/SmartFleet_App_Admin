import {
    StyleSheet,
    Dimensions
} from 'react-native';

export default fullViewStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    topImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        resizeMode: 'contain',
        backgroundColor: '#f3f3f3',
    },
    itemView: {
        flexDirection: 'row',
        height: 44,
        width: Dimensions.get('window').width,
        paddingLeft: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
    },
    itemTitle: {
        marginRight: 14,
        fontSize: 14,
        color: '#9797a3',
    },
    itemRightView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    itemTextInput: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: '#1c1c1d',
        padding: 0,
    },
    itemImageView: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    centter: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnView: {
        width: Dimensions.get('window').width - 40,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#24ba8e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    space: {
        width: 8,
    },

})