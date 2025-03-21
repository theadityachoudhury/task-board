import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage as ChatMessageType, ChatSettings } from '../../types/chat';

interface ChatProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  settings: ChatSettings;
  onSendMessage: (message: string) => void;
  onSettingsChange: (settings: Partial<ChatSettings>) => void;
}

export const Chat: React.FC<ChatProps> = ({ 
  messages, 
  isLoading, 
  settings, 
  onSendMessage, 
  onSettingsChange 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full border rounded-lg">
      <div className="p-3 border-b bg-gray-50">
        <h2 className="font-semibold">Task Assistant</h2>
        <p className="text-xs text-gray-500">
          Describe your tasks and I'll help organize them
        </p>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">
            <p>No messages yet</p>
            <p className="text-sm mt-2">
              Start by describing your tasks and I'll add them to your board
            </p>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput
        onSend={onSendMessage}
        isLoading={isLoading}
        settings={settings}
        onSettingsChange={onSettingsChange}
      />
    </div>
  );
};