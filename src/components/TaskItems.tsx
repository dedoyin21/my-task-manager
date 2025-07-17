import React from 'react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  theme: 'light' | 'dark';
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, theme }) => {
  const createdAt = new Date(task.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const containerClass = `
    flex justify-between items-start p-5 rounded-2xl shadow-lg border transition-all duration-300 group relative
    ${task.completed ? 'opacity-60' : ''}
    ${theme === 'dark'
      ? 'bg-green-950 text-green-100 border-green-700 hover:border-teal-500'
      : 'bg-white text-black border-green-200 hover:border-green-300'}
  `;

  const textClass = `
    text-base leading-snug
    ${task.completed ? 'line-through opacity-70' : ''}
  `;

  const dateClass = `
    text-xs mt-1
    ${theme === 'dark' ? 'text-green-300' : 'text-gray-500'}
  `;

  return (
    <div className={containerClass}>
      <div className="flex-1 pr-2">
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="accent-green-600 dark:accent-teal-400 mt-1"
          />
          <span className={textClass}>{task.title}</span>
        </label>
        <div className={dateClass}>Created: {createdAt}</div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm px-2 py-1 rounded transition"
        title="Delete task"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
