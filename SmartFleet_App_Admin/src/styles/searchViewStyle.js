import { StyleSheet, Dimensions } from "react-native";

export default selectCompanyStyle = StyleSheet.create({
    container: {
        // flex: 1,
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        // backgroundColor: 'red'
    },
    image: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },
    textInput: {
        flex: 1,
        height: 40,
        fontSize: 14,
        color: '#2d2d2d',
        marginLeft: 8,
    },
    searchBtn: {
        fontSize: 14,
        color: '#2d2d2d',
        fontWeight: "bold",
    },
    searchBtnView: {
        paddingRight: 20,
        paddingLeft: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: '#2d2d2d',
        marginLeft: 8,
    },
    text_: {
        fontSize: 14,
        color: '#adadad',
        marginLeft: 8,
    }
})