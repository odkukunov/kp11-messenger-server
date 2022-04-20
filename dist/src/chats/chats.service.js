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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("../../schemas/chat.schema");
const object_1 = require("../../utils/object");
let ChatsService = class ChatsService {
    constructor(model) {
        this.model = model;
        this.populateArray = ['_id', 'name', 'surname', 'avatar', 'group'];
    }
    async getChats(name, page, userId) {
        const PER_PAGE = 40;
        let findObject = {
            users: userId,
        };
        if (name) {
            findObject = {
                name: {
                    $regex: name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                    $options: 'i',
                },
                users: userId,
            };
        }
        const query = this.model.find(findObject).select('name _id avatar creator');
        const result = {};
        const data = await query
            .clone()
            .skip(page * PER_PAGE)
            .limit(PER_PAGE)
            .populate({
            path: 'lastMessage',
            select: 'content sendAt sender',
        })
            .sort('-updatedAt name');
        result.count = await query.count();
        result.chats = data;
        result.isLastPage = data.length === 0;
        return result;
    }
    async getChat(id) {
        (0, object_1.IsObjectId)(id);
        const chat = await this.model.findById(id).populate('users', this.populateArray).select('-__v');
        if (!chat) {
            throw new common_1.NotFoundException('Чат с этим ID не найден');
        }
        return chat;
    }
    isUserInChat(chat, userId) {
        return chat.users.some((user) => user._id.toString() === userId.toString());
    }
    isUserInChatException(chat, userId) {
        if (!this.isUserInChat(chat, userId)) {
            throw new common_1.BadRequestException('Вы не состоите в этом чате');
        }
    }
    isUserCreatorException(chat, userId) {
        if (chat.creator._id.toString() !== userId.toString()) {
            throw new common_1.ForbiddenException('Вы должны быть создателем чата для этого');
        }
    }
};
ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map