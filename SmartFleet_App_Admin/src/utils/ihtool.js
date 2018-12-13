import Images from '../constants/Images';
import I18n from '../language/index';
import Global from '../utils/Global';
import config from '../utils/config';
import moment from 'moment';
import { isEmpty } from '../utils/index';
import VersionNumber from 'react-native-version-number';




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
        id: params.id == undefined ? '--' : params.id,
        distance: params.distance == undefined ? '--' : params.distance,
        duration: params.duration == undefined ? '--' : params.duration,
        fuelConsumption: params.fuelConsumption == undefined ? '--' : params.fuelConsumption,
        illegal: params.illegal == undefined ? '--' : params.illegal,
        accident: params.accident == undefined ? '--' : params.accident,
        createTime: params.createTime == undefined ? '--' : params.createTime,
        queryType: params.queryType == undefined ? '--' : params.queryType,
        cars: params.cars == undefined ? '--' : params.cars,
        workPerson: params.workPerson == undefined ? '--' : params.workPerson,
        working: params.working == undefined ? '--' : params.working,
        plateNo: params.plateNo == undefined ? '--' : params.plateNo,
        maintainCount: params.maintainCount == undefined ? '--' : params.maintainCount,
    }
    return statistics;
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
 *   获取车辆轨迹历史事件状态
 *
 * @param {*} record
 */
exports.getTrackTypeImage = function getTrackTypeImage(record) {
    const { labels, fields, level } = record;
    const { value, type, category } = fields;
    const { code } = labels;

    if (code === 'driving') {
        if (type === 'engine') {
            if (value) {
                return Images.other_ico_dianhuo;
            } else {
                return Images.other_ico_xihuo;
            }
        } else if (level) {
            if (level == 1) {
                return Images.event_level1;
            } else if (level == 2) {
                return Images.event_level2;
            } else if (level == 3) {
                return Images.event_level3;
            } else if (level == 4) {
                return Images.event_level4;
            } else if (level == 5) {
                return Images.event_level5;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}
exports.getTrackTypeImageName = function getTrackTypeImageName(record) {
    const { labels, fields, level } = record;
    const { value, type, category } = fields;
    const { code } = labels;

    if (code === 'driving') {
        if (type === 'engine') {
            if (value) {
                return 'ico_dianhuo';
            } else {
                return 'ico_xihuo';
            }
        } else if (level) {
            if (level == 1) {
                return 'level1';
            } else if (level == 2) {
                return 'level2';
            } else if (level == 3) {
                return 'level3';
            } else if (level == 4) {
                return 'level4';
            } else if (level == 5) {
                return 'level5';
            } else {
                return '';
            }
        } else {
            return '';
        }
    } else {
        return '';
    }
}
/**
 *   获取事件类型
 *
 * @param {*} record
 */
exports.getEventType = function getEventType(record) {
    const { labels, fields } = record;
    const { value, type, category } = fields;
    const { code } = labels;

    var label = '';
    if (code === 'behavior') {
        label = I18n.t('notice.car_notice');
    } else if (code === 'driving') {
        label = I18n.t('notice.driving_notice');
    }
    return label;
}

/**
 *    获取事件的描述信息
 *
 * @param {*} record
 * @returns
 */
exports.getEventDesc = function getEventDesc(record) {
    const { labels, fields } = record;
    const { value, type, category } = fields;
    const { code } = labels;
    var label = '';
    if (code === 'behavior') {
        if (type === 'fatigure') {
            label = I18n.t('notice.fatigure');
        } else if (type === 'belt') {
            label = I18n.t('notice.belt');
        } else if (type === 'overspeed') {
            label = I18n.t('notice.overspeed') + ',' + I18n.t('notice.mph');
        } else if (type === 'brake') {
            label = I18n.t('notice.brake');
        }
        // label = I18n.t('notice.car_notice');
    } else if (code === 'driving') {
        if (type === 'overspeed') {
            label = I18n.t('notice.overspeed') + ',' + I18n.t('notice.mph');
        } else if (type === 'zone') {
            if (category === 'route') {
                if (value) {
                    label = I18n.t('notice.backroute');
                } else {
                    label = I18n.t('notice.outroute');
                }
            } else if (category !== 'route') {
                if (value) {
                    label = I18n.t('notice.backzone');
                } else {
                    label = I18n.t('notice.outzone');
                }
            }
        } else if (type === 'engine') {
            if (value === 1) {
                label = I18n.t('notice.vehicle_start');
            } else if (value === 0) {
                label = I18n.t('notice.vehicle_stop');
            }
        } else if (type === 'angle') {
            label = I18n.t('notice.angle');
        }
    } else if (code === 'asset') {
        if (value) {
            if (type === 'RFID') {
                label = I18n.t('notice.asset_monitoring_online') + ':RFID';
            } else if (type === 'Bluetooth') {
                label = I18n.t('notice.asset_monitoring_online') + ':Bluetooth';
            } else {
                label = I18n.t('notice.asset_monitoring_online') + ':' + I18n.t('vehicle.other');
            }
        } else if (!value) {
            if (type === 'RFID') {
                label = I18n.t('notice.asset_monitoring_offline') + ':RFID';
            } else if (type === 'Bluetooth') {
                label = I18n.t('notice.asset_monitoring_online') + ':Bluetooth';
            } else {
                label = I18n.t('notice.asset_monitoring_online') + ':' + I18n.t('vehicle.other');
            }
        }
    } else if (code === 'driver') {
        label = I18n.t('notice.driver_change');
    } else if (code === 'state') {
        if (type === 'fuel') {
            label = I18n.t('notice.fuel_change');
        } else if (type === 'gnss') {
            if (value === 0) {
                label = I18n.t('notice.gnss_fault');
            } else if (value === 1) {
                label = I18n.t('notice.gnss_short');
            } else {
                label = I18n.t('notice.gnss_cut');
            }
        } else if (type === 'battery') {
            if (value === 0) {
                label = I18n.t('notice.battery_power_off');
            } else {
                label = I18n.t('notice.battery_undervoltage');
            }
        }
    } else if (code === 'safety') {
        if (type === 'crash') {
            label = I18n.t('notice.crash');
        } else if (code === 'turnover') {
            label = I18n.t('notice.turnover');
        } else if (code === 'urgency') {
            label = I18n.t('notice.urgency');
        }
    } else {
        label = '';
    }
    return label.replace('{value}', value);
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
    const date_ = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
    var str = '';
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
    var conf = {
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

                var s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (parseFloat(this.x))) + '</b>';
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
    var conf = {
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
                var s = '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M', (parseFloat(this.x))) + '</b>';
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