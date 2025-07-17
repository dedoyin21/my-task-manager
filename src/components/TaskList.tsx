import React from 'react';
import type { Task } from '../types/task';
import TaskItem from './TaskItems';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  theme: 'light' | 'dark';
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, theme }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-400 italic mt-4">No tasks yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default TaskList;
