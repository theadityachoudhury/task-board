import React from 'react';
import { Column } from './Column';
import { TaskFilter } from './TaskFilter';
import { TaskStatistics } from './TaskStatistics';
import { Task, TaskStatus, TaskCategory } from '../../types/task';

interface BoardProps {
  tasks: Task[];
  categories: TaskCategory[];
  activeFilter: string | null;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onFilterChange: (filterId: string | null) => void;
}

export const Board: React.FC<BoardProps> = ({
  tasks,
  categories,
  activeFilter,
  onTaskUpdate,
  onTaskDelete,
  onTaskMove,
  onFilterChange
}) => {
  // Filter tasks based on the active filter
  const filterTasks = (tasks: Task[]) => {
    if (!activeFilter || activeFilter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.promptId === activeFilter);
  };

  const todoTasks = filterTasks(tasks.filter(task => task.status === 'TODO'));
  const inProgressTasks = filterTasks(tasks.filter(task => task.status === 'InProgress'));
  const completedTasks = filterTasks(tasks.filter(task => task.status === 'Completed'));

  // Find category colors for tasks
  const getCategoryColor = (task: Task) => {
    const category = categories.find(cat => cat.id === task.promptId);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <TaskStatistics tasks={tasks} activeFilter={activeFilter} />

      <TaskFilter
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />

      <div className="flex flex-col md:flex-row gap-4 p-4">
        <Column
          title="TODO"
          status="TODO"
          tasks={todoTasks}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
          onTaskMove={onTaskMove}
          getCategoryColor={getCategoryColor}
        />
        <Column
          title="In Progress"
          status="InProgress"
          tasks={inProgressTasks}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
          onTaskMove={onTaskMove}
          getCategoryColor={getCategoryColor}
        />
        <Column
          title="Completed"
          status="Completed"
          tasks={completedTasks}
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
          onTaskMove={onTaskMove}
          getCategoryColor={getCategoryColor}
        />
      </div>
    </div>
  );
};