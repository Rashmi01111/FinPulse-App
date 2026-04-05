import { useFinance } from '../context/FinanceContext';
import { X, Download, User } from 'lucide-react';

export default function Settings({ onClose }: { onClose: () => void }) {
  const { currency, setCurrency, profile, setProfile } = useFinance();

  const exportData = () => {
    const data = localStorage.getItem('finance_data');
    const blob = new Blob([data || ''], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance_data.json';
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-800 w-full max-w-sm space-y-4 sm:space-y-6 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center sticky top-0 bg-gray-900 pb-2">
          <h2 className="text-lg sm:text-xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded transition-colors" title="Close"><X size={20} className="sm:size-6" /></button>
        </div>
        
        <div className='space-y-3 sm:space-y-4'>
            <div className='flex items-center gap-2 text-blue-400'>
                <User size={18} className="sm:size-5 flex-shrink-0" />
                <h3 className='font-bold text-sm sm:text-base'>Profile</h3>
            </div>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} placeholder="Name" className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm" />
            <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="Email" className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm" />
        </div>

        <div className='space-y-2'>
            <label className='text-xs sm:text-sm text-gray-400'>Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm">
                <option value="₹">Rupee (₹)</option>
                <option value="$">Dollar ($)</option>
                <option value="€">Euro (€)</option>
            </select>
        </div>
        <button onClick={exportData} className="w-full bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg sm:rounded-xl font-bold flex justify-center items-center gap-2 transition-colors text-sm sm:text-base">
          <Download size={18} className="sm:size-5" /> Export Data
        </button>
      </div>
    </div>
  );
}
