import RNFetchBlob from 'react-native-fetch-blob';
import Global from '../utils/Global';
import moment from 'moment';
import { isEmpty } from '../utils/index';
import request from './request';
import md5 from '../utils/md5';


const HEADER_FORM = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
};

const HEADER_JSON = {
    'Accept': 'application/json',
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