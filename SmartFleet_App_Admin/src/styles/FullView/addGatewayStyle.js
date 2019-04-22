import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native'

export default addGatewayStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleView: {
        marginTop: 30,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        color: '#1c1c1d',
        fontWeight: 'bold'
    },
    subtitleView: {
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 14,
        color: '#9797a3',
    },
    scanImageView: {
        width: 80,
        height: 80,
        marginBottom: 8,
    },
    textInputView: {
        marginVertical: 16,
    },
    textInput: {
        width: 160,
        height: 40,
        fontSize: 14,
        textAlign: 'center',
        color: '#1c1c1d',
        borderColor: '#9797a3',
        borderWidth: 1,
        borderRadius: 3,
    },
    submitView: {
        marginTop: 40,
        height: 44,
        width: Dimensions.get('window').width - 60,
        borderRadius: 5,
        backgroundColor: '#24ba8e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submit: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
});