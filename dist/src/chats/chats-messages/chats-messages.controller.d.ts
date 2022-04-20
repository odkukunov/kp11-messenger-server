import { CreateMessageDTO } from './MessageDTO';
import JSendSerializer from 'r-jsend';
import { ChatsMessagesService } from './chats-messages.service';
export declare class ChatsMessagesController {
    private jsendSerializer;
    private chatMessagesService;
    constructor(jsendSerializer: JSendSerializer, chatMessagesService: ChatsMessagesService);
    sendMessage(ctx: any, chatId: any, data: CreateMessageDTO): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    getMessages(ctx: any, chatId: any, query: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
}
