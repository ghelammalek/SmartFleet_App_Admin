/*
 * @Author: mikey.zhanglf 
 * @Date: 2018-07-20 09:51:15 
 * @Last Modified by: mikey.zhanglf
 * @Last Modified time: 2018-12-24 11:33:33
 */


var Global = {
    serverIP: 'http://cd.inhandcloud.com:20080',
    client_id: '17953450251798098136',
    client_secret: '08E9EC6793345759456CB8BAE52615F3',
    ios_download_url: 'https://gehc-dev.inhand.com.cn:8443/release/ios/SmartFleet_App_Admin/app.html',
    ios_version_url: 'https://gehc-dev.inhand.com.cn:8443/release/ios/SmartFleet_App_Admin/version.json',
    android_download_url: 'https://gehc-dev.inhand.com.cn:8443/release/android/SmartFleet_App_Admin/app.html',
    android_version_url: 'https://gehc-dev.inhand.com.cn:8443/release/android/SmartFleet_App_Admin/version.json',
    languageCode: {
        unselected: '',
        Chinese: 'zh',
        English: 'en'
    },
    nopermision_code: 10005,
    isAlert: true,
    languages: [
        {
            name: '中文',
            id: 'zh-Hans-CN',
        },
        {
            name: 'English',
            id: 'en-US',
        },
    ],
    global: {

    }
};
module.exports = Global;