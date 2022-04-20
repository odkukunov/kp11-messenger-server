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
const common_1 = require("@nestjs/common");
const WS_service_1 = require("./WS.service");
const chats_messages_service_1 = require("./chats-messages/chats-messages.service");
let ChatsEvents = class ChatsEvents {
    constructor(wsService, chatMessagesService) {
        this.wsService = wsService;
        this.chatMessagesService = chatMessagesService;
    }
    async onEvent(event, chatId, senderId) {
        let content;
        if (event === 'chatUpdate') {
            content = `Изменил(-а) данные чата`;
        }
        else {
            content = `Создал(-а) чат`;
        }
        const message = await this.chatMessagesService.sendMessage(senderId.toString(), chatId, content, true);
        await this.wsService.sendMessage(Object.assign(Object.assign({}, message), { action: 'changeChat' }));
    }
};
ChatsEvents = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [WS_service_1.WSService, chats_messages_service_1.ChatsMessagesService])
], ChatsEvents);
exports.default = ChatsEvents;
//# sourceMappingURL=chats.events.js.map