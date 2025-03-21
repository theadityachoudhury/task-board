/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Task } from '../../types/task';
import { useDrag } from 'react-dnd';

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  categoryColor?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdate,
  onDelete,
  categoryColor = 'bg-gray-100 text-gray-800'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      ref={drag as any}
      className={`bg-white p-4 rounded-lg shadow-md mb-3 cursor-grab border-l-4 border-l-blue-500 ${isDragging ? 'opacity-50' : 'opacity-100'
        }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full border rounded p-1"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full border rounded p-1 h-20"
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="w-full border rounded p-1"
          />
          <input
            name="category"
            value={editedTask.category}
            onChange={handleChange}
            className="w-full border rounded p-1"
            placeholder="Category"
          />
          {editedTask.assignee !== undefined && (
            <input
              name="assignee"
              value={editedTask.assignee || ''}
              onChange={handleChange}
              className="w-full border rounded p-1"
              placeholder="Assignee"
            />
          )}
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleCancel}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{task.title}</h3>
            <div className={`flex space-x-1 ${task.status === 'Completed' ? 'hidden' : ''}`}>
              <button
                onClick={handleEdit}
                className="text-gray-500 hover:text-blue-500"
                disabled={task.status === 'Completed'}
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-500 hover:text-red-500"
                disabled={task.status === 'Completed'}
              >
                🗑️
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${categoryColor}`}>
              {task.category}
            </span>
            {task.assignee && (
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs">
                👤 {task.assignee}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};