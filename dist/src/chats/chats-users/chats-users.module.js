"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsUsersModule = void 0;
const common_1 = require("@nestjs/common");
const chats_users_controller_1 = require("./chats-users.controller");
const chats_users_service_1 = require("./chats-users.service");
const chats_messages_module_1 = require("../chats-messages/chats-messages.module");
const chats_users_events_1 = require("./chats-users.events");
const users_module_1 = require("../../users/users.module");
const chats_module_1 = require("../chats.module");
let ChatsUsersModule = class ChatsUsersModule {
};
ChatsUsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [chats_users_controller_1.ChatsUsersController],
        providers: [chats_users_service_1.ChatsUsersService, chats_users_events_1.default],
        imports: [chats_messages_module_1.ChatsMessagesModule, users_module_1.UsersModule, chats_module_1.ChatsModule],
    })
], ChatsUsersModule);
exports.ChatsUsersModule = ChatsUsersModule;
//# sourceMappingURL=chats-users.module.js.map