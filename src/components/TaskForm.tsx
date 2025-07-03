import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1 rounded"
      />
      <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
