import Images from '../constants/Images';
import I18n from '../language/index';
import Global from '../utils/Global';
import config from '../utils/config';
import moment from 'moment';
import { isEmpty } from '../utils/index';
import VersionNumber from 'react-native-version-number';

//判断国际化里是否有字段
exports.judgeText = function judgeText(text) {
    if (I18n.t(text).indexOf('.' + text + '"') == -1) {
        return true;
    } else {
        return false;
    }
}

//排除用户坐标不存在的情况
exports.getInitPs = function getInitPs() {
    const { initPs } = Global.cfg.settingInfo || {};
    const { x, y } = initPs || {};
    if (x && y) {
        return { latitude: y, longitude: x };
    } else {
        return undefined;
    }
}
exports.changeNum = function changeNum(num) {
    let value = '';
    if (num < 10000) {
        value = num.toFixed(2);
    } else {
        value = (num / 1000).toFixed(2) + 'k';
    }
    return value;
}

exports.placeholderStr = function placeholderStr(str, isFloat) {
    if (isEmpty(str)) {
        return '--';
    } else {
        if (isFloat) {
            return this.changeNum(str);
        }
        return str;
    }
}
/**
 *   获取统计数据
 *
 * @param {*} params
 * @returns
 */
exports.getStatistics = function getStatistics(params) {
    const statistics = {
        working_duration: params.working_duration || '--',//工作时长
        running_duration: params.running_duration || '--',//行驶时间
        fuel_consumption: params.fuel_consumption || '--',//燃油消耗
        illegalBehavior: params.illegalBehavior || '--',//非法驾驶行为
        distance: params.distance || '--',//行驶里程
        on_duty: params.on_duty || '--',//出勤
        event: params.event || '--',//事件
    }
    return statistics;
}

/**
 *   获取事件类型
 *
 * @param {*} record
 */
exports.getEventType = function getEventType(record) {
    const { labels, fields, level } = record || {};
    const { value, legal, type, category, desc } = fields || {};
    const { sub_code, code } = labels || {};

    let label = '';
    if (code === 'vehicle') {
        label = I18n.t('event_for_car');
    } else if (code === 'driving') {
        label = I18n.t('event_for_driving');
    } else if (code === 'work') {
        label = I18n.t('event_for_work');
    } else if (code === 'gateWay') {
        label = I18n.t('event_for_alarm');
    }
    return label;
}

/**
 *   获取告警级别label
 *
 * @param {*} value
 * @returns
 */
exports.getEventLevelLabel = function getEventLevelLabel(value) {
    if (value == 1) {
        return I18n.t('level1');
    } else if (value == 2) {
        return I18n.t('level2');
    } else if (value == 3) {
        return I18n.t('level3');
    } else if (value == 4) {
        return I18n.t('level4');
    } else if (value == 5) {
        return I18n.t('level5');
    } else {
        return ''
    }
}


/**
 *   获取告警级别图片
 *
 * @param {*} value
 * @returns
 */
exports.getEventLevelImage = function getEventLevelImage(value) {
    if (value == 1) {
        return Images.event_level1;
    } else if (value == 2) {
        return Images.event_level2;
    } else if (value == 3) {
        return Images.event_level3;
    } else if (value == 4) {
        return Images.event_level4;
    } else if (value == 5) {
        return Images.event_level5;
    } else {
        return null;
    }
}

/**
 *   获取车辆轨迹历史事件状态
 *
 * @param {*} record
 */
