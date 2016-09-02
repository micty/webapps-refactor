

//前面补 0 取最后两位。
function fix(number) {
    number = '0' + number;
    return number.slice(-2);
}

//给 watch 中输出时间用到，格式化成 `yyyy-MM-dd HH:mm:ss`
Date.prototype.toString = function () {

    var date = [
        this.getFullYear(),
        fix(this.getMonth() + 1),
        fix(this.getDate()),
    ].join('-');

    var time = [
        fix(this.getHours()),
        fix(this.getMinutes()),
        fix(this.getSeconds()),
    ].join(':');

    return date + ' ' + time;
};



