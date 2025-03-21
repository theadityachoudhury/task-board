export type TaskStatus = 'TODO' | 'InProgress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  category: string; // Now required
  promptId: string; // To group tasks by the prompt that created them
  assignee?: string;
}

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
}