import React, { useState, useEffect } from 'react';
import type { Task } from './types/task';
import { useTheme } from './ThemeContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { FaRegMoon } from "react-icons/fa6";
import { PiSunLight } from "react-icons/pi";

const App: React.FC = () => {
  const userName = 'Adedoyin';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const { theme, toggleTheme } = useTheme();

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      category: 'General',
      
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
    <div className={`min-h-screen px-4 py-8 sm:px-6 md:px-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 flex items-center gap-2 px-2 py-1.5 rounded-full shadow-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 z-50
          ${theme === 'dark' ? 'bg-gradient-to-r from-green-900 via-gray-900 to-green-800 border-green-700 text-green-300 hover:from-green-800 hover:to-green-900 focus:ring-green-400' : 'bg-gradient-to-r from-green-100 via-white to-green-200 border-green-400 text-green-700 hover:from-green-200 hover:to-green-100 focus:ring-green-500'}`}
      >
        <span className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300
          ${theme === 'dark' ? 'bg-green-900 text-green-300 shadow-inner' : 'bg-green-200 text-green-700 shadow'}`}>
          {theme === 'light' ? <FaRegMoon size={20} /> : <PiSunLight size={22} />}
        </span>
        <span className="font-semibold text-base select-none transition-colors duration-300">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
        <span className={`ml-2 w-10 h-5 flex items-center bg-gray-300 dark:bg-green-900 rounded-full p-1 transition-colors duration-300 border border-gray-400 dark:border-green-800`}>
          <span className={`bg-white dark:bg-green-400 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-5' : ''}`}></span>
        </span>
      </button>

      {/* Content */}
      <div className={`max-w-6xl mx-auto text-center leading-relaxed transition-colors duration-300
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
          rounded-2xl shadow-lg border border-green-100 dark:border-green-800 p-6 sm:p-10`}
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-gray-800'}`}>
            {getGreeting()}, {userName}! 👋
          </h3>

          <p className={`text-sm sm:text-base italic mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            One task at a time. One win at a time.
          </p>

          <TaskForm onAddTask={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>

    </div>
  );
};

export default App;
