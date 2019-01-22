import RNFetchBlob from 'react-native-fetch-blob';
import Global from '../utils/Global';
import config from '../utils/config';
import moment from 'moment';
import { isEmpty } from '../utils/index';
import request from './request';
import md5 from '../utils/md5';
import I18n from '../language/index'


const HEADER_FORM = {
    'Accept': 'application/json;charset=utf-8',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
};

const HEADER_JSON = {
    'Accept': 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8'
};

/**
 *  获取验证码
 *
 * @param {*} phone
 * @returns
 */
exports.getCode = function (phone) {
    const url = '/api/sms/code?phone=%2B86' + phone;
    return request.get(url, null, false, HEADER_JSON);
};

/**
 *  通过短信验证码获取access_token
 *
 * @param {*} params
 * @returns
 * payload.tel, payload.smscode
 */
exports.getAccessToken_code = function (params) {
    const url = "/oauth2/access_token?" +
        "client_id=" + Global.client_id +
        "&client_secret=" + Global.client_secret +
        "&grant_type=password" +
        "&mobile[country]=" + params.country +
        "&mobile[phone]=" + params.tel +
        "&captcha=" + params.smscode +
        "&type=mobile&autoLogin=true" +
        "&username=" + params.country + params.tel +
        "&password=" + params.smscode +
        "&password_type=4";
    return request.post(url, null, false, HEADER_FORM);
};

/**
 *   通过账号密码获取access_token
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
exports.getAccessToken = function (username, password) {
    const url = "/oauth2/access_token?" +
        "client_id=" + Global.client_id +
        "&client_secret=" + Global.client_secret +
        "&grant_type=password&type=account" +
        "&username=" + username +
        "&password=" + password +
        "&password_type=2&language=2&autoLogin=true";
    return request.post(url, null, false, HEADER_FORM);
};

/**
 *    验证手机号
 *
 * @param {*} phone
 * @returns
 */
exports.validatePhone = function validatePhone(phone) {
    const url = "/api/phone/validate?phone=" + encodeURIComponent(phone);
    return request.get(url, null, false, HEADER_JSON);
}
/**
 *   获取随机码图片id
 *
 * @returns
 */
exports.getImageCode = function getImageCode() {
    const url = "/api/captchas";
    return request.get(url, null, false, HEADER_JSON);
}

/**
 *   获取随机码图片
 *
 * @returns
 */
exports.getImage = function getImage(params) {
    const url = "/api/captchas/image?pid=" + params.pid +
        "&width=" + params.width +
        "&height=" + params.height;
    return request.get(url, null, false, HEADER_JSON);
}

/**
 *   重置密码
 *   captcha: "zuxuq"
 *   email: "zhanglf@inhand.com.cn"
 *   language: 2
 *   picId: "IabrUVxEH"
 *   username: "zhanglf@inhand.com.cn"
 *   varificationCode: "zuxuq"
 *
 * @returns
 */
exports.forgotten_password = function forgotten_password(params) {
    const url = "/api2/forgotten_password";
    return request.post(url, params, false, HEADER_JSON);
}


/**
 *    获取车辆的统计数据
 *
 *  * @param {*} queryType
 * @returns
 */
exports.getStatistics = function (queryType, plateNo) {

    let url = '/api/statistics/vehicle/accumulation?queryType=' + queryType;
    if (plateNo) {
        url = url + '&plateNo=' + encodeURIComponent(plateNo);
    }
    return request.get(url, null, true, HEADER_JSON);
}

/**
 *    获取车辆的统计数据
 *
 *  * @param {*} queryType
 * @returns
 */
exports.getStatisticsTime = function (params) {
    let url = '/api/statistics/vehicle/accumulation?queryType=' + params.queryType
        + '&startTime=' + params.begin
        + '&endTime=' + params.end;
    if (params.plateNo) {
        url = url + '&plateNo=' + encodeURIComponent(params.plateNo);
    }
    return request.get(url, null, true, HEADER_JSON);
}
/**
 *   获取车辆的列表信息
 *
 * @param {*} 
 * @returns
 */
