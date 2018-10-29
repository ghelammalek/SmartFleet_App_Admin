import { StyleSheet, Dimensions } from "react-native";

export default settingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title1: {
        fontSize: 14,
        color: '#1c1c1d',
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 14,
        color: '#1c1c1d',
    },
    title3: {
        fontSize: 14,
        color: '#9797a3',
    },
    btnView: {
        marginTop: 70,
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
        height: 40,
        justifyContent: 'center',
    },
    bodyView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf',
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
        width: Dimensions.get('window').width,
        height: 100,
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    btnView_: {
        marginTop: 30,
        // marginBottom: 40,
        marginHorizontal: 5,
        borderRadius: 5,
        height: 40,
        backgroundColor: '#24ba8e',
        justifyContent: 'center',
        alignItems: 'center',
    },

})