/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../../schemas/chat.schema';
import { ChatUpdateDTO } from './ChatDTO';
import { ChatsService } from './chats.service';
import ChatsEvents from './chats.events';
import { Subject } from '../../utils/Observer';
export declare class ChatsModifyService extends Subject {
    private model;
    private chatsService;
    private chatsEvents;
    constructor(model: Model<ChatDocument>, chatsService: ChatsService, chatsEvents: ChatsEvents);
    onChatUpdate(chatId: string, senderId: string): void;
    onChatCreate(chatId: string, senderId: string): void;
    createChat(name: string, userId: string, users?: Array<string>): Promise<any>;
    updateChat(id: string, userId: string, data: ChatUpdateDTO): Promise<import("mongoose").Document<unknown, any, ChatDocument> & Chat & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
