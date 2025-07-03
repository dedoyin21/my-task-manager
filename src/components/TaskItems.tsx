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
    <div className="flex justify-between items-start bg-white p-3 rounded shadow mb-2">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mr-2 accent-green-600"
          />
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.title}
          </span>
        </label>
        <div className="text-xs text-gray-400 mt-1">
          Created: {createdAt}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
