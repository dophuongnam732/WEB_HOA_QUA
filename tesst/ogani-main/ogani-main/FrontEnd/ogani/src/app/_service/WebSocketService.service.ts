import { Injectable } from '@angular/core';
import { Client, Message, StompConfig, createStompSocket, IStompSocket } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private newOrderSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => {
        return createStompSocket(() => new WebSocket('ws://localhost:8080/ws'));
      },
      // ...
    });
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/newOrder', (message: Message) => {
        const notification = message.body;
        this.newOrderSubject.next(notification);
      });
    };
  }

  // ...

  getNewOrderSubject() {
    return this.newOrderSubject;
  }
}
