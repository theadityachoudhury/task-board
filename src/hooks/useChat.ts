import { useState } from 'react';
import { ChatMessage, ChatSettings } from '../types/chat';
import { generateTasksFromPrompt } from '../services/aiService';
import { Task, TaskCategory } from '../types/task';

export const useChat = (onTasksGenerated: (tasks: Task[], category: TaskCategory) => void) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 0.7,
    agent: 'gpt-4o',
    maxTokens: 1000
  });

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      const { tasks, response, category } = await generateTasksFromPrompt(content, settings);
      
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      onTasksGenerated(tasks, category);
    } catch (error) {
      console.error('Error in chat:', error);
      
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (newSettings: Partial<ChatSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    messages,
    isLoading,
    settings,
    sendMessage,
    updateSettings
  };
};