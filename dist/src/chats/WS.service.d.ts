import { Message } from '../../schemas/message.schema';
import { ChatsService } from './chats.service';
import { Server } from 'socket.io';
export declare type TypingDTO = {
    chatId: string;
    userId: string;
    isTyping: boolean;
};
export declare class WSService {
    private chatsService;
    constructor(chatsService: ChatsService);
    server: Server;
    private clients;
    sendMessage(message: Message): Promise<void>;
    sendTyping(clientId: string, message: TypingDTO): Promise<void>;
    registerClient(clientId: string, userId: string): void;
    unregisterClient(clientId: string): void;
}
