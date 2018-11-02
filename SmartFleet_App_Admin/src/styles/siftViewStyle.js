import { StyleSheet, Dimensions, Platform } from 'react-native';

export default siftViewStyle = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        top: 0,
        // backgroundColor: 'green',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - (49 + 44 + 20),
    },
    backgroundView: {
        flex: 1,
        backgroundColor: 'rgba(28,28,29,0.3)',
    },
    bodyView: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2d2d2d',
        marginTop: 15,
        marginBottom: 12,
    },
    wrapView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemView: {
        height: 30,
        paddingHorizontal: 12,
        marginRight: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemView_: {
        height: 30,
        paddingHorizontal: 12,
        marginRight: 12,
        backgroundColor: '#24ba8e',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemText: {
        fontSize: 14,
        color: '#2d2d2d',
    },
    itemText_: {
        fontSize: 14,
        color: '#fff',
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    timeTitle: {
        fontSize: 14,
        color: '#adadad',
        marginRight: 12,
    },
    timeText: {
        fontSize: 12,
        color: '#2d2d2d',
    },
    btnView: {
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    resetView: {
        height: 40,
        width: (Dimensions.get('window').width - 36) / 2,
        borderColor: '#24ba8e',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmView: {
        height: 40,
        width: (Dimensions.get('window').width - 36) / 2,
        backgroundColor: '#24ba8e',
        borderColor: '#24ba8e',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reset: {
        fontSize: 16,
        color: '#24ba8e',
        fontWeight: 'bold',
    },
    confirm: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    separator: {
        width: Dimensions.get('window').width,
        marginLeft: -12,
        height: 0.5,
        backgroundColor: '#e7e7e7',
    },
    separator_: {
        width: Dimensions.get('window').width - 24,
        height: 0.5,
        backgroundColor: '#e7e7e7',
    },
    bottomView: {
        flex: 1,
        minHeight: 50,
        backgroundColor: 'red',
    },
})