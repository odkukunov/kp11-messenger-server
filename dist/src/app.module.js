"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_service_1 = require("./jwt/jwt.service");
const r_jsend_1 = require("r-jsend");
const user_schema_1 = require("../schemas/user.schema");
const chat_schema_1 = require("../schemas/chat.schema");
const message_schema_1 = require("../schemas/message.schema");
const app_gateway_1 = require("./app.gateway");
const chats_module_1 = require("./chats/chats.module");
const app_service_1 = require("./app.service");
const WS_service_1 = require("./chats/WS.service");
const users_module_1 = require("./users/users.module");
const chats_messages_module_1 = require("./chats/chats-messages/chats-messages.module");
const chats_users_module_1 = require("./chats/chats-users/chats-users.module");
const messages_module_1 = require("./messages/messages.module");
const models = mongoose_1.MongooseModule.forFeature([
    { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
    { name: chat_schema_1.Chat.name, schema: chat_schema_1.ChatSchema },
    { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema },
]);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/kp11-messenger'),
            models,
            chats_module_1.ChatsModule,
            users_module_1.UsersModule,
            chats_messages_module_1.ChatsMessagesModule,
            chats_users_module_1.ChatsUsersModule,
            messages_module_1.MessagesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, r_jsend_1.default, jwt_service_1.JwtService, app_gateway_1.AppGateway, WS_service_1.WSService],
        exports: [models, WS_service_1.WSService, r_jsend_1.default, jwt_service_1.JwtService, users_module_1.UsersModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map