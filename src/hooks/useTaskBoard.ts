import { useState } from 'react';
import { Task, TaskStatus } from '../types/task';

export const useTaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTasks = (newTasks: Task[]) => {
    setTasks(prevTasks => [...prevTasks, ...newTasks]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return {
    tasks,
    addTasks,
    updateTask,
    moveTask,
    deleteTask,
    getTasksByStatus
  };
};