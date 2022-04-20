/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../../schemas/chat.schema';
export declare class ChatsService {
    private model;
    populateArray: string[];
    constructor(model: Model<ChatDocument>);
    getChats(name: string, page: number, userId: string): Promise<any>;
    getChat(id: string): Promise<import("mongoose").Document<unknown, any, ChatDocument> & Chat & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    isUserInChat(chat: ChatDocument, userId: string): boolean;
    isUserInChatException(chat: ChatDocument, userId: string): void;
    isUserCreatorException(chat: ChatDocument, userId: string): void;
}
