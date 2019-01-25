/*
 * @Author: mikey.zhanglf 
 * @Date: 2018-07-19 15:55:26 
 * @Last Modified by: mikey.zhanglf
 * @Last Modified time: 2019-01-25 15:24:51
 */
export const createAction = type => payload => ({ type: type, payload: payload });

export const isEmpty = str => str === undefined || str === null || str === '';