import { Search, MoreVertical, UserPlus, X, Loader2, ArrowLeft } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useState, useEffect, useRef, useCallback } from 'react';
import { UserSearchResult } from '@/types/chat.types';
import { useAuth } from '@/context/AuthProvider';
import { useUserStatus } from '@/hooks/useUserStatus';
import Link from 'next/link';

interface ChatListProps {
  selectedChatId?: string;
  onSelectChat: (conversation: any) => void;
  chatSelected:boolean;
  setChatSelected:(chat:boolean) => void
}

export function ChatList({ selectedChatId, onSelectChat , setChatSelected ,chatSelected}: ChatListProps) {
  const { user } = useAuth();
  const {
    conversations,
    isLoading,
    socketStatus,
    searchUsers,
    clearSearch,
    startNewChat,
    searchResults,
    isSearching,
    searchQuery
  } = useChat();
  const { isOnline } = useUserStatus(selectedChatId);

  const [localSearch, setLocalSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (localSearch.trim() && user?.id) {
      searchTimeoutRef.current = setTimeout(() => {
        searchUsers(localSearch, String(user?.id));
        setShowSearchResults(true);
      }, 500);
    } else {
      clearSearch();
      setShowSearchResults(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [localSearch, searchUsers, clearSearch]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.search-results')
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectUser = async (user: UserSearchResult) => {
    try {
      const conversation = await startNewChat(user.id);
      onSelectChat(conversation);
      setLocalSearch('');
      setShowSearchResults(false);
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    clearSearch();
    setShowSearchResults(false);
    searchInputRef.current?.focus();
  };

  const statusColor = (isOnline: boolean) =>
    isOnline ? 'bg-emerald-500' : 'bg-slate-600';

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="w-[380px] border-r border-slate-800/50 bg-slate-900/30 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="mt-4 text-slate-400">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className={`${chatSelected?'hidden md:block md:w-[380px]':'block w-full md:w-[380px]'} border-r border-slate-800/50 bg-slate-900/30 backdrop-blur-xl flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl">Messages</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${socketStatus === 'connected' ? 'bg-emerald-500' :
                  socketStatus === 'connecting' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
              <span className="text-xs text-slate-400 capitalize">
                {socketStatus}
              </span>
            </div>
          </div>
          <Link href={'/'} className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
        </div>

        {/* Search */}
        <div className="relative" ref={searchInputRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search users by email..."
              className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl pl-12 pr-10 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800/60 transition-all"
            />
            {localSearch && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-slate-700/50 transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (searchResults.length > 0 || isSearching) && (
            <div className="search-results absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin mr-2" />
                  <span className="text-slate-400">Searching...</span>
                </div>
              ) : (
                <>
                  <div className="p-3 border-b border-slate-800/50">
                    <h3 className="text-sm font-medium text-slate-300">
                      Search Results ({searchResults.length})
                    </h3>
                  </div>

                  <div className="py-1">
                    {searchResults.map((user: any) => (
                      <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="w-full p-3 flex items-center gap-3 hover:bg-slate-800/50 transition-colors text-left"
                      >
                        <div className="relative shrink-0">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                          />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColor(user.isOnline || false)} rounded-full border-2 border-slate-900`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-slate-200 font-medium truncate">
                              {user.name}
                            </h4>
                            <span className="text-xs text-slate-500 ml-2 shrink-0">
                              {user.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="shrink-0">
                          <UserPlus className="w-4 h-4 text-indigo-400" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {searchResults.length === 0 && localSearch.trim() && (
                    <div className="p-4 text-center text-slate-500">
                      <p>No users found for "{localSearch}"</p>
                      <p className="text-sm mt-1">Try a different email address</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto relative">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg text-slate-300 mb-2">No conversations yet</p>
            <p className="text-sm text-slate-500 text-center mb-6">
              Search for users by email to start chatting
            </p>
            <div className="text-xs text-slate-600">
              <p>• Type an email in the search bar above</p>
              <p>• Click on a user to start a new chat</p>
            </div>
          </div>
        ) : (
          conversations.map((conversation: any) => {
            const isSelected = conversation.id === selectedChatId;

            return (
              <button
                key={conversation.id}
                onClick={() => {
                  onSelectChat(conversation);
                  setChatSelected(true);
                }}
                className={`w-full p-4 flex items-start gap-4 transition-all border-l-4 relative group ${isSelected
                    ? 'bg-linear-to-r from-indigo-500/10 to-transparent border-l-indigo-500'
                    : 'border-l-transparent hover:bg-slate-800/30'
                  } ${conversation.isNew ? 'animate-pulse-subtle' : ''}`}
              >


                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-800/50"
                  />
                  {isOnline ? (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                  ) : conversation.lastSeen ? (
                    <div className="absolute bottom-0 right-0 text-[10px] text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                      {formatTime(conversation.lastSeen)}
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-slate-200 truncate">
                        {conversation.user.name}
                      </h3>
                      {conversation.isNew && (
                        <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 ml-2 mb-3 shrink-0">
                      {formatTime(conversation.lastMessageTime) === 'Invalid Date' ? conversation.lastMessageTime : formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">
                    {conversation.lastMessage || 'Start a conversation...'}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white">
                    {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}