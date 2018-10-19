import I18n from 'react-native-i18n';
import en from './en';
import zh from './zh';

// I18n.defaultLocale = 'zh';
I18n.fallbacks = true;

I18n.translations = {
    'en': en,
    'zh': zh,
};

export default I18n;