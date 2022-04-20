"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const common_1 = require("@nestjs/common");
exports.RequestContext = (0, common_1.createParamDecorator)((data, ctx) => {
    return ctx.switchToHttp().getRequest();
});
//# sourceMappingURL=request-context.decorator.js.map