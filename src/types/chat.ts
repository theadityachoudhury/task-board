export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }
  
  export interface ChatSettings {
    temperature: number;
    agent: string;
    maxTokens: number;
  }