exports.getEventDetailImage = function getEventDetailImage(record) {
    const { labels, fields, level } = record || {};
    const { value, legal, type, category, desc } = fields || {};
    const { sub_code } = labels || {};

    if (sub_code === 'driving') {
        if (type === 'overspeed') {
            if (level === 2) {
                return Images.event_overspeed_warning;
            } else if (level === 4) {
                return Images.event_overspeed_alert;
            }
        } else if (type === 'zone') {
            if (category === 'route') {
                return Images.event_path;
            } else {
                return Images.event_zone;
            }
        } else if (type === 'engine') {
            if (legal === 0) {
                if (value === 1) {
                    return Images.event_start_warning;
                } else if (value === 0) {
                    return Images.event_stop_warning;
                }
            } else {
                if (value === 1) {
                    return Images.event_start;
                } else if (value === 0) {
                    return Images.event_stop;
                }
            }
        } else if (type === 'heading') {
            return Images.event_heading;
        }
    } else if (sub_code === 'driver') {
        return Images.event_driver;
    } else if (sub_code === 'asset') {
        if (value === 0) {
            return Images.event_asset;
        } else {
            return Images.event_asset_warning;
        }
    } else if (sub_code === 'behavior') {
        if (type === 'fatigure') {
            if (level == 4) {
                return Images.event_fatigure_alert;
            } else {
                return Images.event_fatigure_warning;
            }
        } else if (type === 'seatbelt') {
            if (level == 4) {
                return Images.event_seatbelt_alert;
            } else {
                return Images.event_seatbelt_warning;
            }
        } else if (type === 'brake') {
            if (level == 4) {
                return Images.event_brake_alert;
            } else {
                return Images.event_brake_warning;
            }
        }
    } else if (sub_code === 'state') {
        if (type === 'fuel_capacity_changed') {
            if (level == 4) {
                return Images.event_fuel_capacity_changed_alert;
            } else {
                return Images.event_fuel_capacity_changed_warning;
            }
        } else if (type === 'insufficient_fuel') {
            return Images.event_insufficient_fuel_alert;
        } else if (type === 'tco_abnormal') {
            return Images.event_tco_abnormal_alert;
        } else if (type === 'gnss') {
            return Images.event_gnss_alert;
        } else if (type === 'battery') {
            if (level == 4) {
                return Images.event_battery_alert;
            } else {
                return Images.event_battery_warning;
            }
        }
    } else if (sub_code === 'safety') {
        if (type === 'crash') {
            if (level == 4) {
                return Images.event_crash_alert;
            } else {
                return Images.event_crash_warning;
            }
        } else if (type === 'turnover') {
            if (level == 4) {
                return Images.event_turnover_alert;
            } else {
                return Images.event_turnover_warning;
            }
        } else if (type === 'urgency') {
            // if (level == 4) {
            return Images.event_urgency;
            // } else {
            //     return Images.event_urgency;
            // }
        }
    } else if (sub_code === 'obd-dtc') {
        if (level == 5) {
            return Images.event_obd_5;
        } else if (level == 4) {
            return Images.event_obd_4;
        } else if (level == 3) {
            return Images.event_obd_3;
        } else if (level == 2) {
            return Images.event_obd_2;
        }
    } else {
        return null;
    }
}
exports.getEventDetailImageName = function getEventDetailImageName(record) {
    const { labels, fields, level } = record || {};
    const { value, legal, type, category, desc } = fields || {};
    const { sub_code } = labels || {};

    if (sub_code === 'driving') {
        if (type === 'overspeed') {
            if (level === 2) {
                return 'overspeed_warning';
            } else if (level === 4) {
                return 'overspeed_alert';
            }
        } else if (type === 'zone') {
            if (category === 'route') {
                return 'path';
            } else {
                return 'zone';
            }
        } else if (type === 'engine') {
            if (legal === 0) {
                if (value === 1) {
                    return 'start_warning';
                } else if (value === 0) {
                    return 'stop_warning';
                }
            } else {
                if (value === 1) {
                    return 'start';
                } else if (value === 0) {
                    return 'stop';
                }
            }
        } else if (type === 'heading') {
            return 'heading';
        }
    } else if (sub_code === 'driver') {
        return 'driver';
    } else if (sub_code === 'asset') {
        if (value === 0) {
            return 'asset';
        } else {
            return 'asset_warning';
        }
    } else if (sub_code === 'behavior') {
        if (type === 'fatigure') {
            if (level == 4) {
                return 'fatigure_alert';
            } else {
                return 'fatigure_warning';
            }
        } else if (type === 'seatbelt') {
            if (level == 4) {
                return 'seatbelt_alert';
            } else {
                return 'seatbelt_warning';
            }
        } else if (type === 'brake') {
            if (level == 4) {
                return 'brake_alert';
            } else {
                return 'brake_warning';
            }
        }
    } else if (sub_code === 'state') {
        if (type === 'fuel_capacity_changed') {
            if (level == 4) {
                return 'fuel_capacity_changed_alert';
            } else {
                return 'fuel_capacity_changed_warning';
            }
        } else if (type === 'insufficient_fuel') {
            return 'insufficient_fuel_alert';
        } else if (type === 'tco_abnormal') {
            return 'tco_abnormal_alert';
        } else if (type === 'gnss') {
            return 'gnss_alert';
        } else if (type === 'battery') {
            if (level == 4) {
                return 'battery_alert';
            } else {
                return 'battery_warning';
            }
        }
    } else if (sub_code === 'safety') {
        if (type === 'crash') {
            if (level == 4) {
                return 'crash_alert';
            } else {
                return 'crash_warning';
            }
        } else if (type === 'turnover') {
            if (level == 4) {
                return 'turnover_alert';
            } else {
                return 'turnover_warning';
            }
        } else if (type === 'urgency') {
            // if (level == 4) {
            return 'urgency';
            // } else {
            //     return 'urgency_warning';
            // }
        }
    } else if (sub_code === 'obd-dtc') {
        if (level == 5) {
            return 'obd_5';
        } else if (level == 4) {
            return 'obd_4';
        } else if (level == 3) {
            return 'obd_3';
        } else if (level == 2) {
            return 'obd_2';
        }
    } else {
        return '';
    }
}

