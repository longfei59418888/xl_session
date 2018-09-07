import {get as getCookie, set as setCookie, del as delCookie} from 'xl_cookie'

if (window.sessionStorage) {

}
export const set = (attr, data, timeOut = -1) => {
    if (timeOut !== -1) timeOut = new Date().getTime() + timeOut * 1000
    data = data ? JSON.stringify({data, timeOut}) : null
    sessionStorage.setItem(attr, data)
}
export const get = (attr) => {
    let data = sessionStorage.getItem(attr);
    if (data == null || data == "") return null;
    else {
        data = JSON.parse(data)
        let now = new Date().getTime()
        if (now > data.timeOut && data.timeOut !== -1) return null
        else return data.data
    }
}
export const remove = (attr) => {
    sessionStorage.removeItem(attr)
}

export const clear = () => {
    sessionStorage.clear()
}

function Session(prefixName) {
    this.prefixName = prefixName
    let list = get(this.prefixName)
    this.list = list ? list : {}
    this.refresh()
}

Session.prototype = {
    refresh: function () {
        set(this.prefixName, this.list)
    },
    get: function (attr) {
        return get(`${this.prefixName}_${attr}`)

    },
    set: function (attr, data, timeOut = -1) {
        attr = `${this.prefixName}_${attr}`
        set(attr, data, timeOut)
        this.list[attr] = 1
        this.refresh()
    },
    remove: function (attr) {
        attr = `${this.prefixName}_${attr}`
        remove(attr)
        delete  this.list[attr]
        this.refresh()
    },
    clear: function () {
        Object.keys(this.list).forEach((item) => {
            remove(item)
        })
        this.list = {}
        this.refresh()
    }
}


export default Session

