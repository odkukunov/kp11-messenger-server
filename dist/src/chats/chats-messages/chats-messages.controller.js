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
exports.ChatsMessagesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../guards/auth.guard");
const request_context_decorator_1 = require("../../../decorators/request-context.decorator");
const data_decorator_1 = require("../../../decorators/data.decorator");
const r_jsend_1 = require("r-jsend");
const chats_messages_service_1 = require("./chats-messages.service");
const messageData = ['content'];
let ChatsMessagesController = class ChatsMessagesController {
    constructor(jsendSerializer, chatMessagesService) {
        this.jsendSerializer = jsendSerializer;
        this.chatMessagesService = chatMessagesService;
    }
    async sendMessage(ctx, chatId, data) {
        const message = await this.chatMessagesService.sendMessage(ctx.user._id, chatId, data.content);
        return this.jsendSerializer.successResponse(Object.assign({}, message)).get();
    }
    async getMessages(ctx, chatId, query) {
        const result = await this.chatMessagesService.getMessages(ctx.user._id, chatId, query['p']);
        return this.jsendSerializer.successResponse(Object.assign({}, result)).get();
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, data_decorator_1.Data)(messageData)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsMessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, request_context_decorator_1.RequestContext)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatsMessagesController.prototype, "getMessages", null);
ChatsMessagesController = __decorate([
    (0, common_1.Controller)('chats/:id/messages'),
    __metadata("design:paramtypes", [r_jsend_1.default, chats_messages_service_1.ChatsMessagesService])
], ChatsMessagesController);
exports.ChatsMessagesController = ChatsMessagesController;
//# sourceMappingURL=chats-messages.controller.js.map