/**
 *    获取事件的描述信息
 *
 * @param {*} record
 * @returns
 */
exports.getEventDesc = function getEventDesc(record) {
    const { labels, fields, level } = record || {};
    const { value, type, category, desc } = fields || {};
    const { sub_code } = labels || {};
    let label = '';
    if (sub_code === 'behavior') {
        if (type === 'fatigure') {
            label = I18n.t('notice.fatigure');
        } else if (type === 'seatbelt') {
            if (value === 1) {
                label = I18n.t('pilot_unbelt');
            } else {
                label = I18n.t('co_pilot_unbelt');
            }
        } else if (type === 'brake') {
            label = I18n.t('notice.brake');
        }
    } else if (sub_code === 'driving') {
        if (type === 'overspeed') {
            label = I18n.t('notice.overspeed') + ',' + I18n.t('notice.mph');
        } else if (type === 'zone') {
            if (category === 'route') {
                if (value === 1) {
                    label = I18n.t('notice.backroute');
                } else if (value == 0) {
                    label = I18n.t('notice.outroute');
                }
            } else {
                if (value === 1) {
                    label = I18n.t('notice.backzone');
                } else if (value == 0) {
                    label = I18n.t('notice.outzone');
                }
            }
        } else if (type === 'engine') {
            if (value === 1) {
                label = I18n.t('notice.vehicle_start');
            } else if (value === 0) {
                label = I18n.t('notice.vehicle_stop');
            }
        } else if (type === 'heading') {
            label = I18n.t('notice.angle');
        }
    } else if (sub_code === 'asset') {
        if (value === 1) {
            if (type === 'RFID') {
                label = I18n.t('notice.asset_monitoring_online') + ':RFID';
            } else if (type === 'Bluetooth') {
                label = I18n.t('notice.asset_monitoring_online') + ':Bluetooth';
            } else {
                label = I18n.t('notice.asset_monitoring_online') + ':' + I18n.t('vehicle.other');
            }
        } else if (value === 0) {
            if (type === 'RFID') {
                label = I18n.t('notice.asset_monitoring_offline') + ':RFID';
            } else if (type === 'Bluetooth') {
                label = I18n.t('notice.asset_monitoring_offline') + ':Bluetooth';
            } else {
                label = I18n.t('notice.asset_monitoring_offline') + ':' + I18n.t('vehicle.other');
            }
        }
    } else if (sub_code === 'driver') {
        label = I18n.t('notice.driver_change');
    } else if (sub_code === 'state') {
        if (type === 'fuel_capacity_changed') {
            label = I18n.t('notice.fuel_change');
        } else if (type === 'insufficient_fuel') {
            label = I18n.t('insufficient_fuel');
        } else if (type === 'tco_abnormal') {
            label = I18n.t('tco_abnormal');
        } else if (type === 'gnss') {
            if (value === 0) {
                label = I18n.t('notice.gnss_fault');
            } else if (value === 1) {
                label = I18n.t('notice.gnss_short');
            } else if (value === 2) {
                label = I18n.t('notice.gnss_cut');
            }
        } else if (type === 'battery') {
            if (value === 0) {
                label = I18n.t('notice.battery_power_off');
            } else if (value > 0) {
                label = I18n.t('notice.battery_undervoltage');
            }
        }
    } else if (sub_code === 'safety') {
        if (type === 'crash') {
            label = I18n.t('notice.crash');
        } else if (type === 'turnover') {
            label = I18n.t('notice.turnover');
        } else if (type === 'urgency') {
            label = I18n.t('notice.urgency');
        }
    } else if (sub_code === 'obd-dtc') {
        label = desc;
    }
    return label.replace('{value}', value);
}


/**
 *   获取10位的时间戳
 *
 * @param {*} date
 * @returns
 */
