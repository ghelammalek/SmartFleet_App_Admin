/*
 * @Author: mikey.zhanglf 
 * @Date: 2018-07-19 15:00:08 
 * @Last Modified by: mikey.zhanglf
 * @Last Modified time: 2018-10-19 17:14:06
 */
'use strick';

var AsyncStorage = require('react-native').AsyncStorage;
let Global = require('./Global');

class Settings {
    constructor() {
        this._key = "cn.com.SmartFleet.App.Admin.settings";
        this.serverIP = "http://cd.inhandcloud.com:20080";
        this.serverName = "";
        this.tel = "";
        this.username = "";
        this.access_token = "";
        this.refresh_token = "";
        this.create_token_time = "";
        this.last_login_time = "";
        this.language = "";
        this.expires_in = "";
        this.loginType = 0;
    }

    async setRunningConfig() {
        await AsyncStorage.setItem(this._key, JSON.stringify(this), function (errs) {
            if (errs) {
                // console.error('Faild to save the settings');
            } else {
                // console.log('Save the setting successfuly');
            }
        });
    }

    async getRunningConfig(app) {
        var config = await AsyncStorage.getItem(this._key);
        if (config != undefined && config != '') {
            var cfg = JSON.parse(config);
            this.serverIP = cfg.serverIP;
            this.serverName = cfg.serverName;
            this.tel = cfg.tel;
            this.username = cfg.username;
            this.access_token = cfg.access_token;
            this.refresh_token = cfg.refresh_token;
            this.create_token_time = cfg.create_token_time;
            this.last_login_time = cfg.last_login_time;
            this.language = cfg.language;
            this.expires_in = cfg.expires_in;
            this.loginType = cfg.loginType;
        }
        app.refresh(this);
    }
}

module.exports = Settings;