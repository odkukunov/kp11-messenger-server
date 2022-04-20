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
exports.WSService = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
let WSService = class WSService {
    constructor(chatsService) {
        this.chatsService = chatsService;
        this.clients = [];
    }
    async sendMessage(message) {
        const chat = await this.chatsService.getChat(message.chat.toString());
        this.clients.forEach((cl) => {
            if (chat.users.find((user) => user._id.toString() === cl.userId)) {
                this.server.to(cl.socketId).emit('message', message);
            }
        });
    }
    async sendTyping(clientId, message) {
        const chat = await this.chatsService.getChat(message.chatId);
        const sender = this.clients.find((cl2) => cl2.socketId === clientId);
        this.clients.forEach((cl) => {
            if (chat.users.find((user) => user._id.toString() === cl.userId)) {
                this.server.to(cl.socketId).emit('typing', Object.assign(Object.assign({}, message), { userId: sender === null || sender === void 0 ? void 0 : sender.userId }));
            }
        });
    }
    registerClient(clientId, userId) {
        const newClient = { userId, socketId: clientId };
        const findIndex = this.clients.findIndex((cl) => cl.socketId === clientId || cl.userId === userId);
        if (findIndex !== -1) {
            this.clients[findIndex] = newClient;
        }
        else {
            this.clients.push(newClient);
        }
    }
    unregisterClient(clientId) {
        this.clients = this.clients.filter((c) => c.socketId !== clientId);
    }
};
WSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chats_service_1.ChatsService])
], WSService);
exports.WSService = WSService;
//# sourceMappingURL=WS.service.js.map