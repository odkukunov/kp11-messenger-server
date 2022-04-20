"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsUsersController = void 0;
const common_1 = require("@nestjs/common");
const request_context_decorator_1 = require("../../../decorators/request-context.decorator");
const auth_guard_1 = require("../../guards/auth.guard");
const chats_users_service_1 = require("./chats-users.service");
const r_jsend_1 = require("r-jsend");
const data_decorator_1 = require("../../../decorators/data.decorator");
let ChatsUsersController = class ChatsUsersController {
    constructor(jsendSerializer, chatsUsersService) {
        this.jsendSerializer = jsendSerializer;
        this.chatsUsersService = chatsUsersService;
    }
    async addUsers(ctx, params, data) {
        const chat = await this.chatsUsersService.addUsers(params.id, ctx.user._id, data.users);
        return this.jsendSerializer.successResponse(Object.assign({}, chat)).get();
    }
    async leaveFromChat(ctx, params) {
        const chat = await this.chatsUsersService.leave(params.id, ctx.user._id);
        return this.jsendSerializer.successResponse(chat ? Object.assign({}, chat) : undefined).get();
    }
    async removeUser(ctx, params) {
        const chat = await this.chatsUsersService.removeUser(params.id, ctx.user._id, params.userId);
        return this.jsendSerializer.successResponse(Object.assign({}, chat)).get();
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, data_decorator_1.Data)(['users'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsUsersController.prototype, "addUsers", null);
__decorate([
    (0, common_1.Delete)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsUsersController.prototype, "leaveFromChat", null);
__decorate([
    (0, common_1.Delete)('/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsUsersController.prototype, "removeUser", null);
ChatsUsersController = __decorate([
    (0, common_1.Controller)('chats/:id/users'),
    __metadata("design:paramtypes", [r_jsend_1.default, chats_users_service_1.ChatsUsersService])
], ChatsUsersController);
exports.ChatsUsersController = ChatsUsersController;
//# sourceMappingURL=chats-users.controller.js.map