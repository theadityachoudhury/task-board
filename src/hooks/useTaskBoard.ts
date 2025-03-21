import { useState } from 'react';
import { Task, TaskStatus, TaskCategory } from '../types/task';

export const useTaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const addTasks = (newTasks: Task[], category?: TaskCategory) => {
    setTasks(prevTasks => [...prevTasks, ...newTasks]);
    
    if (category && !categories.some(c => c.id === category.id)) {
      setCategories(prev => [...prev, category]);
    }
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
    let filteredTasks = tasks.filter(task => task.status === status);
    
    if (activeFilter) {
      filteredTasks = filteredTasks.filter(task => 
        activeFilter === 'all' ? true : task.promptId === activeFilter
      );
    }
    
    return filteredTasks;
  };

  const getAllTasks = () => {
    if (activeFilter && activeFilter !== 'all') {
      return tasks.filter(task => task.promptId === activeFilter);
    }
    return tasks;
  };

  return {
    tasks,
    categories,
    activeFilter,
    addTasks,
    updateTask,
    moveTask,
    deleteTask,
    getTasksByStatus,
    getAllTasks,
    setActiveFilter
  };
};