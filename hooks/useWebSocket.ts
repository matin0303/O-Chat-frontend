import { useEffect, useRef, useCallback } from 'react';
import { getWebSocketClient } from '@/lib/chat/socket/client';
import { useChatStore } from '@/lib/chat/store/chatStore';

export const useWebSocket = () => {
  const wsClientRef = useRef(getWebSocketClient());
  const { addMessage, updateUserStatus } = useChatStore();

  const connect = useCallback(async (userId: string) => {
    try {
      await wsClientRef.current.connect(userId);
      
      wsClientRef.current.send('registerUser', parseInt(userId));
      
      return true;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    wsClientRef.current.disconnect();
  }, []);

  const sendMessage = useCallback((payload: any) => {
    wsClientRef.current.send('sendMessage', payload);
  }, []);

  const joinGroup = useCallback((groupId: string) => {
    wsClientRef.current.send('joinGroup', { groupId: parseInt(groupId) });
  }, []);

  const sendGroupMessage = useCallback((payload: any) => {
    wsClientRef.current.send('sendGroupMessage', payload);
  }, []);

  // تنظیم listeners
  useEffect(() => {
    const wsClient = wsClientRef.current;
    
    const handleNewMessage = (message: any) => {
      addMessage(message.fromUserId.toString(), {
        id: message.id.toString(),
        text: message.content,
        sender: 'them',
        timestamp: new Date(message.createdAt).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
        seen: false,
        delivered: message.delivered || true,
        messageType: message.messageType || 'text'
      });
    };

    const handleUserStatus = (data: any) => {
      updateUserStatus(data.userId.toString(), data.status);
    };

    wsClient.on('message', handleNewMessage);
    wsClient.on('user-status', handleUserStatus);

    return () => {
      wsClient.off('message', handleNewMessage);
      wsClient.off('user-status', handleUserStatus);
    };
  }, [addMessage, updateUserStatus]);

  return {
    connect,
    disconnect,
    sendMessage,
    joinGroup,
    sendGroupMessage,
    isConnected: wsClientRef.current.isConnected
  };
};