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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const data_decorator_1 = require("../../decorators/data.decorator");
const chats_service_1 = require("./chats.service");
const r_jsend_1 = require("r-jsend");
const platform_express_1 = require("@nestjs/platform-express");
const image_1 = require("../../utils/image");
const chats_modify_service_1 = require("./chats-modify.service");
const createData = ['name', 'users'];
const updateData = ['name', 'avatar'];
let ChatsController = class ChatsController {
    constructor(chatsService, chatsModifyService, jsendSerializer) {
        this.chatsService = chatsService;
        this.chatsModifyService = chatsModifyService;
        this.jsendSerializer = jsendSerializer;
    }
    async createChat(ctx, data) {
        const chat = await this.chatsModifyService.createChat(data.name, ctx.user._id, data.users);
        return this.jsendSerializer.successResponse(Object.assign({}, chat)).get();
    }
    async getChats(ctx, query) {
        const result = await this.chatsService.getChats(query['q'], query['p'] || 0, ctx.user._id);
        return this.jsendSerializer.successResponse(Object.assign({}, result)).get();
    }
    async getChat(ctx, id) {
        const chat = await this.chatsService.getChat(id);
        this.chatsService.isUserInChat(chat, ctx.user._id);
        return this.jsendSerializer.successResponse(Object.assign({}, chat.toObject())).get();
    }
    async updateChat(ctx, id, data, file) {
        if (file) {
            data.avatar = file.path;
        }
        const chat = await this.chatsModifyService.updateChat(id, ctx.user._id, data);
        return this.jsendSerializer.successResponse(Object.assign({}, chat.toObject())).get();
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, data_decorator_1.Data)(createData)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChat", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', image_1.default)),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, data_decorator_1.Data)(updateData)),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "updateChat", null);
ChatsController = __decorate([
    (0, common_1.Controller)('chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        chats_modify_service_1.ChatsModifyService,
        r_jsend_1.default])
], ChatsController);
exports.ChatsController = ChatsController;
//# sourceMappingURL=chats.controller.js.map