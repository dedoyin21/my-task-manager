import React from 'react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const createdAt = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`flex justify-between items-start p-4 mb-3 rounded-xl shadow-lg border transition-all duration-300
        ${task.completed ? 'opacity-70' : ''}
        ${window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-green-900/80 border-green-800 hover:border-green-600' : 'bg-white border-green-100 hover:border-green-300'}
        min-h-[90px] min-w-[220px] max-w-full`}
    >
      <div className="flex-1">
        <label className="flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mr-2 accent-green-600 dark:accent-green-400"
          />
          <span className={task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100 font-medium'}>
            {task.title}
          </span>
        </label>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Created: {createdAt}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="ml-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold px-2 py-1 rounded transition-colors duration-200"
        title="Delete task"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
