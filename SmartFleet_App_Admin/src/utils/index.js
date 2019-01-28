/*
 * @Author: mikey.zhanglf 
 * @Date: 2018-07-19 15:55:26 
 * @Last Modified by: mikey.zhanglf
 * @Last Modified time: 2019-01-28 15:07:57
 */
export const createAction = type => payload => ({ type: type, payload: payload });

export const isEmpty = str => { if (str === undefined || str === null || str === '') { return true } else { return false } };