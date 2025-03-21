/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '../../types/task';
import { useDrop } from 'react-dnd';

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  getCategoryColor: (task: Task) => string;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  status,
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onTaskMove,
  getCategoryColor
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string }) => {
      onTaskMove(item.id, status);
      return { moved: true };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as any}
      className={`bg-gray-100 p-4 rounded-lg w-full md:w-1/3 min-h-[500px] transition-colors ${isOver ? 'bg-blue-100 border-2 border-blue-300' : ''
        }`}
    >
      <h2 className="font-bold text-xl mb-4">{title} ({tasks.length})</h2>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
            categoryColor={getCategoryColor(task)}
          />
        ))}
        {isOver && tasks.length === 0 && (
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 flex items-center justify-center text-blue-500">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
};