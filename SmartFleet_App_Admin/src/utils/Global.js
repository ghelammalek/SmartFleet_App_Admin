/*
 * @Author: mikey.zhanglf 
 * @Date: 2018-07-20 09:51:15 
 * @Last Modified by: mikey.zhanglf
 * @Last Modified time: 2018-10-19 14:34:26
 */



var Global = {
    serverIP: 'http://47.104.125.62:8090',
    client_id: '17953450251798098136',
    client_secret: '08E9EC6793345759456CB8BAE52615F3',
    ios_download_url: '',
    ios_version_url: '',
    android_download_url: '',
    android_version_url: '',
    languageCode: {
        unselected: '',
        Chinese: 'zh',
        English: 'en'
    },
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
};
module.exports = Global;