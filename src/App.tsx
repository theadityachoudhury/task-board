import React from 'react';
import { Layout } from './components/Layout/Layout';
import { Board } from './components/Board/Board';
import { Chat } from './components/Chat/Chat';
import { useTaskBoard } from './hooks/useTaskBoard';
import { useChat } from './hooks/useChat';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  const { 
    tasks, 
    addTasks, 
    updateTask, 
    moveTask, 
    deleteTask 
  } = useTaskBoard();
  
  const { 
    messages, 
    isLoading, 
    settings, 
    sendMessage, 
    updateSettings 
  } = useChat(addTasks);

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Task Board</h2>
            <Board
              tasks={tasks}
              onTaskUpdate={updateTask}
              onTaskDelete={deleteTask}
              onTaskMove={moveTask}
            />
          </div>
          <div className="h-[600px] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Chat Assistant</h2>
            <Chat
              messages={messages}
              isLoading={isLoading}
              settings={settings}
              onSendMessage={sendMessage}
              onSettingsChange={updateSettings}
            />
          </div>
        </div>
      </Layout>
    </DndProvider>
  );
};

export default App;