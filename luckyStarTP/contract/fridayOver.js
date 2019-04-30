// 获取本周五中午12点倒计时
function getWeekTime() {
    let now = Date.parse(new Date().toString());
    let d = new Date();
    d.setHours(12, 0, 0, 0);
    let day = 0;
    switch (d.getDay()) {
        case 6:
            day = -1;
            break;
        case 7:
            day = 0;
            break;
        default:
            day = d.getDay();
    }
    let week = 5 - day;
    let thisHour = new Date().getHours();
    week = (week === 0 && thisHour >= 12) ? 7 : week;
    let result = d.getTime() + week * 86400000;
    let final = result - now;
    console.log(final/ 1000);
    // console.log(timestampToMoment(final / 1000));
}
getWeekTime();
/*
转换时间
 */
function fillZero(time) {
    time = time < 10 ? "0" + time : time;
    return time;
}

function timestampToMoment(timestamp) {
    timestamp = timestamp < 0 ? 0 : timestamp;
    let h = fillZero(Math.floor(timestamp / 60 / 60)) + ':';
    let m = fillZero(Math.floor(timestamp / 60 % 60)) + ':';
    let s = fillZero(timestamp % 60);
    return h + m + s;
}