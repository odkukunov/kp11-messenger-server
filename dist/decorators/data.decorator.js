"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const common_1 = require("@nestjs/common");
exports.Data = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const modifiedData = {};
    if (!data) {
        return request.body;
    }
    Object.keys(request.body).forEach((key) => {
        if (data.includes(key)) {
            modifiedData[key] = request.body[key];
        }
    });
    return modifiedData;
});
//# sourceMappingURL=data.decorator.js.map