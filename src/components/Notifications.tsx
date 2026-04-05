import { X } from 'lucide-react';

export default function Notifications({ onClose }: { onClose: () => void }) {
  const notifications = [
    { id: 1, title: 'Savings Goal', message: 'You are 50% towards your monthly goal!' },
    { id: 2, title: 'Spending Alert', message: 'You have spent 80% of your budget.' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-800 w-full max-w-sm space-y-4 sm:space-y-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center sticky top-0 bg-gray-900 pb-2">
          <h2 className="text-lg sm:text-xl font-bold">Notifications</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded transition-colors" title="Close"><X size={20} className="sm:size-6" /></button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {notifications.map(n => (
            <div key={n.id} className="bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <p className="font-bold text-sm sm:text-base">{n.title}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
