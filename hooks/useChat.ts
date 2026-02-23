// در useChat.ts - جایگزین کل فایل با این کد:

import { useEffect, useCallback, useRef, useState } from 'react';
import { useChatStore } from '@/lib/chat/store/chatStore';
import { useAuth } from '@/context/AuthProvider';
import api from '@/lib/api';
import { ChatConversation, UserSearchResult } from '@/types/chat.types';

// 🔥 یک singleton برای مدیریت اتصال WebSocket
let globalWsConnected = false;

export const useChat = () => {
  const { user } = useAuth();
  const userId = user?.id ? String(user.id) : null;
  
  const connectionInitRef = useRef(false);
  const [localSocketStatus, setLocalSocketStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  
  const {
    conversations,
    activeConversation,
    activeMessages,
    isLoading,
    isConnected,
    socketStatus,
    error,
    currentUserId,
    searchResults,
    isSearching,
    searchQuery,
    setConversations,
    setActiveConversation,
    setCurrentUserId,
    sendMessage,
    connectWebSocket,
    disconnectWebSocket,
    markAsRead,
    clearChat,
    searchUsers: storeSearchUsers,
    clearSearch,
    startNewChat: storeStartNewChat,
  } = useChatStore();

  useEffect(() => {
    if (!userId || connectionInitRef.current || globalWsConnected) {
      return;
    }
    
    connectionInitRef.current = true;
    globalWsConnected = true;
    setLocalSocketStatus('connecting');
    
    const init = async () => {
      try {
        await connectWebSocket(userId);
        setLocalSocketStatus('connected');
        
        setTimeout(() => {
          loadConversations();
        }, 1000);
      } catch (err) {
        setLocalSocketStatus('error');
        connectionInitRef.current = false;
        globalWsConnected = false;
      }
    };
    
    init();
    
    return () => {
      if (!userId) {
        disconnectWebSocket();
        connectionInitRef.current = false;
        globalWsConnected = false;
      }
    };
  }, [userId, connectWebSocket, disconnectWebSocket]);

  const loadConversations = useCallback(async () => {
    if (!userId) return;

    try {
      const { data } = await api.get('/chat/list');
      
      const formattedConversations: ChatConversation[] = data.chats
        .filter((chat: any) => chat.id != null && !isNaN(Number(chat.id)))
        .map((chat: any) => ({
          id: chat.id?.toString() || chat.otherUserId?.toString(),
          userId: chat.id?.toString(),
          user: {
            id: chat.id?.toString(),
            name: chat.email?.split('@')[0] || 'User',
            email: chat.email,
            avatar: chat.avatar || `https://ui-avatars.com/api/?name=${chat.email?.split('@')[0] || 'User'}&background=6366f1&color=fff`,
            status: chat.isOnline ? 'online' : 'offline',
            isVerified: true
          },
          lastMessage: chat.lastMessage?.content || '',
          lastMessageTime: chat.lastMessage?.time || new Date().toISOString(),
          unreadCount: chat.unreadCount || 0,
          isOnline: chat.isOnline || false,
          lastSeen: chat.lastSeen
        }));
      
      setConversations(formattedConversations);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  }, [userId, setConversations]);

  const loadChatHistory = useCallback(async (conversationUserId: string) => {
    if (!conversationUserId || !userId) return;

    try {
      const { data } = await api.get(`/chat/history/${conversationUserId}?me=${userId}&limit=50`);

      const formattedMessages = data.messages.map((msg: any) => ({
        id: msg.id.toString(),
        text: msg.content,
        sender: msg.fromUserId.toString() === userId ? 'me' : 'them',
        timestamp: new Date(msg.createdAt).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
        seen: msg.seen || false,
        delivered: msg.delivered || false,
        temporary:false,
        messageType: msg.messageType || 'text'
      }));

      useChatStore.getState().addMessage(conversationUserId, formattedMessages);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }, [userId]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!activeConversation || !content.trim() || !userId) {
      return;
    }

    try {
      await sendMessage({
        toUserId: activeConversation.userId,
        content,
        messageType: 'text'
      });
    } catch (error) {
      throw error;
    }
  }, [activeConversation, userId, sendMessage]);

  const handleSelectChat = useCallback(async (conversation: ChatConversation) => {
    setActiveConversation(conversation);

    const existingMessages = useChatStore.getState().messages[conversation.userId];
    if (!existingMessages || existingMessages.length === 0) {
      await loadChatHistory(conversation.userId);
    }
  }, [setActiveConversation, loadChatHistory]);

  const markingAsReadRef = useRef<Set<string>>(new Set());
  
  const handleMarkAsRead = useCallback(async (userIdToMark: string) => {
    if (!userIdToMark || markingAsReadRef.current.has(userIdToMark)) {
      return;
    }
    
    markingAsReadRef.current.add(userIdToMark);
    
    try {
      await markAsRead(userIdToMark);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    } finally {
      setTimeout(() => {
        markingAsReadRef.current.delete(userIdToMark);
      }, 1000);
    }
  }, [markAsRead]);

  const searchUsers = useCallback(async (query: string, currentUserId: string) => {
    if (!query.trim()) return;
    await storeSearchUsers(query, currentUserId);
  }, [storeSearchUsers]);

  const handleStartNewChat = useCallback(async (userId: number) => {
    try {
      const conversation = await storeStartNewChat(userId);
      return conversation;
    } catch (error) {
      throw error;
    }
  }, [storeStartNewChat]);

  return {
    conversations,
    activeConversation,
    activeMessages,
    isLoading,
    isConnected,
    socketStatus: localSocketStatus || socketStatus,
    error,
    currentUserId,
    searchResults,
    isSearching,
    searchQuery,

    // Actions
    loadConversations,
    handleSelectChat,
    handleSendMessage,
    handleLogout: () => {
      disconnectWebSocket();
      clearChat();
      connectionInitRef.current = false;
      globalWsConnected = false;
    },
    markAsRead: handleMarkAsRead,

    searchUsers,
    clearSearch,
    startNewChat: handleStartNewChat,
  };
};