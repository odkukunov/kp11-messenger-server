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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsUsersService = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("../chats.service");
const object_1 = require("../../../utils/object");
const util_1 = require("util");
const Observer_1 = require("../../../utils/Observer");
const chats_users_events_1 = require("./chats-users.events");
let ChatsUsersService = class ChatsUsersService extends Observer_1.Subject {
    constructor(chatsService, chatsUsersEvents) {
        super();
        this.chatsService = chatsService;
        this.chatsUsersEvents = chatsUsersEvents;
        this.subscribe(this.chatsUsersEvents);
    }
    onUserAdd(chatId, senderId, userId) {
        this.notify('userAdd', chatId, senderId, userId);
    }
    async onUserRemove(chatId, senderId, userId) {
        await this.notify('userRemove', chatId, senderId, userId);
    }
    async onUserLeave(chatId, senderId) {
        await this.notify('userLeave', chatId, senderId);
    }
    async onChatRemove(chatId, senderId) {
        await this.notify('chatRemove', chatId, senderId);
    }
    async addUsers(chatId, senderId, users) {
        const MAX_MEMBERS_COUNT = 100;
        if (!users || !(0, util_1.isArray)(users)) {
            throw new common_1.BadRequestException('Неверные параметры запроса');
        }
        const chat = await this.chatsService.getChat(chatId);
        for (const userId of users) {
            if (chat.users.length < MAX_MEMBERS_COUNT) {
                (0, object_1.IsObjectId)(userId);
                if (this.chatsService.isUserInChat(chat, userId)) {
                    throw new common_1.BadRequestException('Пользователь уже состоит в этом чате');
                }
                chat.users.push(userId);
                await chat.save();
                this.onUserAdd(chatId, senderId, userId);
            }
            else {
                throw new common_1.BadRequestException(`Макисмальное число участников в чате - ${MAX_MEMBERS_COUNT}`);
            }
        }
        const result = await chat.populate({
            path: 'users',
            select: this.chatsService.populateArray,
        });
        return (0, object_1.exclude)(result.toObject(), ['__v']);
    }
    async removeUser(chatId, senderId, userId) {
        (0, object_1.IsObjectId)(userId);
        if (senderId == userId) {
            throw new common_1.BadRequestException('Вы не можете удалить самого себя из чата');
        }
        const chat = await this.chatsService.getChat(chatId);
        this.chatsService.isUserCreatorException(chat, senderId);
        const index = chat.users.findIndex((elem) => {
            return elem._id.toString() === userId.toString();
        });
        if (index === -1) {
            throw new common_1.NotFoundException('Этот пользователь не состоит в чате');
        }
        chat.users = chat.users.filter((elem, i) => i !== index);
        await this.onUserRemove(chatId, senderId, userId);
        await chat.save();
        return (0, object_1.exclude)(chat.toObject(), ['__v']);
    }
    async leave(chatId, senderId) {
        const chat = await this.chatsService.getChat(chatId);
        if (chat.creator.toString() === senderId.toString()) {
            await this.onChatRemove(chatId, senderId);
            chat.remove();
            return undefined;
        }
        const index = chat.users.findIndex((elem) => {
            return elem._id.toString() === senderId.toString();
        });
        if (index === -1) {
            throw new common_1.NotFoundException('Этот пользователь не состоит в чате');
        }
        chat.users = chat.users.filter((elem, i) => i !== index);
        await this.onUserLeave(chatId, senderId);
        await chat.save();
        if (!chat.users.length) {
            chat.remove();
            return undefined;
        }
        return (0, object_1.exclude)(chat.toObject(), ['__v']);
    }
};
ChatsUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chats_service_1.ChatsService, chats_users_events_1.default])
], ChatsUsersService);
exports.ChatsUsersService = ChatsUsersService;
//# sourceMappingURL=chats-users.service.js.map