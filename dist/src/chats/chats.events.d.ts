import { WSService } from './WS.service';
import { Subscriber } from '../../utils/Observer';
import { ChatsMessagesService } from './chats-messages/chats-messages.service';
export default class ChatsEvents implements Subscriber {
    private wsService;
    private chatMessagesService;
    constructor(wsService: WSService, chatMessagesService: ChatsMessagesService);
    onEvent(event: string, chatId: string, senderId: string): Promise<void>;
}
