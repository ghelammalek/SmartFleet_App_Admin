import RNFetchBlob from 'react-native-fetch-blob';
import Global from '../utils/Global';
import config from '../utils/config';
import moment from 'moment';
import { isEmpty } from '../utils/index';
import request from './request';
import md5 from '../utils/md5';


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
    const url = '/api/sms/code?phone=' + phone;
    return request.get(url, null, false, HEADER_JSON);
};

/**
 *  通过短信验证码获取access_token
 *
 * @param {*} country
 * @param {*} tel
 * @param {*} code
 * @returns
 */
exports.getAccessToken_code = function (country, tel, code) {
    const url = "/oauth2/access_token?" +
        "client_id=" + Global.client_id +
        "&client_secret=" + Global.client_secret +
        "&grant_type=password" +
        "&mobile[country]=" + country +
        "&mobile[phone]=" + tel +
        "&captcha=" + code +
        "&type=mobile&autoLogin=true" +
        "&username=+" + country + tel +
        "&password=" + code +
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
    const url = '/api/iot/modules/' + params.mid + '/sense';
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
    const url = '/api/sites/alerts?cursor=' + params.cursor +
        '&limit=' + params.limit + '&mapType=' + config.mapType;
    return request.post(url, params.body, true, HEADER_JSON);
}


/**
 *   确认事件
 *
 * @param {*} _id
 * @returns
 */
exports.postAlert = function (_id) {
    const url = '/api/alerts/' + _id + '/confirm';
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