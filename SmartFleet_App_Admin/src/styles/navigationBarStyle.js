import { StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';

const TITLE_OFFSET = 70;
export default navigationBarStyle = StyleSheet.create({
    container: {
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Platform.OS == 'ios' ? 64 : 44,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: Platform.OS == 'ios' ? 20 : 0,
        backgroundColor: '#fff',
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 0.5,
    },
    title: {
        fontSize: 18,
        color: '#1c1c1d',
        fontWeight: 'bold',
    },
    imageView: {
        width: Platform.OS === 'android' ? 56 : 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    }
});
