import { useState, useEffect, useCallback, useRef } from 'react';
import { getWebSocketClient } from '@/lib/chat/socket/client';
import { useChatStore } from '@/lib/chat/store/chatStore';

export const useUserStatus = (userId?: string) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState<'online' | 'away' | 'offline' |  'invisible' |'busy'>('offline');
  const {updateUserStatus}= useChatStore()
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const sendTypingStatus = useCallback((conversationId: string, isTyping: boolean) => {
    const wsClient = getWebSocketClient();
    
    if (!wsClient.isConnected) return;
    
    wsClient.send('typing', {
      conversationId,
      isTyping
    });
    
  }, []);
  
  const changeStatus = useCallback((newStatus: 'online' | 'away' | 'busy' | 'invisible') => {
    const wsClient = getWebSocketClient();
    
    if (wsClient.isConnected) {
      wsClient.send('statusChange', {
        status: newStatus
      });
    }
    
    setStatus(newStatus);
    setIsOnline(newStatus === 'online' || newStatus === 'away');
  }, []);
  
  const useTyping = useCallback((conversationId: string) => {
    const startTyping = () => {
      sendTypingStatus(conversationId, true);
      setIsTyping(true);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingStatus(conversationId, false);
        setIsTyping(false);
      }, 2000);
    };
    
    const stopTyping = () => {
      sendTypingStatus(conversationId, false);
      setIsTyping(false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
    
    return { startTyping, stopTyping };
  }, [sendTypingStatus]);
  
  useEffect(() => {
    if (!userId) return;
    
    const wsClient = getWebSocketClient();
    
    const handleStatusChange = (data: any) => {
      if (data.userId.toString() === userId) {
        setIsOnline(data.isOnline);
        setStatus(data.status);
        updateUserStatus(data.userId.toString(),data.status)
      }
    };
    
    const handleTyping = (data: any) => {
      if (data.userId.toString() === userId) {
        setIsTyping(data.isTyping);
        
        if (data.isTyping && data.expiresIn) {
          setTimeout(() => {
            setIsTyping(false);
          }, data.expiresIn);
        }
      }
    };
    
    wsClient.on('userStatusChanged', handleStatusChange);
    wsClient.on('userTyping', handleTyping);
    
    return () => {
      wsClient.off('userStatusChanged', handleStatusChange);
      wsClient.off('userTyping', handleTyping);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [userId]);
  
  return {
    isOnline,
    isTyping,
    status,
    
    sendTypingStatus,
    changeStatus,
    useTyping,
    
    getStatusText: () => {
      if (isTyping) return 'Typing...';
      if (isOnline) return 'Online';
      if (status === 'away') return 'Away';
      if (status === 'busy') return 'Busy';
      return 'Offline';
    }
  };
};