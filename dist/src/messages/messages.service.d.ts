/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../../schemas/message.schema';
export declare class MessagesService {
    private model;
    constructor(model: Model<MessageDocument>);
    getMessages(userId: string, query: string, page: number): Promise<{
        isLastPage: boolean;
        messages: (import("mongoose").Document<unknown, any, MessageDocument> & Message & Document & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
