"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsMessagesModule = void 0;
const common_1 = require("@nestjs/common");
const chats_messages_controller_1 = require("./chats-messages.controller");
const chats_messages_service_1 = require("./chats-messages.service");
const chats_module_1 = require("../chats.module");
let ChatsMessagesModule = class ChatsMessagesModule {
};
ChatsMessagesModule = __decorate([
    (0, common_1.Module)({
        controllers: [chats_messages_controller_1.ChatsMessagesController],
        providers: [chats_messages_service_1.ChatsMessagesService],
        exports: [chats_messages_service_1.ChatsMessagesService],
        imports: [chats_module_1.ChatsModule],
    })
], ChatsMessagesModule);
exports.ChatsMessagesModule = ChatsMessagesModule;
//# sourceMappingURL=chats-messages.module.js.map