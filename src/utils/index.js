import fetch from 'isomorphic-fetch';
import {flow, map, reduce} from 'lodash/fp';

class NetworkError extends Error {
    constructor(statusCode, statusText) {
        super('网络异常,请检查您的网络连接');
        this.isNetworkError = true;
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

export default (() => {
    let aopFn = null;
    let refreshNewToken = null;

    return {
        init(callback, refreshToken) {
            aopFn = callback;
            refreshNewToken = refreshToken;
        },
        request(url, parameters, method, isValidateJwt,) {
            // console.log("parameters:",parameters);
            let head = null;
            method = method.toUpperCase();
            if (method == 'POST' || method == 'PUT' || method == 'PATCH'|| method == 'DELETE') {
                head = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': ''
                    },
                    mode: 'cors',
                    body: JSON.stringify(parameters || {}),
                    credentials: 'include'
                }
            } else {
                if (parameters) {
                    let paramsArray = [];
                    //拼接参数

                    Object.keys(parameters).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(parameters[key])));
                    if (url.search(/\?/) === -1) {
                        url += '?' + paramsArray.join('&')
                    } else {
                        url += '&' + paramsArray.join('&')
                    }
                }
                head = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/text;charset=utf-8',
                    }
                }
            }
            isValidateJwt=isValidateJwt===false?isValidateJwt:true;
            return refreshNewToken(isValidateJwt).then((jwt) => {
                head.headers.Authorization = jwt;
                let isSuccess=true;
                return fetch(url, head).then(function (response) {
                    if (response.status !== 200) {
                        isSuccess = false;
                    }
                    return response.text();
                }).then(function (res) {
                    if (!isSuccess) {
                        //异常信息会存在code和msg中，后端封装的
                        throw res;
                    }
                    if (res != null && res.length > 0) {
                        return JSON.parse(res);
                    }
                    return res;
                }).then(function (rs) {
                    if (aopFn) {
                        return aopFn(rs);
                    }
                    return rs;
                }).catch(function (error) {
                    error=JSON.parse(error);
                    //     如果不是的话，则继续将异常往上抛
                    try {
                        if (aopFn) {
                            return aopFn(error);
                        }
                        // if(error.code==="auth-token-time-out"){
                        //     throw error.msg;
                        // }
                    } catch (e) {
                    }
                    throw error.msg;
                });
            });

        },

    }
})();
