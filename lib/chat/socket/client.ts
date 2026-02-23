import { io, Socket } from 'socket.io-client';
import { WebSocketMessage } from '@/types/chat.types';

class WebSocketClient {
  private socket: Socket | null = null;
  private url: string;
  private listeners: Map<string, Function[]> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private static instanceCount = 0;
  private instanceId: number;
  private heartbeatCounter = 0;
  
  constructor(url: string) {
    this.url = url;
    WebSocketClient.instanceCount++;
    this.instanceId = WebSocketClient.instanceCount;
  }

  //memory leak
  removeAllListeners(): void {
    this.listeners.clear();

    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
 

  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(this.url, {
          transports: ['websocket'],
          query: { userId }
        });

        this.socket.on('connect', () => {
          this.startHeartbeat();
          this.emit('connected');
          resolve();
        });

        this.socket.on('message', (message: WebSocketMessage) => {
          this.handleMessage(message);
        });

        this.socket.on('disconnect', (reason) => {
          this.stopHeartbeat();
          this.emit('disconnected', { reason });
        });

        this.socket.on('connect_error', (error) => {
          this.emit('error', error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.stopHeartbeat();
    this.listeners.clear();
  }

  send(event: string, data: any): void {
    if (this.socket && this.socket.connected) {
      const message: WebSocketMessage = {
        event,
        data,
        timestamp: Date.now()
      };
      this.socket.emit('message', message);
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    switch (message.event) {
      case 'newMessage':
        this.emit('message', message.data);
        break;
      case 'messageSent':
        this.emit('message-sent', message.data);
        break;
      case 'messageSeen':
        this.emit('message-seen', message.data);
        break;
      case 'userStatusChanged':
        this.emit('userStatusChanged', message.data);
        break;
      case 'groupMessage':
        this.emit('group-message', message.data);
        break;
      case 'error':
        this.emit('socket-error', message.data);
        break;
      default:
        this.emit(message.event, message.data);
    }
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.send('heartbeat', { timestamp: Date.now() });
      }
    }, 30000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  get isConnected(): boolean {
    return !!this.socket?.connected;
  }
}

let wsClient: WebSocketClient | null = null;

export const getWebSocketClient = (url?: string): WebSocketClient => {
  if (!wsClient) {
    const wsUrl = url || process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5001';
    wsClient = new WebSocketClient(wsUrl);
  }
  return wsClient;
};