/// <reference types="multer" />
import { ChatDTO, ChatUpdateDTO } from './ChatDTO';
import { ChatsService } from './chats.service';
import JSendSerializer from 'r-jsend';
import { ChatsModifyService } from './chats-modify.service';
export declare class ChatsController {
    private chatsService;
    private chatsModifyService;
    private jsendSerializer;
    constructor(chatsService: ChatsService, chatsModifyService: ChatsModifyService, jsendSerializer: JSendSerializer);
    createChat(ctx: any, data: ChatDTO): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    getChats(ctx: any, query: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    getChat(ctx: any, id: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    updateChat(ctx: any, id: any, data: ChatUpdateDTO, file: Express.Multer.File): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
}
