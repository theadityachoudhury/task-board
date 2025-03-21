import React from 'react';
import { Column } from './Column';
import { Task, TaskStatus } from '../../types/task';

interface BoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}

export const Board: React.FC<BoardProps> = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete, 
  onTaskMove 
}) => {
  const todoTasks = tasks.filter(task => task.status === 'TODO');
  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <Column
        title="TODO"
        status="TODO"
        tasks={todoTasks}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
        onTaskMove={onTaskMove}
      />
      <Column
        title="In Progress"
        status="InProgress"
        tasks={inProgressTasks}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
        onTaskMove={onTaskMove}
      />
      <Column
        title="Completed"
        status="Completed"
        tasks={completedTasks}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
        onTaskMove={onTaskMove}
      />
    </div>
  );
};