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
 *   获取access_token
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
exports.getAccessToken = function (username, password) {
    const url = "/oauth2/access_token?" +
        "client_id=" + Global.client_id +
        "&client_secret=" + Global.client_secret +
        "&grant_type=password" +
        "&username=" + username +
        "&password=" + md5.b64_md5(password) +
        "&password_type=2";
    return request.post(url, null, false, HEADER_FORM);
};