exports.getTime10 = function getTime(date) {
    return moment(date).unix();
}

/**
 *   获取13位的时间戳
 *
 * @param {*} date
 * @returns
 */
exports.getTime13 = function getTime(date) {
    return moment(date).valueOf();
}
/**
 *   对时间做简化处理
 *
 * @param {*} date
 * @returns
 */
exports.getSimpleDate = function getSimpleDate(date) {
    let date_;
    if (isEmpty(date)) {
        return '--';
    } else {
        date_ = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
    }
    let str = '';
    let year = moment(date_).get('year');
    let month = moment(date_).get('month');  // 0 to 11
    let day = moment(date_).get('date');
    let hour = moment(date_).get('hour');
    let minute = moment(date_).get('minute');
    let second = moment(date_).get('second');
    let millisecond = moment(date_).get('millisecond');


    let yearCurrent = moment().get('year');
    let monthCurrent = moment().get('month');  // 0 to 11
    let dayCurrent = moment().get('date');
    let hourCurrent = moment().get('hour');
    let minuteCurrent = moment().get('minute');
    let secondCurrent = moment().get('second');
    let millisecondCurrent = moment().get('millisecond');

    // let time = moment(date).valueOf();
    // let timeCurrent = moment().valueOf();

    if (yearCurrent - year == 0) {
        if (monthCurrent - month == 0) {
            if (dayCurrent - day == 0) {
                if (hourCurrent - hour == 0) {
                    if (minuteCurrent - minute <= 0) {
                        str = '刚刚';
                    } else {
                        str = (minuteCurrent - minute).toString() + '分钟前';
                    }
                } else {
                    str = moment(date).format('HH:mm');
                }
                //            }else if (dayCurrent - day == 1){
                //                str = [NSString stringWithFormat:@"昨天 %@",[self getDateWithDateString:dateString formatter:@"HH:mm"]];
                //            }else if (dayCurrent - day == 2){
                //                str = [NSString stringWithFormat:@"前天 %@",[self getDateWithDateString:dateString formatter:@"HH:mm"]];
            } else {
                str = moment(date).format('YYYY-MM-DD');
            }
        } else {
            str = moment(date).format('YYYY-MM-DD');
        }
    } else {
        str = moment(date).format('YYYY-MM-DD');
    }
    return str;
}
/**
 *   对时间做简化处理
 *
 * @param {*} date
 * @returns
 */
exports.getSimpleDate_ = function getSimpleDate_(date) {
    let date_;
    if (isEmpty(date)) {
        return '--';
    } else {
        date_ = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
    }
    let str = '';
    let year = moment(date_).get('year');
    let month = moment(date_).get('month');  // 0 to 11
    let day = moment(date_).get('date');
    let hour = moment(date_).get('hour');
    let minute = moment(date_).get('minute');
    let second = moment(date_).get('second');
    let millisecond = moment(date_).get('millisecond');

    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    let yearCurrent = moment(currentDate).get('year');
    let monthCurrent = moment(currentDate).get('month');  // 0 to 11
    let dayCurrent = moment(currentDate).get('date');
    let hourCurrent = moment(currentDate).get('hour');
    let minuteCurrent = moment(currentDate).get('minute');
    let secondCurrent = moment(currentDate).get('second');
    let millisecondCurrent = moment(currentDate).get('millisecond');

    let time = moment(date_).unix();
    let timeCurrent = moment(currentDate).unix();

    const value = timeCurrent - time;
    if (value < 60) {
        str = I18n.t('just_time');
    } else if (value < 60 * 60) {
        str = parseInt(value / (60)) + I18n.t('minutes_ago');
    } else if (value < 60 * 60 * 24) {
        str = parseInt(value / (60 * 60)) + I18n.t('hours_ago');
    } else if (value < 60 * 60 * 24 * 31) {
        str = parseInt(value / (60 * 60 * 24)) + I18n.t('days_ago');
    } else {
        if (yearCurrent - year === 0) {
            str = parseInt(monthCurrent - month) + I18n.t('months_ago');
        } else {
            if (yearCurrent - year < 2) {
                str = parseInt(monthCurrent - month + 12) + I18n.t('months_ago');
            } else {
                str = parseInt(yearCurrent - year) + I18n.t('years_ago');
            }
        }
    }
    return str;
}

/**
 *   获取当前的utc时间
 *
 * @returns
 */
exports.getCurrentUTCDate = function getCurrentUTCDate() {
    return moment().utc().format();
}

/**
 *   获取当前日期的零时
 *
 * @returns
 */
