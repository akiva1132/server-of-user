"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganDay = exports.morganTime = exports.currentTime = void 0;
const currentTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return { year, month, day, hours, minutes, seconds, milliseconds };
};
exports.currentTime = currentTime;
const morganTime = () => {
    const { year, month, day, hours, seconds, minutes } = (0, exports.currentTime)();
    return `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;
};
exports.morganTime = morganTime;
const morganDay = () => {
    const { year, month, day } = (0, exports.currentTime)();
    return `${year}-${month}-${day}`;
};
exports.morganDay = morganDay;
