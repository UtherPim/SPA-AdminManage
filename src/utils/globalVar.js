/**
 * GlobalVar 储存全局数据
 */
import imgArr from './image.js';
import { sessionUtil } from './tool'
 
window.imgArr = imgArr;
window.sessionUtil = sessionUtil;

window.clearCache = ()=> {
    //清除jwt
    sessionUtil.remove('Authorization');
    sessionUtil.remove('user_session');
    //清除用户信息
    window.userInfo = {};
}
