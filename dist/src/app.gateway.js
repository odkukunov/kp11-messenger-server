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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const WS_service_1 = require("./chats/WS.service");
let AppGateway = class AppGateway {
    constructor(wsService) {
        this.wsService = wsService;
    }
    afterInit(server) {
        this.wsService.server = server;
    }
    async handleMessage(client, message) {
        await this.wsService.sendMessage(message);
    }
    async handleTyping(client, message) {
        await this.wsService.sendTyping(client.id, message);
    }
    registerClient(client, userId) {
        this.wsService.registerClient(client.id, userId);
    }
    handleDisconnect(client) {
        this.wsService.unregisterClient(client.id);
        console.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('registerClient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "registerClient", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(1488),
    __metadata("design:paramtypes", [WS_service_1.WSService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map