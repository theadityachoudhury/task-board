export type TaskStatus = 'TODO' | 'InProgress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  category?: string;
  assignee?: string;
}