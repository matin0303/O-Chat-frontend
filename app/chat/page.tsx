"use client"
import { useEffect, useState } from 'react';
import { ChatList } from '@/components/chat/ChatList';
import { ChatPage as ChatConversationView } from '@/components/chat/ChatPage';
import { useChat } from '@/hooks/useChat';

export default function ChatPage() {
  const [chatSelected , setChatSelected] = useState(false)

  const {
    conversations,
    activeConversation,
    isLoading,
    socketStatus,
    handleSelectChat,
    loadConversations
  } = useChat();

  // Refresh conversations 
  useEffect(() => {
    const interval = setInterval(() => {
      if (socketStatus === 'connected') {
        loadConversations();
      }
    }, 10000);

    return () => clearInterval(interval);

  }, [socketStatus, loadConversations]);


  return (
    <div className="h-screen w-full flex overflow-hidden z-20">
      <ChatList
        selectedChatId={activeConversation?.id}
        onSelectChat={handleSelectChat}
        setChatSelected = {setChatSelected}
        chatSelected={chatSelected}
      />
      
      {activeConversation ? (
        <ChatConversationView conversation={activeConversation} chatSelected={chatSelected} setChatSelected = {setChatSelected} />
      ) : (
        <div className={`flex-1 ${chatSelected ? 'flex':'hidden md:flex'} flex-col items-center justify-center text-slate-400 p-8`}>
          <div className="text-center">
            <h3 className="text-xl text-white mb-2">Welcome to O-Chat</h3>
            <p className="mb-6">Select a conversation to start messaging</p>
            
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                socketStatus === 'connected' ? 'bg-emerald-500' : 
                socketStatus === 'connecting' ? 'bg-amber-500' : 'bg-red-500'
              }`} />
              <span className="text-slate-400">
                WebSocket: {socketStatus}
              </span>/
            </div>
            
            {conversations.length === 0 && !isLoading && (
              <button 
                onClick={() => loadConversations()}
                className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Refresh Conversations
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}