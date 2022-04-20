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
const WS_service_1 = require("../WS.service");
const users_service_1 = require("../../users/users.service");
const chats_messages_service_1 = require("../chats-messages/chats-messages.service");
const common_1 = require("@nestjs/common");
let ChatsUsersEvents = class ChatsUsersEvents {
    constructor(wsService, usersService, chatMessagesService) {
        this.wsService = wsService;
        this.usersService = usersService;
        this.chatMessagesService = chatMessagesService;
    }
    async onEvent(event, chatId, senderId, userId) {
        switch (event) {
            case 'userAdd': {
                const user = await this.usersService.getById(userId);
                const message = await this.chatMessagesService.sendMessage(senderId.toString(), chatId, `Пригласил(-а) пользователя ${user.name + ' ' + user.surname}`, true);
                return await this.wsService.sendMessage(Object.assign(Object.assign({}, message), { action: 'userAdd', target: userId }));
            }
            case 'userRemove': {
                const user = await this.usersService.getById(userId);
                const message = await this.chatMessagesService.sendMessage(senderId.toString(), chatId, `Удалил(-а) пользователя ${user.name + ' ' + user.surname}`, true);
                return await this.wsService.sendMessage(Object.assign(Object.assign({}, message), { action: 'userRemove', target: userId }));
            }
            case 'userLeave': {
                const message = await this.chatMessagesService.sendMessage(senderId.toString(), chatId, `Покинул(-а) чат`, true);
                return await this.wsService.sendMessage(Object.assign(Object.assign({}, message), { target: senderId, action: 'userLeave' }));
            }
            case 'chatRemove': {
                const message = await this.chatMessagesService.sendMessage(senderId.toString(), chatId, `Удалил(-а) чат`, true);
                return await this.wsService.sendMessage(Object.assign(Object.assign({}, message), { target: senderId, action: 'chatRemove' }));
            }
        }
    }
};
ChatsUsersEvents = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [WS_service_1.WSService,
        users_service_1.UsersService,
        chats_messages_service_1.ChatsMessagesService])
], ChatsUsersEvents);
exports.default = ChatsUsersEvents;
//# sourceMappingURL=chats-users.events.js.map