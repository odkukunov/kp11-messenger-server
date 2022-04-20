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
exports.ChatsMessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("../../../schemas/message.schema");
const chats_service_1 = require("../chats.service");
const object_1 = require("../../../utils/object");
let ChatsMessagesService = class ChatsMessagesService {
    constructor(model, chatsService) {
        this.model = model;
        this.chatsService = chatsService;
    }
    async sendMessage(senderId, chatId, content, isSystem = false) {
        (0, object_1.IsObjectId)(chatId);
        const chat = await this.chatsService.getChat(chatId);
        this.chatsService.isUserInChat(chat, senderId);
        const message = await this.model.create({
            sender: senderId,
            chat: chatId,
            content,
            isSystem: isSystem ? true : undefined,
            sendAt: Date.now(),
        });
        chat.lastMessage = message._id;
        await chat.save();
        return (0, object_1.exclude)(message.toObject(), ['__v']);
    }
    async getMessages(senderId, chatId, page) {
        const PER_PAGE = 50;
        (0, object_1.IsObjectId)(chatId);
        const chat = await this.chatsService.getChat(chatId);
        this.chatsService.isUserInChat(chat, senderId);
        const messages = await this.model
            .find({ chat: chatId })
            .sort('-sendAt')
            .skip(PER_PAGE * page)
            .limit(PER_PAGE)
            .populate('sender', this.chatsService.populateArray)
            .select('-__v');
        return { messages, isLastPage: messages.length === 0 };
    }
};
ChatsMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        chats_service_1.ChatsService])
], ChatsMessagesService);
exports.ChatsMessagesService = ChatsMessagesService;
//# sourceMappingURL=chats-messages.service.js.map