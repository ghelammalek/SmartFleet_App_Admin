import { StyleSheet, Dimensions } from "react-native";

export default settingStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 15,
    },
    bodyView: {
        width: Dimensions.get('window').width - 30,
        marginTop: 15,
        // paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        borderWidth: 1,
        borderRadius: 5,
    },
    title1: {
        fontSize: 12,
        color: '#1c1c1d',
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 14,
        color: '#1c1c1d',
        fontWeight: 'bold',
    },
    title3: {
        fontSize: 14,
        color: '#1c1c1d',
    },
    btnView: {
        marginTop: 60,
        marginBottom: 40,
        marginHorizontal: 5,
        borderRadius: 5,
        height: 40,
        backgroundColor: '#24ba8e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    view_20: {
        width: 10,
        height: 20,
    },
    view_30: {
        width: 10,
        height: 30,
    },
    titleView: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f7f7f7',
        paddingHorizontal: 15,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: '#dfdfdf',
    },
    versionView: {
        height: 22,
        paddingHorizontal: 8,
        // paddingVertical: 3,
        backgroundColor: 'red',
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    versionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },

    logo: {
        width: Dimensions.get('window').width - 30,
        height: 200,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    logoTitle: {
        fontSize: 16,
        color: '#1c1c1d',
    },
    btnView_: {
        marginTop: 40,
        marginBottom: 40,
        marginHorizontal: 5,
        borderRadius: 5,
        height: 40,
        backgroundColor: '#24ba8e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    space: {
        flex: 1,
        height: 1,
        backgroundColor: '#f7f7f7',
    }
})