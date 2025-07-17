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

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userEmail) return;
      const fetched = await getTasksForUser(userEmail);
      setTasks(fetched);
    };
    fetchTasks();
  }, [userEmail]);

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
    <div
      className={`min-h-screen px-4 py-8 sm:px-6 md:px-10 font-inter transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-[#FFF8F0] to-white text-[#1E1E24]'
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full z-50 shadow-md transition
          ${theme === 'dark'
            ? 'bg-teal-700 text-white'
            : 'bg-[#FBD85D] text-[#1E1E24]'}`}
      >
        <span>{theme === 'light' ? <FaRegMoon size={20} /> : <PiSunLight size={22} />}</span>
        <span className="text-sm font-medium">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>

      {/* Main Content Card */}
      <div
        className={`max-w-6xl mx-auto text-center rounded-3xl shadow-xl border p-6 sm:p-10 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-teal-800'
            : 'bg-white border-none shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)]'
        }`}
      >
        <h3
          className={`text-2xl sm:text-3xl font-semibold mb-2 ${
            theme === 'dark' ? 'text-teal-400' : 'text-[#1E1E24]'
          }`}
        >
          {getGreeting()}, <strong>{userName}</strong>! 👋
        </h3>
        <p
          className={`italic mb-6 text-sm ${
            theme === 'dark' ? 'text-teal-400' : 'text-gray-500'
          }`}
        >
          One task at a time. One win at a time.
        </p>

      
        <TaskForm onAddTask={addTask} theme={theme} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask}theme={theme} />
      </div>

      {/* Logout Button - Bottom Right */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="px-5 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