exports.getSites = function () {
    const url = '/api/general/sites?cursor=0&limit=100000000&mapType=' + config.mapType;
    return request.get(url, null, true, HEADER_JSON);
}


/**
 *    获取车辆的详情
 *
 * @param {*} params
 * @returns
 */
exports.getSiteDetail = function getSiteDetail(params) {
    const url = '/api/v2/sites/' + encodeURIComponent(params.plateNo) + '?mapType=' + config.mapType;
    return request.get(url, null, true, HEADER_JSON);
}


/**
 *    获取车辆的实时数据
 *
 * @param {*} params
 * @returns
 */
exports.getSiteData = function getSiteData(params) {
    const url = '/api/iot/modules/' + params.mid +
        '/sense?mapType=' + config.mapType;
    return request.get(url, null, true, HEADER_JSON);
}


/**
 *    获取车辆的趋势数据
 *
 * @param {*} params
 * @returns
 */
exports.getSiteTrend = function getSiteTrend(params) {
    const url = '/api/iot/modules/' + encodeURIComponent(params.plateNo) + '/series?'
        + 'metric=' + params.metric
        + '&fields=' + params.fields
        + '&start=' + params.start
        + '&end=' + params.end
        + '&function=' + params.function
        + '&interval=' + params.interval;
    return request.get(url, null, true, HEADER_JSON);
}

/**
 *    获取车辆的轨迹数据
 *
 * @param {*} params
 * @returns
 */
exports.getSiteTracks = function getSiteTracks(params) {
    const url = '/api/sites/' + encodeURIComponent(params.plateNo) + '/tracks?'
        + '&start=' + params.start
        + '&end=' + params.end
        + '&mapType=' + config.mapType
    return request.get(url, null, true, HEADER_JSON);
}

/**
 *   获取车辆的事件列表
 *
 * @param {*} 
 * @returns
 */
exports.getAlerts = function (params) {
    const language = I18n.locale.indexOf('zh') > -1 ? 'zh_CN' : 'en_US';
    const url = '/api/sites/alerts?cursor=' + params.cursor +
        '&limit=' + params.limit +
        '&mapType=' + config.mapType +
        '&language=' + language;
    return request.post(url, params.body, true, HEADER_JSON);
}


/**
 *   确认事件
 *
 * @param {*} _id
 * @returns
 */
exports.postAlert = function (_id) {
    const language = I18n.locale.indexOf('zh') > -1 ? 'zh_CN' : 'en_US';
    const url = '/api/alerts/' + _id + '/confirm?' +
        'language=' + language;
    return request.post(url, null, true, HEADER_JSON);
}






/**
 *   注册车辆
 *
 * @param {*} params
 * @returns
 */
exports.register = function (params) {
    const url = '/dapi/sites?sn=' + params.sn +
        '&auth=' + params.email +
        '&sign=' + md5.hex_md5(params.sn + params.email + '64391099@inhand');
    var labels = { labels: params.body };
    return request.post(url, labels, true, HEADER_JSON);
}












/**
 *  获取机构设置信息
 *
 * @returns
 */
exports.getSettingInfo = function () {
    const url = '/api/setting';
    return request.get(url, null, true, HEADER_JSON);
}


/**
 *  获取用户信息
 *
 * @returns
 */
exports.getUserInfo = function () {
    const url = '/api2/users/this?verbose=100';
    return request.get(url, null, true, HEADER_JSON);
}

/**
 *   获取版本号
 *
 * @returns
 */
exports.getVersion = function () {
    const url = config.ios_version_url + '?ts=' + moment().unix();
    return request.getServerIps(url, null, false, HEADER_JSON);
}

/** 
 *   退出登录
 *
 * @returns
 */
exports.loginOut = function () {
    const url = '/api2/logout';
    return request.post(url, null, true, HEADER_JSON);
}