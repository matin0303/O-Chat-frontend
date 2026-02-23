import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, ChatConversation, ChatMessage, SendMessagePayload, UserSearchResult } from '@/types/chat.types';
import { getWebSocketClient } from '../socket/client';
import api from '@/lib/api';

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversation: null,
      messages: {},
      activeMessages: [],
      isLoading: false,
      isConnected: false,
      error: null,
      socket: null,
      socketStatus: 'disconnected',
      currentUserId: null,
      searchResults: [],
      isSearching: false,
      searchQuery: '',

      setCurrentUserId: (userId: string | null) => {
        set({ currentUserId: userId });
      },

      setConversations: (conversations) => {
        set({ conversations });
      },

      setActiveConversation: (conversation) => {
        if (conversation) {
          const messages = get().messages[conversation.userId] || [];
          set({
            activeConversation: conversation,
            activeMessages: messages
          });

          // مارک کردن پیام‌ها به عنوان خوانده شده
          if (conversation.unreadCount > 0 && conversation.userId &&
            conversation.userId !== 'undefined' && conversation.userId !== 'null' &&
            !isNaN(Number(conversation.userId))) {
            get().markAsRead(conversation.userId);
          }

          // پاک کردن نتایج سرچ وقتی چتی انتخاب شد
          set({ searchResults: [], searchQuery: '' });
        } else {
          set({ activeConversation: null, activeMessages: [] });
        }
      },

      addMessage: (userId, messageOrMessages, options:any = {}) => {
        
        const { isIncoming = true } = options;
        const incomingMessages = Array.isArray(messageOrMessages)
          ? messageOrMessages
          : [messageOrMessages];
      
        if (incomingMessages.length === 0) return;
      
        const currentMessages = get().messages[userId] || [];
        const updatedMessages = [...currentMessages, ...incomingMessages];
        
        set((state) => ({
          messages: {
            ...state.messages,
            [userId]: updatedMessages
          }
        }));
      
        // activeMessages
        if (get().activeConversation?.userId === userId) {
          set({ activeMessages: updatedMessages });
        }
      
        set((state) => ({
          conversations: state.conversations.map(conv => {
            if (conv.userId !== userId) return conv;
      
            const lastIncoming = incomingMessages[incomingMessages.length - 1];
            const isActive = conv.userId === get().activeConversation?.userId;
      
            return {
              ...conv,
              lastMessage: lastIncoming.text,
              lastMessageTime: lastIncoming.timestamp,
              unreadCount: isActive 
                ? 0 
                : isIncoming 
                  ? conv.unreadCount + incomingMessages.length 
                  : conv.unreadCount 
            };
          })
        }));
      },

      sendMessage: async (payload) => {
        const { toUserId, content, messageType = 'text' } = payload;
        const wsClient = getWebSocketClient();

        try {
          const tempMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            text: content,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit'
            }),
            seen: false,
            delivered: false,
            messageType,
            temporary: true
          };

          get().addMessage(toUserId, tempMessage, { isIncoming: false });

          wsClient.send('sendMessage', {
            toUserId: parseInt(toUserId),
            content,
            messageType
          });

        } catch (error) {
          console.error('Failed to send message:', error);
          set({ error: 'Failed to send message' });
          throw error;
        }
      },

      markAsRead: async (userId) => {
        if (!userId || userId === 'undefined' || userId === 'null' || isNaN(Number(userId))) {
          console.error('Invalid userId for markAsRead:', userId);
          return;
        }

        try {
          await api.post(`/chat/${userId}/read`);

          set((state) => ({
            conversations: state.conversations.map(conv =>
              conv.userId === userId
                ? { ...conv, unreadCount: 0 }
                : conv
            ),
            messages: {
              ...state.messages,
              [userId]: state.messages[userId]?.map(msg =>
                msg.sender === 'them' ? { ...msg, seen: true } : msg
              )
            }
          }));

          const wsClient = getWebSocketClient();
          const parsedUserId = parseInt(userId);
          if (!isNaN(parsedUserId)) {
            wsClient.send('markAsSeen', {
              messageId: 'latest',
              toUserId: parsedUserId
            });
          }

        } catch (error) {
          console.error('Failed to mark as read:', error);
        }
      },


      connectWebSocket: async (userId: string) => {
        try {

          if (get().isConnected) {
            set({ currentUserId: userId });
            return;
          }

          set({ socketStatus: 'connecting', isLoading: true });

          const wsClient = getWebSocketClient();

          if (wsClient.isConnected) {
            wsClient.disconnect();
          }

          set({ currentUserId: userId });

          let listenersInitialized = false;

          if (!listenersInitialized) {

            wsClient.on('connected', () => {
              set({
                isConnected: true,
                socketStatus: 'connected',
                isLoading: false
              });

              setTimeout(() => {
                if (wsClient.isConnected) {
                  wsClient.send('registerUser', parseInt(userId));
                }
              }, 500);
            });

            wsClient.on('disconnected', () => {
              set({
                isConnected: false,
                socketStatus: 'disconnected'
              });
            });

            wsClient.on('message', (message: any) => {

              const newMessage: ChatMessage = {
                id: message.id?.toString() || `ws-${Date.now()}`,
                text: message.content,
                sender: 'them',
                timestamp: new Date(message.createdAt || Date.now()).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                }),
                seen: false,
                delivered: true,
                messageType: message.messageType || 'text'
              };

              get().addMessage(message.fromUserId.toString(), newMessage);
            });

            wsClient.on('user-status', (data: any) => {
              const { userId, isOnline, lastOnline } = data;
            
              set((state) => ({
                conversations: state.conversations.map((conv:any) =>
                  conv.userId === userId.toString()
                    ? {
                        ...conv,
                        isOnline,
                        lastSeen: isOnline ? null : lastOnline ? new Date(lastOnline).toISOString() : conv.lastSeen
                      }
                    : conv
                )
              }));
            });

            listenersInitialized = true;
          }

          await wsClient.connect(userId);

        } catch (error: any) {
          set({
            socketStatus: 'error',
            error: error.message,
            isLoading: false
          });
        }
      },

      disconnectWebSocket: () => {
        const wsClient = getWebSocketClient();
        wsClient.disconnect();
        set({
          isConnected: false,
          socketStatus: 'disconnected',
          socket: null
        });
      },

      updateUserStatus: (userId, status) => {
        set((state) => ({
          conversations: state.conversations.map(conv =>
            conv.userId === userId
              ? { ...conv, user: { ...conv.user, status } }
              : conv
          )
        }));
      },

      searchUsers: async (query: string, userId: string) => {
        if (!query.trim()) {
          set({ searchResults: [], searchQuery: '' });
          return;
        }

        set({ isSearching: true, searchQuery: query });

        try {
          const { data } = await api.get(`/users/search?q=${encodeURIComponent(query)}&i=${userId}`);

          const searchResults: UserSearchResult[] = data.users.map((user: any) => ({
            id: user.id,
            email: user.email,
            name: user.name || user.email.split('@')[0],
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.email.split('@')[0]}&background=6366f1&color=fff`,
            status: 'offline', 
            isOnline: false
          }));

          set({
            searchResults,
            isSearching: false
          });

        } catch (error) {
          console.error('Search error:', error);
          set({
            searchResults: [],
            isSearching: false,
            error: 'Failed to search users'
          });
        }
      },

      clearSearch: () => {
        set({
          searchResults: [],
          searchQuery: '',
          isSearching: false
        });
      },
      clearChat: () => {
        set({
          conversations: [],
          activeConversation: null,
          messages: {},
          activeMessages: [],
          currentUserId: null,
          isConnected: false,
          socketStatus: 'disconnected'
        });
      },
      startNewChat: async (userId: number): Promise<ChatConversation> => {
        try {
          const existingConversation = get().conversations.find(
            conv => conv.userId === userId.toString()
          );

          if (existingConversation) {
            set({ activeConversation: existingConversation });
            return existingConversation;
          }

          const { data } = await api.get(`/users/${userId}`);

          const newConversation: ChatConversation = {
            id: Date.now().toString(), 
            userId: userId.toString(),
            user: {
              id: userId.toString(),
              name: data.name || data.email.split('@')[0],
              email: data.email,
              avatar: data.avatar || `https://ui-avatars.com/api/?name=${data.email.split('@')[0]}&background=6366f1&color=fff`,
              status: 'offline',
              isVerified: data.isVerified || true
            },
            lastMessage: '',
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            isOnline: false,
            isNew: true 
          };

          set(state => ({
            conversations: [newConversation, ...state.conversations],
            activeConversation: newConversation,
            searchResults: [], 
            searchQuery: ''
          }));

          return newConversation;

        } catch (error) {
          console.error('Failed to start new chat:', error);
          throw error;
        }
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        conversations: state.conversations,
        messages: state.messages,
        currentUserId: state.currentUserId
      })
    }
  )
);