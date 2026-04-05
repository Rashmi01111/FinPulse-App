/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LayoutDashboard, ReceiptText, TrendingUp, Target, Moon, Sun, Settings as SettingsIcon, Bell, Lock, Download, LogOut } from 'lucide-react';
import { FinanceProvider } from './context/FinanceContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import GoalTracker from './components/GoalTracker';
import Insights from './components/Insights';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import LockScreen from './components/LockScreen';
import Login from './components/Login';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { user, logout, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if user is not authenticated
  if (!user) {
    return <Login />;
  }

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'goal', label: 'Goal', icon: Target },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'transactions': return <TransactionList />;
      case 'insights': return <Insights />;
      case 'goal': return <GoalTracker />;
      default: return <p className="text-gray-400">Content for {activeTab} coming soon.</p>;
    }
  };

  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="bg-gray-950 dark:bg-gray-950 shadow-md p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight truncate">Finance Companion</h1>
          <span className="text-blue-400 text-sm font-medium hidden sm:inline">Welcome, {user.name}</span>
        </div>
        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <button onClick={() => setShowNotifications(true)} className="p-2 rounded-full hover:bg-gray-800 transition-colors"><Bell size={18} className="sm:size-5" /></button>
            <button onClick={() => setIsLocked(true)} className="p-2 rounded-full hover:bg-gray-800 transition-colors"><Lock size={18} className="sm:size-5" /></button>
            <button onClick={() => setShowSettings(true)} className="p-2 rounded-full hover:bg-gray-800 transition-colors"><SettingsIcon size={18} className="sm:size-5" /></button>
            <button onClick={logout} className="p-2 rounded-full hover:bg-red-600 transition-colors" title="Logout"><LogOut size={18} className="sm:size-5" /></button>
        </div>
      </header>
      
      <main className="flex-grow p-3 sm:p-4 md:p-6 overflow-y-auto pb-20 md:pb-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 tracking-tighter capitalize">{navItems.find(i => i.id === activeTab)?.label}</h1>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="hidden md:flex bg-gray-950 border-t border-gray-800 justify-around p-4 sticky bottom-0 z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 transition-all duration-200 gap-1 ${activeTab === item.id ? 'text-blue-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Icon size={24} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-gray-950 border-t border-gray-800 flex justify-around p-2 sticky bottom-0 z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 transition-all duration-200 ${activeTab === item.id ? 'text-blue-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-semibold mt-0.5 text-center">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <AppContent />
      </FinanceProvider>
    </AuthProvider>
  );
}
