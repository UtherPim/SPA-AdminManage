import axios from "axios";
import { message, notification} from "antd";
import Qs from 'qs';
import jwtDecode from 'jwt-decode';

export const CUSCONFIGS = {
    timeout: 15000,
    base_url: 'http://xxx',//数据请求地址
    upload_url: 'http://xxx',//文件上传地址
    file_prefix: 'http://xxx' //文件路径前缀
}
axios.defaults.baseURL = CUSCONFIGS.base_url;
axios.defaults.timeout = CUSCONFIGS.timeout;

export const Axios = (url, type = 'get', params = {}, option = {
    isProcess: false
}) => {
    type = type.toLowerCase();
    return http[type](url, params); 

}
export class http {

    static refreshToken(token){
        return new Promise((resolve, reject) => {
            http.postWithToken('refreshToken', token, false)
                .then(r=>{
                    window.sessionUtil.save('user_session',r);
                    resolve && resolve(r);
                }).catch(e=>{
                reject && reject(e);
            });
        })
    }

    static async get(url, params, isShowErrMsg = true) {
        window.log(url, params)
        try {
            if (url == null) {
                throw '错误';
            }
            let jwtPromise = this.checkJwtVaild('get', url, params, isShowErrMsg);
            if (jwtPromise){
                return jwtPromise;
            }
            let headers = {};
            //添加通用头部信息
            this.addCommonHeaders(headers);
            //只有get请求才需要第三个参数
            let configs = this.addConfigs(url, headers, params);
            let result = await axios.get(url, configs);
            return this.handleResult(result);
        } catch (e) {
            return this.handleError(e, isShowErrMsg)
        }
    }

    static async post(url, params, isShowErrMsg = true) {
        try {
            if (url == null) {
                throw '错误';
            }

            let jwtPromise = this.checkJwtVaild('post', url, params, isShowErrMsg);
            if (jwtPromise){
                return jwtPromise;
            }
            let headers = {};
            //添加通用头部信息
            this.addCommonHeaders(headers);
            let configs = this.addConfigs(url, headers, null);
            let result = await axios.post(url, params, configs);
            return this.handleResult(result);
        } catch (e) {
            return this.handleError(e, isShowErrMsg)
        }
    }

    static async put(url, params, isShowErrMsg = true) {
        try {
            if (url == null) {
                throw '错误';
            }

            let jwtPromise = this.checkJwtVaild('put', url, params, isShowErrMsg);
            if (jwtPromise){
                return jwtPromise;
            }
            let headers = {};
            //添加通用头部信息
            this.addCommonHeaders(headers);
            let configs = this.addConfigs(url, headers, null);
            let result = await axios.put(url, params, configs);
            return this.handleResult(result);
        } catch (e) {
            return this.handleError(e, isShowErrMsg)
        }
    }

    static async delete(url, params, isShowErrMsg = true) {
        try {
            if (url == null) {
                throw '错误';
            }
            let jwtPromise = this.checkJwtVaild('delete', url, params, isShowErrMsg);
            if (jwtPromise){
                return jwtPromise;
            }
            let headers = {};
            //添加通用头部信息
            this.addCommonHeaders(headers);
            let configs = this.addConfigs(url, headers, params);
            let result = await axios.delete(url, configs);
            return this.handleResult(result);
        } catch (e) {
            return this.handleError(e, isShowErrMsg)
        }
    }

    /**
     * 用于刷新token请求，其他请求不调用这个
     * @param url
     * @param params
     * @param isShowErrMsg
     * @returns {Promise<any>}
     */
    static async postWithToken(url, params, isShowErrMsg = true) {
        try {
            if (url == null) {
                throw '错误';
            }
            let headers = {};
            //添加通用头部信息
            this.addCommonHeaders(headers);
            let configs = this.addConfigs(url, headers, null);
            let result = await axios.post(url, params, configs);
            result = this.handleResult(result);
            return result;
        } catch (e) {
            return this.handleError(e, isShowErrMsg)
        }
    }

    /**
     * 添加公共头部信息
     * @param headers
     */
    static addCommonHeaders(headers) {
        if (headers != null) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
            let jwt = window.sessionUtil.get('user_session') ? window.sessionUtil.get('user_session').jwt : null;
            if (jwt) {
                headers['Authorization'] = jwt;
            }
        }
    }

    /**
     * 添加configs
     * @param url
     * @param headers
     * @param params
     */
    static addConfigs(url, headers, params){
        let configs = {};
        configs['url'] = url;
        configs['headers'] = headers;
        if (params){
            configs['params'] = params;
            configs['paramsSerializer'] = (param)=>{
                //allowDots使get请求支持对象形式
                return Qs.stringify(param, { arrayFormat: 'indices', allowDots: true})
            }
        }
        return configs;
    }

    static checkJwtVaild(type, url, params, isShowErrMsg){
        type = type.toLowerCase();
        let token = window.sessionUtil.get('user_session');
        if (token){
            let encodeJwt = jwtDecode(token.jwt);
            let currentTimestamp = new Date().getTime();
            let expTimeStamp = encodeJwt.exp * 1000;
            if (expTimeStamp <= currentTimestamp){
                //当jwt失效的时候，重新刷新jwt，并return新的promise，防止之前的请求丢失
                return new Promise((resolve, reject) => {
                    let num = 0;
                    let func = ()=>{
                        http.refreshToken(token)
                            .then(r=>{
                                // CUSCONFIGS.num++;
                                this[type](url, params, isShowErrMsg)
                                    .then(result=>{
                                        resolve && resolve(result);
                                    }).catch(error=>{
                                    reject && reject(error);
                                })
                            }).catch(e=>{
                            //通过递归方式给你三次刷新jwt机会，不行的话进入登录页面
                            if (num > 3){
                                //刷新失效，进入登录页面
                                window.clearCache();
                                window.push('/login');
                            } else{
                                func();
                            }
                            num++;
                        })
                    }
                    func();
                })
            }
        }else{
            return null;
        }
    }

    /**
     * 处理结果
     * @param result
     */
    static handleResult(result) {
        if (result.status == 200){
            //确保只有200，then捕捉，其他走catch
            return new Promise((resolve, reject) => {
                resolve && resolve(result.data);
            })
        }else{
            throw result;
        }
    }

    /**
     * 处理错误
     * @param error
     * @returns {Promise<any>}
     */
    static handleError(error, isShowErrMsg) {
        let err = {};
        let type = 'error';
        if (error.response) {
            err.errMsg = error.response.data.msg || error.response.data.message;
            err.code = error.response.status;
            type = this.handleStatusCode(err.code);
        } else if (error.request) {
            // 发送请求但是没有响应返回
            err.code = -1000;
            err.errMsg = '网络错误，请重试';
        } else {
            // 其他错误
            err.code = -2000;
            err.errMsg = error.message || '网络错误，请重试';
        }
        if (isShowErrMsg){
            notification[type]({
                message: '提示',
                description: err.errMsg
              });
            // message.error(err.errMsg);
        }
        return new Promise((resolve, reject) => {
            reject && reject(err);
        });
    }

    /**
     * 提示处理
     * @param type
     * @returns {string}
     */
    static handleStatusCode(type){
        let result;
        switch(type){
            case 400:
                result = 'info';
                break;
            default:
                result = 'error';
                break;
        }
        return result;
    }
}