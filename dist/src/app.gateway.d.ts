import { OnGatewayInit } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDocument } from '../schemas/message.schema';
import { TypingDTO, WSService } from './chats/WS.service';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private wsService;
    constructor(wsService: WSService);
    afterInit(server: any): void;
    handleMessage(client: Socket, message: MessageDocument): Promise<void>;
    handleTyping(client: Socket, message: TypingDTO): Promise<void>;
    registerClient(client: Socket, userId: string): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
