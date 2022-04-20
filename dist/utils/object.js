"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectId = exports.excludeEmpty = exports.exclude = exports.include = void 0;
const common_1 = require("@nestjs/common");
function include(object, props) {
    const newObj = {};
    Object.keys(object).forEach((key) => {
        if (props.includes(key)) {
            newObj[key] = object[key];
        }
    });
    return newObj;
}
exports.include = include;
function exclude(object, props) {
    const newObj = {};
    Object.keys(object).forEach((key) => {
        if (!props.includes(key)) {
            newObj[key] = object[key];
        }
    });
    return newObj;
}
exports.exclude = exclude;
function excludeEmpty(object) {
    const newObj = {};
    Object.keys(object).forEach((key) => {
        if (object[key]) {
            newObj[key] = object[key];
        }
    });
    return newObj;
}
exports.excludeEmpty = excludeEmpty;
function IsObjectId(id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new common_1.HttpException('Неверный формат ID', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.IsObjectId = IsObjectId;
//# sourceMappingURL=object.js.map