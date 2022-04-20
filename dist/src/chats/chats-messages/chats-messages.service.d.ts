/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../../../schemas/message.schema';
import { ChatsService } from '../chats.service';
export declare class ChatsMessagesService {
    private model;
    private chatsService;
    constructor(model: Model<MessageDocument>, chatsService: ChatsService);
    sendMessage(senderId: string, chatId: string, content: string, isSystem?: boolean): Promise<any>;
    getMessages(senderId: string, chatId: string, page: number): Promise<{
        messages: (import("mongoose").Document<unknown, any, MessageDocument> & Message & Document & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        isLastPage: boolean;
    }>;
}
