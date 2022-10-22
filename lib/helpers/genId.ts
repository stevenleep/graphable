/**
 * 生成唯一的id
 */
export function genId() {
    return Math.random().toString(36).slice(2);
}

/**
 * 生成唯一的uuid
 */
export function genUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 雪花算法
 */
export function snowflake() {
    var date = new Date().getTime();
    var random = Math.random() * 10000000000000000;
    return Math.floor(date + random).toString(16);
}