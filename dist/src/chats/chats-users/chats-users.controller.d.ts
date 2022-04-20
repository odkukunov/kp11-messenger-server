import { ChatsUsersService } from './chats-users.service';
import JSendSerializer from 'r-jsend';
export declare class ChatsUsersController {
    private jsendSerializer;
    private chatsUsersService;
    constructor(jsendSerializer: JSendSerializer, chatsUsersService: ChatsUsersService);
    addUsers(ctx: any, params: any, data: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    leaveFromChat(ctx: any, params: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
    removeUser(ctx: any, params: any): Promise<import("r-jsend/lib/JSendResponseTypes").JSendResponse>;
}
