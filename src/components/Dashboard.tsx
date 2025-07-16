import React, { useState, useEffect } from 'react';
import type { Task } from '../types/task';
import { useTheme } from '../ThemeContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { FaRegMoon } from 'react-icons/fa6';
import { PiSunLight } from 'react-icons/pi';
import { getTasksForUser, saveTask } from './utils/sheetdb';

const Dashboard: React.FC = () => {
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // ✅ Load tasks from SheetDB
  useEffect(() => {
    const fetchTasks = async () => {
      if (!userEmail) return;
      const fetched = await getTasksForUser(userEmail);
      setTasks(fetched);
    };
    fetchTasks();
  }, [userEmail]);

  // ✅ Add and save task
  const addTask = async (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      category: 'General',
      userEmail,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    await saveTask(newTask);
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
    <div className={`min-h-screen px-4 py-8 sm:px-6 md:px-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Toggle Theme Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 flex items-center gap-2 px-2 py-1.5 rounded-full shadow-lg border-2 transition-all duration-300 z-50
        ${theme === 'dark'
          ? 'bg-gradient-to-r from-green-900 via-gray-900 to-green-800 border-green-700 text-green-300'
          : 'bg-gradient-to-r from-green-100 via-white to-green-200 border-green-400 text-green-700'}`}
      >
        <span className={`w-7 h-7 rounded-full flex items-center justify-center
          ${theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-200 text-green-700'}`}>
          {theme === 'light' ? <FaRegMoon size={20} /> : <PiSunLight size={22} />}
        </span>
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </button>

      {/* Main Content */}
      <div className={`max-w-6xl mx-auto text-center rounded-2xl shadow-lg border p-6 sm:p-10
        ${theme === 'dark' ? 'bg-gray-900 border-green-800' : 'bg-white border-green-100'}`}>
        <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-gray-800'}`}>
          {getGreeting()}, <strong>{userName}</strong>! 👋
        </h3>
        <p className={`italic mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
          One task at a time. One win at a time.
        </p>

        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="mt-4 px-3 py-2 text-sm bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
