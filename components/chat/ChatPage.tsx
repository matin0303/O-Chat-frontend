import { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, Loader2, ArrowLeft } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useUserStatus } from '@/hooks/useUserStatus';
import { TypingIndicator } from '@/components/chat/TypingIndicator';

interface ChatPageProps {
  conversation: any;
  chatSelected: boolean;
  setChatSelected: (chat: boolean) => void;
}

export function ChatPage({ conversation, setChatSelected, chatSelected }: ChatPageProps) {
  const [message, setMessage] = useState('');
  const { isTyping: otherUserIsTyping, sendTypingStatus ,isOnline , getStatusText:userStatusTxt} = useUserStatus(conversation.userId);
  const { activeMessages, handleSendMessage, markAsRead } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTypingStatusRef = useRef<boolean>(false);

  useEffect(() => {
    if (message.trim().length > 0) {
      // start typing if not
      if (!lastTypingStatusRef.current) {
        sendTypingStatus(conversation.userId, true);
        lastTypingStatusRef.current = true;
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        sendTypingStatus(conversation.userId, false);
        lastTypingStatusRef.current = false;
      }, 2000);
    }
    else if (message.trim().length === 0 && lastTypingStatusRef.current) {
      sendTypingStatus(conversation.userId, false);
      lastTypingStatusRef.current = false;

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }

    // cleanup
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, conversation.userId, sendTypingStatus]);

  useEffect(() => {
    return () => {
      sendTypingStatus(conversation.userId, false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [conversation.userId, sendTypingStatus]);

  //scroll when get new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, otherUserIsTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + 'px';
    }
  }, [message]);

  useEffect(() => {
    if (conversation?.userId && conversation.unreadCount > 0) {
      markAsRead(conversation.userId);
    }
  }, [conversation, markAsRead]);

  const handleSend = useCallback(async () => {
    if (!message.trim()) return;

    try {
      await handleSendMessage(message);
      setMessage('');

      sendTypingStatus(conversation.userId, false);
      lastTypingStatusRef.current = false;

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, [message, conversation.userId, handleSendMessage, sendTypingStatus]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };



  const getStatusText = () => {
    if (otherUserIsTyping) {
      return (
        <span className="flex items-center gap-2 text-indigo-400">
          <TypingIndicator size="sm" />
        </span>
      );
    }

    if (userStatusTxt) return userStatusTxt();
    if (conversation.user.lastSeen) return `Active ${conversation.user.lastSeen}`;
    return 'Offline';
  };

  return (
    <div className={` flex-1 ${chatSelected ? 'flex' : 'hidden md:flex'} flex-col`}>
      {/* Header */}
      <div className="h-20 border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-xl px-2 sm:px-8  flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => {
                  setChatSelected(false);
                }} className="md:hidden rounded-xl flex items-center justify-center group p-3">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </button>
          {/* User Avatar */}
          <div className="relative">
            <img
              src={conversation.user.avatar}
              alt={conversation.user.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
            />
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
            )}
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-white">{conversation.user.name}</h2>
            <div className="text-sm text-slate-400">
              {getStatusText()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="max-sm:hidden w-11 h-11 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 transition-colors flex items-center justify-center group">
            <Phone className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </button>
          <button className="max-sm:hidden w-11 h-11 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 transition-colors flex items-center justify-center group">
            <Video className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </button>
          <button className="w-11 h-11 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 transition-colors flex items-center justify-center group">
            <MoreVertical className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-5 sm:p-8 space-y-6 scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {activeMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <p>No messages yet</p>
            <p className="text-sm mt-2">Start the conversation!</p>
          </div>
        ) : (
          <>
            {activeMessages.map((msg, index) => {
              const isMe = msg.sender === 'me';
              const showTimestamp = index === 0 ||
                activeMessages[index - 1].timestamp !== msg.timestamp;

              return (
                <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {showTimestamp && (
                      <span className="text-xs text-slate-500 px-4">{msg.timestamp}</span>
                    )}
                    <div
                      className={`px-6 py-3 rounded-2xl relative ${isMe
                        ? 'bg-linear-to-br from-indigo-600 to-indigo-500 text-white rounded-br-sm'
                        : 'bg-slate-800/60 text-slate-100 rounded-bl-sm backdrop-blur-sm'
                        } ${msg.temporary ? 'opacity-80' : ''}`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>

                      {/* Message Status Indicator */}
                      {isMe && !msg.temporary && (
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          {msg.delivered && (
                            <span className="text-xs text-indigo-300">
                              {msg.seen ? 'Seen' : 'Delivered'}
                            </span>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}

            {/* {otherUserIsTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%]">
                  <div className="px-6 py-3 rounded-2xl bg-slate-800/60 text-slate-100 rounded-bl-sm backdrop-blur-sm">
                    <TypingIndicator userName={conversation.user.name} size="md" />
                  </div>
                </div>
              </div>
            )} */}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sm:p-6 p-2 border-t border-slate-800/50 bg-slate-900/20 backdrop-blur-xl">
        <div className="relative flex justify-center items-center gap-3">
          {/* Attachment Button */}
          <button className="w-11 h-11 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 transition-colors flex items-center justify-center group shrink-0">
            <Paperclip className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </button>

          {/* Input Field */}
          <div className="flex-1 flex justify-center items-center relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyPress}

              placeholder="Type your message..."
              rows={1}
              className="w-full bg-slate-800/40 border min-h-11 max-h-30 overflow-y-auto border-slate-700/50 rounded-2xl pl-6 pr-14 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800/60 transition-all  scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center group">
              <Smile className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 disabled:cursor-not-allowed transition-all flex items-center justify-center group shrink-0 shadow-lg shadow-indigo-500/20"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}