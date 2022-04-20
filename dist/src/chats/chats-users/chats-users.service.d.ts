import { ChatsService } from '../chats.service';
import { Subject } from '../../../utils/Observer';
import ChatsUsersEvents from './chats-users.events';
export declare class ChatsUsersService extends Subject {
    private chatsService;
    private chatsUsersEvents;
    constructor(chatsService: ChatsService, chatsUsersEvents: ChatsUsersEvents);
    onUserAdd(chatId: string, senderId: string, userId: string): void;
    onUserRemove(chatId: string, senderId: string, userId: string): Promise<void>;
    onUserLeave(chatId: string, senderId: string): Promise<void>;
    onChatRemove(chatId: string, senderId: string): Promise<void>;
    addUsers(chatId: string, senderId: string, users: Array<string>): Promise<any>;
    removeUser(chatId: string, senderId: string, userId: string): Promise<any>;
    leave(chatId: string, senderId: string): Promise<any>;
}
