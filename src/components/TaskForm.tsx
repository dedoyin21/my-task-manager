import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 mb-8 flex flex-col sm:flex-row gap-3 sm:items-center">
      <input
        type="text"
        placeholder="Enter a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-green-300 dark:border-green-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-3 rounded-lg w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-300 shadow-md w-full sm:w-auto"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
