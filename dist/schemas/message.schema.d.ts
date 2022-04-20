import mongoose from 'mongoose';
import { UserDocument } from './user.schema';
import { ChatDocument } from './chat.schema';
export declare type MessageDocument = Message & Document;
export declare class Message {
    sender: UserDocument;
    chat: ChatDocument;
    content: string;
    sendAt: Date;
    isSystem: boolean;
}
export declare const MessageSchema: mongoose.Schema<mongoose.Document<Message, any, any>, mongoose.Model<mongoose.Document<Message, any, any>, any, any, any>, any, any>;
