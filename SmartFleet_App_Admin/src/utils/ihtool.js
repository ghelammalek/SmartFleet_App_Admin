import Images from '../constants/Images';
import I18n from '../language/index';
import Global from '../utils/Global';
import moment from 'moment';




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
    } else {
        return I18n.t('level5');
    }
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
        label = I18n.t('notice.car_notice');
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
    } else {
        return Images.event_level5;
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
 *   获取10位的时间戳
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