/**
 * @description 保存cookie
 * @param {Object} obj 需要存储cookie的对象
 * @param {Number} limitDays 默认存储多少天
 */
function setCookie(obj, limitDays=3) {
    // 设置过期时间
    let data = new Date(new Date().getTime() + limitDays * 24 * 60 * 60 * 1000 ).toUTCString();
    for (let key in obj) {
        document.cookie = key + "=" + obj[key] + "; expires=" + data;
    }
}

/**
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
function getCookie(name) {
    for(let i of getAllCookieArr()){
        if(i[0] === name) return i[1]
    }
    return null
}
function getAllCookieStr(){
    return document.cookie
}
function getAllCookieArr(){
    const arr = document.cookie.split(';')
    let retArr = []
    for(let i of arr){
        retArr.push(i.trim().split('='))
    }
    return retArr
}

/**
 * @description 删除cookie
 * @param cookieList 需要删除cookie的key数组
 */
function clearCookie(cookieList){
    for(let key of cookieList){
        let obj = {};
        obj[key] = '';
        setCookie(obj, -1);
    }
}

export default{
    setCookie,
    getCookie,
    clearCookie,
    getAllCookieStr,
    getAllCookieArr
}
