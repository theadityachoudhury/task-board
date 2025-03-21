import React, { useState } from 'react';
import { ChatSettings } from '../../types/chat';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  settings: ChatSettings;
  onSettingsChange: (settings: Partial<ChatSettings>) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  isLoading, 
  settings, 
  onSettingsChange 
}) => {
  const [message, setMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numValue = name === 'temperature' || name === 'maxTokens' 
      ? parseFloat(value) 
      : value;
    
    onSettingsChange({ [name]: numValue });
  };

  return (
    <div className="border-t p-4">
      <div className="mb-2 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm text-blue-500 flex items-center"
        >
          <span>{showSettings ? 'Hide' : 'Show'} Settings</span>
          <svg 
            className={`ml-1 w-4 h-4 transition-transform ${showSettings ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isLoading && <span className="text-sm text-gray-500">Processing...</span>}
      </div>
      
      {showSettings && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature: {settings.temperature}
              </label>
              <input
                type="range"
                name="temperature"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={handleSettingsChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <select
                name="agent"
                value={settings.agent}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded"
              >
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-35-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Tokens: {settings.maxTokens}
              </label>
              <input
                type="range"
                name="maxTokens"
                min="100"
                max="4000"
                step="100"
                value={settings.maxTokens}
                onChange={handleSettingsChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your tasks..."
          className="flex-grow p-2 border rounded-l-lg resize-none"
          rows={2}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`px-4 rounded-r-lg ${
            isLoading || !message.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={isLoading || !message.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};