import React, { useState } from 'react';
import type { Task } from './types/task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 text-center leading-relaxed"> 
      <h1 className="text-2xl font-bold mb-1 md:text-4xl">My Task Manager</h1>
      <h3 className="text-base md:text-3xl text-gray-700">Hey pretty, what are we doing today?</h3>
      <p className="text-sm italic text-green-600 mt-2">One task at a time. One win at a time.</p>
      <p className="text-sm text-gray-500 mt-2 mb-4">{today} </p>

      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
