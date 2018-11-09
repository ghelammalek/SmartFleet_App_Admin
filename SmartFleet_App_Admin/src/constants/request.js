import RNFetchBlob from 'react-native-fetch-blob';
import { NavigationActions, StackActions } from 'react-navigation';
import moment from 'moment';
import Global from '../utils/Global';
import { isEmpty, createAction } from '../utils/index';


const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const signin = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login' })
    ]
});

const main = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main' })
    ]
});

const HEADER_FORM = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
};

const HEADER_JSON = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
};
function getServerIP() {
    if (isEmpty(Global.cfg.serverIP)) {
        return Global.global.server;
    } else {
        return Global.cfg.serverIP;
    }
}
/**
 * 刷新token(自动检查token时用)
 * @param params 
 */
function refreshToken(method, url1, header, body, hasToken) {
    const url = getServerIP() + "/oauth2/access_token?" +
        "client_id=" + Global.client_id +
        "&client_secret=" + Global.client_secret +
        "&grant_type=refresh_token" +
        "&refresh_token=" + Global.cfg.refresh_token;

    return RNFetchBlob.config({ timeout: 15000 })
        .fetch(POST, url, HEADER_FORM)
        .then((response) => response.json())
        .then((data) => {
            try {
                if (data.error) {
                    console.log('刷新token失败了');
                    console.log(data);

                    Global.cfg.access_token = '';
                    Global.cfg.refresh_token = '';
                    Global.cfg.setRunningConfig();
                    Global.global.navigation.dispatch(signin);
                    return data;
                } else {
                    console.log('刷新token成功了');
                    console.log(data);
                    Global.cfg.access_token = data.access_token;
                    Global.cfg.refresh_token = data.refresh_token;
                    Global.cfg.expires_in = data.expires_in;
                    Global.cfg.create_token_time = moment().unix();

                    Global.cfg.setRunningConfig();
                    return request(method, url1, header, body, hasToken);
                }
            } catch (e) {
                console.log('刷新token崩溃了');
                console.log(e);
                Global.cfg.access_token = '';
                Global.cfg.refresh_token = '';
                Global.cfg.setRunningConfig();
                return { error: e };
            }
        })
        .catch((e) => {
            Global.cfg.access_token = '';
            Global.cfg.refresh_token = '';
            Global.cfg.setRunningConfig();
            Global.global.navigation.dispatch(signin);
            console.log('刷新token崩溃了');
            console.log(e);
            return { error: e };
        });
}

/**
 * 发网络请求
 * @param method
 * @param url
 * @param header
 * @param body
 * @param hasToken
 * @returns {Promise.<TResult>}
 */
function request(method, url1, header, body, hasToken) {
    var url = url1;
    if (hasToken) {
        url.indexOf('?') === -1 ? url += '?' : url += '&';
        url += ('access_token=' + Global.cfg.access_token);
    }
    url = getServerIP() + url;
    return RNFetchBlob.config({ timeout: 15000 })
        .fetch(method, url, header, JSON.stringify(body))
        .then((response) => response.json())
        .then((data) => {
            try {
                console.log(JSON.stringify(body));
                if (data.error) {
                    if (data.error_code === 21327 || data.error_code === 21336 || data.error_code === 21337 || data.error_code === 21338) {
                        console.log('失败了' + url);
                        console.log(data);
                        return refreshToken(method, url1, header, body, hasToken);
                    }
                    console.log('失败了' + url);
                    console.log(data);
                    return data;
                } else {
                    console.log('成功了' + url);
                    console.log(data);
                    return data;
                }
            } catch (err) {
                console.log('失败了' + url);
                console.log({ error: err });
                return { error: err };
            }
        })
        .catch((err) => {
            console.log('崩溃了' + url);
            console.log({ error: err });
            return { error: err };
        });
}
function request_(method, url1, header, body, hasToken) {
    var url = url1;
    return RNFetchBlob.config({ timeout: 15000 })
        .fetch(method, url, header, JSON.stringify(body))
        .then((response) => response.json())
        .then((data) => {
            try {
                if (data.error) {
                    //console.log('失败了' + url);
                    return data;
                }
                //console.log('成功了' + url);
                //console.log(data);
                return data;
            } catch (err) {
                //console.log('失败了' + url);
                return { error: err };
            }
        })
        .catch((err) => {
            //console.log('崩溃了' + url);
            return { error: err };
        });
}
exports.getServerIps = function (url, body, hasToken, header = HEADER_FORM) {
    return request_(GET, url, header, body, hasToken);
};
/**
 * 检查token并发起请求
 * @param method
 * @param url
 * @param header
 * @param body
 * @param hasToken
 */
function checkTokenAndRequest(method, url, header, body, hasToken) {
    let createTime = Global.cfg.create_token_time;
    let expires_in = Global.cfg.expires_in;
    let nowTime = moment().unix();

    if (hasToken && nowTime - createTime >= expires_in) {
        refreshToken(method, url, header, body, hasToken);
    } else {
        return request(method, url, header, body, hasToken)
    }
}

/**
 * get请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.get = function (url, body, hasToken, header = HEADER_FORM) {
    return checkTokenAndRequest(GET, url, header, body, hasToken);
};

/**
 * post请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.post = function (url, body, hasToken, header = HEADER_JSON) {
    return checkTokenAndRequest(POST, url, header, body, hasToken);
};

/**
 * put请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.put = function (url, body, hasToken, header = HEADER_JSON) {
    return checkTokenAndRequest(PUT, url, header, body, hasToken);
};

/**
 * delete请求
 * @param url api地址
 * @param body 请求体
 * @param hasToken 是否需要token
 * @param header 请求头
 */
exports.delete = function (url, body, hasToken, header = HEADER_JSON) {
    return checkTokenAndRequest(DELETE, url, header, body, hasToken);
};

/**
 * 启动时刷新token用
 */
// exports.getNewToken = function () {
//     const url = getServerIP() + "/oauth2/access_token?" +
//         "client_id=" + Global.client_id +
//         "&client_secret=" + Global.client_secret +
//         "&grant_type=refresh_token" +
//         "&refresh_token=" + Global.cfg.refresh_token;

//     RNFetchBlob.config({ timeout: 20000 })
//         .fetch(POST, url, HEADER_FORM)
//         .then((response) => response.json())
//         .then((data) => {
//             try {
//                 if (data.error === undefined) {
//                     Global.cfg.access_token = data.access_token;
//                     Global.cfg.refresh_token = data.refresh_token;
//                     Global.cfg.expires_in = data.expires_in;
//                     Global.cfg.create_token_time = moment().unix();

//                     Global.cfg.setRunningConfig();
//                     Global.global.navigation.dispatch(main);
//                 } else {
//                     Global.global.navigation.dispatch(signin);
//                 }
//             } catch (e) {
//                 return { error: e };
//             }
//         })
//         .catch(function (e) {
//             Global.global.navigation.dispatch(signin);
//         });
// };


