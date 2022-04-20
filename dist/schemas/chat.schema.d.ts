import * as mongoose from 'mongoose';
import { UserDocument } from './user.schema';
import { MessageDocument } from './message.schema';
export declare type ChatDocument = Chat & Document;
export declare class Chat {
    name: string;
    avatar: string;
    users: Array<UserDocument>;
    creator: UserDocument;
    lastMessage: MessageDocument;
}
export declare const ChatSchema: mongoose.Schema<mongoose.Document<Chat, any, any>, mongoose.Model<mongoose.Document<Chat, any, any>, any, any, any>, any, any>;
