import { StyleSheet } from "react-native";
import Dime from '../../constants/dimission';
import { Dimensions } from 'react-native';

export default selectCompanyStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchView: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        paddingLeft: 20,
    },
    image: {
        width: 20,
        height: 16,
        margin: 10,
        resizeMode: 'contain',
    },
    searchBar: {
        flex: 1,
        height: 40,
        marginLeft: -40,
        marginRight: 10,
        paddingLeft: 40,
        fontSize: 14,
        borderColor: '#979797',
        borderWidth: 1,
        borderRadius: 5,
    },
    searchBtn: {
        fontSize: 16,
        color: '#1c1c1d',
        fontWeight: "bold",
    },
    searchBtnView: {
        paddingRight: 20,
        paddingLeft: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        backgroundColor: '#dfdfdf',
        height: 1,
    },
    itemView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        height: 55,
    },
    itemText: {
        fontSize: 14,
        color: '#1c1c1d',
    },
    loadingBg: {

        width: Dimensions.get('window').width,
        height: Dime.window.height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    loadingView: {
        width: 100,
        height: 100,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
    },
})