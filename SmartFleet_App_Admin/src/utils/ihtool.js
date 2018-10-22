import Images from '../constants/Images';
import I18n from '../language/index';
import Global from '../utils/Global';
import moment from 'moment';


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