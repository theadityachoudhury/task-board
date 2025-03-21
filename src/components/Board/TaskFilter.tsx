import React from 'react';
import { TaskCategory } from '../../types/task';

interface TaskFilterProps {
  categories: TaskCategory[];
  activeFilter: string | null;
  onFilterChange: (filterId: string | null) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ 
  categories, 
  activeFilter, 
  onFilterChange 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by category:</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Tasks
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              activeFilter === category.id 
                ? 'bg-blue-500 text-white' 
                : `${category.color} hover:opacity-80`
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};