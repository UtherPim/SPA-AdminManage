/*
* 这里使用BrowserRouter,BrowserRouter基于HTML5的pushState 和replaceState,很多浏览器不支持，例如IE,360
* 如果要兼容，最简单的方法是改成HashRouter，但是默认路由上会带个#
* */
import { createBrowserHistory, createHashHistory } from 'history'

//应用上下文对象

export default (()=>{
    //全局唯一的history访问点和,router context里面的是同一个引用
    let history = createBrowserHistory();
    return{
        getBrowserHistory(){
            return history;
        },
    }
})();