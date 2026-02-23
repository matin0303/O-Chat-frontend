export type UserStatus = 'online' | 'offline' | 'away' | 'idle';

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  status: UserStatus;
  lastSeen?: string;
  isVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  seen: boolean;
  delivered: boolean;
  messageType?: 'text' | 'image' | 'file';
  // برای پیام‌های real-time
  temporary?: boolean;
}

export interface ChatConversation {
  id: string;
  userId: string;
  user: ChatUser;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isGroup?: boolean;
  groupId?: string;
  isNew?:boolean
}

export interface WebSocketMessage {
  event: string;
  data: any;
  timestamp: number;
}

export interface SendMessagePayload {
  toUserId: string;
  content: string;
  messageType?: 'text' | 'image' | 'file';
  groupId?: string;
}

export interface UserSearchResult {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  status: UserStatus;
  isOnline?: boolean;
  lastSeen?: string;
}

import type { Socket } from 'socket.io-client';

export interface ChatState {
  // لیست چت‌ها
  conversations: ChatConversation[];
  activeConversation: ChatConversation | null;
  
  // پیام‌ها
  messages: Record<string, ChatMessage[]>; // userId -> messages
  activeMessages: ChatMessage[];
  
  // وضعیت
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;

  //search user
  searchResults: UserSearchResult[];
  isSearching: boolean;
  searchQuery: string;
  
  // WebSocket
  socket: Socket | null;
  socketStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  currentUserId: string | null;
  // Actions
  setConversations: (conversations: ChatConversation[]) => void;
  setActiveConversation: (conversation: ChatConversation | null) => void;
  setCurrentUserId: (userId: string | null) => void;
  addMessage: (userId: string, message: ChatMessage | ChatMessage[], options?: { isIncoming?: boolean }) => void;
  sendMessage: (payload: SendMessagePayload) => Promise<void>;
  markAsRead: (userId: string) => Promise<void>;
  connectWebSocket: (userId: string) => Promise<void>;
  disconnectWebSocket: () => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  searchUsers: (query: string , userId:string) => Promise<void>;
  clearSearch: () => void;
  startNewChat: (userId: number) => Promise<ChatConversation>;
  clearChat: () => void;
}