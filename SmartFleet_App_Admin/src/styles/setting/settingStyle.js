import { StyleSheet, Dimensions } from "react-native";

export default settingStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 12,
    },
    bodyView: {
        width: Dimensions.get('window').width - 30,
        marginTop: 12,
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        borderWidth: 1,
        borderRadius: 5,
    },
    title1: {
        fontSize: 12,
        color: '#2d2d2d',
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 14,
        color: '#2d2d2d',
        fontWeight: 'bold',
    },
    title3: {
        fontSize: 14,
        color: '#2d2d2d',
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
        borderBottomColor: '#f3f3f3',
        paddingHorizontal: 12,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 12,
    },
    itemLeftView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemLeftImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 5,
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
        height: 250,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 88,
        height: 88,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',
    },
    logoTitle: {
        fontSize: 18,
        color: '#2d2d2d',
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
        backgroundColor: '#f3f3f3',
    }
})