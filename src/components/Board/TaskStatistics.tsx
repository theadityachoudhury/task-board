import React from 'react';
import { Task } from '../../types/task';

interface TaskStatisticsProps {
    tasks: Task[];
    activeFilter: string | null;
}

export const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks, activeFilter }) => {
    // Filter tasks if there's an active filter
    const filteredTasks = activeFilter && activeFilter !== 'all'
        ? tasks.filter(task => task.promptId === activeFilter)
        : tasks;

    const todoCount = filteredTasks.filter(task => task.status === 'TODO').length;
    const inProgressCount = filteredTasks.filter(task => task.status === 'InProgress').length;
    const completedCount = filteredTasks.filter(task => task.status === 'Completed').length;

    const totalTasks = filteredTasks.length;
    const completionRate = totalTasks > 0
        ? Math.round((completedCount / totalTasks) * 100)
        : 0;

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-medium text-lg mb-2">Task Statistics</h3>

            <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-gray-100 p-2 rounded text-center">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="font-bold">{totalTasks}</div>
                </div>
                <div className="bg-blue-100 p-2 rounded text-center">
                    <div className="text-sm text-blue-500">To Do</div>
                    <div className="font-bold text-blue-600">{todoCount}</div>
                </div>
                <div className="bg-yellow-100 p-2 rounded text-center">
                    <div className="text-sm text-yellow-600">In Progress</div>
                    <div className="font-bold text-yellow-700">{inProgressCount}</div>
                </div>
                <div className="bg-green-100 p-2 rounded text-center">
                    <div className="text-sm text-green-600">Completed</div>
                    <div className="font-bold text-green-700">{completedCount}</div>
                </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${completionRate}%` }}
                ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">
                {completionRate}% complete
            </div>
        </div>
    );
};