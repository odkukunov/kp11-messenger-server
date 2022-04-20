import { MessagesService } from './messages.service';
import JSendSerializer from 'r-jsend';
export declare class MessagesController {
    private messagesService;
    private jsendSerializer;
    constructor(messagesService: MessagesService, jsendSerializer: JSendSerializer);
    getMessages(ctx: any, query: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
}
