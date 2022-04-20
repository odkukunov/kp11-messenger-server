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
exports.ChatsModifyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("../../schemas/chat.schema");
const object_1 = require("../../utils/object");
const fs = require("fs");
const path = require("path");
const chats_service_1 = require("./chats.service");
const chats_events_1 = require("./chats.events");
const Observer_1 = require("../../utils/Observer");
let ChatsModifyService = class ChatsModifyService extends Observer_1.Subject {
    constructor(model, chatsService, chatsEvents) {
        super();
        this.model = model;
        this.chatsService = chatsService;
        this.chatsEvents = chatsEvents;
        this.subscribe(chatsEvents);
    }
    onChatUpdate(chatId, senderId) {
        this.notify('chatUpdate', chatId, senderId);
    }
    onChatCreate(chatId, senderId) {
        this.notify('chatCreate', chatId, senderId);
    }
    async createChat(name, userId, users = []) {
        if (users.find((user) => user == userId)) {
            throw new common_1.BadRequestException('Вы не можете создать чат с самим собой');
        }
        const chat = await this.model.create({
            name,
            users: [userId, ...users],
            creator: userId,
        });
        this.onChatCreate(chat._id.toString(), userId);
        return (0, object_1.exclude)(chat.toObject(), ['__v']);
    }
    async updateChat(id, userId, data) {
        const chat = await this.chatsService.getChat(id);
        if (data.avatar && chat.avatar) {
            fs.unlink(path.resolve(__dirname, '../../../../', chat.avatar), (err) => {
                console.log(err);
            });
        }
        if (chat.creator.toString() == userId) {
            chat.name = data.name;
            if (data.avatar) {
                chat.avatar = data.avatar;
            }
            await chat.save();
            this.onChatUpdate(id, userId);
            return chat;
        }
        throw new common_1.ForbiddenException('Чтобы изменить название чата, вы должны быть создателем');
    }
};
ChatsModifyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        chats_service_1.ChatsService,
        chats_events_1.default])
], ChatsModifyService);
exports.ChatsModifyService = ChatsModifyService;
//# sourceMappingURL=chats-modify.service.js.map