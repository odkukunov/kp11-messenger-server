import { WSService } from '../WS.service';
import { UsersService } from '../../users/users.service';
import { ChatsMessagesService } from '../chats-messages/chats-messages.service';
import { Subscriber } from '../../../utils/Observer';
export default class ChatsUsersEvents implements Subscriber {
    private wsService;
    private usersService;
    private chatMessagesService;
    constructor(wsService: WSService, usersService: UsersService, chatMessagesService: ChatsMessagesService);
    onEvent(event: string, chatId: string, senderId: string, userId: string): Promise<void>;
}
