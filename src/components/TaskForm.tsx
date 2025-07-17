import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
  theme: 'light' | 'dark'; // manually passed theme
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, theme }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle('');
  };

  // Dynamically generated class names based on theme
  const inputClass = `
    border p-3 rounded-full w-full sm:flex-1 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500
    ${theme === 'dark' 
      ? 'bg-gray-900 text-green-100 border-teal-400 placeholder-white' 
      : 'bg-white text-black border-[#FBD85D] placeholder-gray-500'}
  `;

  const buttonClass = `
    font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md w-full sm:w-auto
    ${theme === 'dark' 
      ? 'bg-teal-400 hover:bg-green-900 text-green-100' 
      : 'bg-[#FBD85D] hover:brightness-95 text-[#1E1E24]'}
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 mb-8 flex flex-col sm:flex-row gap-3 sm:items-center"
    >
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
      />
      <button type="submit" className={buttonClass}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