exports.getDateBegain = function getDateBegain(date) {
    const time = moment(date).set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 1 }).format('YYYY-MM-DD HH:mm:ss.SSS')
    return time;
}

/**
 *   获取当前日期的24时
 *
 * @returns
 */
exports.getDateEnd = function getDateEnd(date) {
    const time = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999 }).format('YYYY-MM-DD HH:mm:ss.SSS')
    return time;
}

/**
 *    转换时间格式
 *
 * @param {*} date
 * @param {*} format
 * @returns
 */
exports.changeDateFormat = function changeDateFormat(date, format) {
    if (isEmpty(date)) {
        return;
    } else {
        if (isEmpty(format)) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return moment(date), format(format);
        }
    }
}
/**
 *   获取当前版本号
 *
 * @returns
 */
exports.getCurrentVersion = function getCurrentVersion() {
    if (config.type == 'dev') {
        return VersionNumber.appVersion + '.' + VersionNumber.buildVersion;
    } else {
        return VersionNumber.appVersion;
    }
}
/**
 *   判断是否有新版本
 *
 * @param {*} currentVersion
 * @param {*} newVersion
 * @returns
 */
exports.getVersion = function getVersion(currentVersion, newVersion) {
    if (isEmpty(newVersion)) {
        return false;
    } else {
        let currentArr = currentVersion.split('.');
        let newArr = newVersion.split('.');
        if (newArr[0] > currentArr[0]) {
            return true;
        } else if (newArr[0] == currentArr[0]) {
            if (newArr[1] > currentArr[1]) {
                return true;
            } else if (newArr[1] == currentArr[1]) {
                if (newArr[2] > currentArr[2]) {
                    return true;
                } else {
                    if (config.type == 'dev') {
                        if (newArr[3] > currentArr[3]) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}



exports.getConf = function getConf(series, name) {
    let conf = {
        chart: {
            backgroundColor: '#fff',
            zoomType: 'x',
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false,
        },
        boost: {
            useGPUTranslations: true
        },
        exporting: {
            enabled: false,
        },
        rangeSelector: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            shared: true,
            valueDecimals: 4,
            backgroundColor: 'rgba(151,151,163,0.9)',
            borderWidth: 0,
            borderRadius: 3,
            shadow: false,
            style: {                      // 文字内容相关样式
                color: "#fff",
                fontSize: "12px",
                fontWeight: "blod",
            },
            formatter: function () {

                let s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (parseFloat(this.x))) + '</b>';
                $.each(this.points, function () {
                    s += '<br/>' + this.series.name + ': ' + parseFloat(this.y).toFixed(2);
                });

                return s;
            }
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true,
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        scrollbar: {
            enabled: false,
            height: 0,
        },
        navigator: {
            enabled: false,
            height: 0,
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: name,
                x: -16,
            },
            labels: {
                align: 'left',
                x: -20,
            },
            lineWidth: 1,
            gridLineWidth: 0,
            opposite: false,
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%M:%S',
                second: '%M:%S',
                minute: '%M:%S',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        series: series,
    };
    return conf;
}
exports.getConfDouble = function getConfDouble(yAxis, series) {
    let conf = {
        chart: {

            backgroundColor: '#fff',
            zoomType: 'xy',
        },
        colors: [
            '#1E90FF', '#1cc593', '#d02424', '#1398dd', '#3b68c9', '#561fca', '#b633c3', '#5ab34e', '#eb8951', '#1eb9c9'
        ],
        title: {
            text: ''
        },
        legend: {
            enabled: false,
        },
        boost: {
            useGPUTranslations: true
        },
        exporting: {
            enabled: false,
        },
        rangeSelector: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            shared: true,
            valueDecimals: 4,
            backgroundColor: 'rgba(151,151,163,0.9)',
            borderWidth: 0,
            borderRadius: 3,
            shadow: false,
            style: {                      // 文字内容相关样式
                color: "#fff",
                fontSize: "12px",
                fontWeight: "blod",
            },
            formatter: function () {
                let s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M', (parseFloat(this.x))) + '</b>';
                $.each(this.points, function () {
                    s += '<br/>' + this.series.name + ': ' + parseFloat(this.y).toFixed(2);
                });

                return s;
            }
        },
        scrollbar: {
            enabled: false,
            height: 0,
        },
        navigator: {
            enabled: false,
            height: 0,
        },
        yAxis: yAxis,
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M',
                second: '%H:%M',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        series: series,
    };
    return conf;
}