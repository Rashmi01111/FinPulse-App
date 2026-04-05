import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');

  const handleUnlock = () => {
    if (pin === '1234') { // Simple PIN for demo
      onUnlock();
    } else {
      alert('Incorrect PIN (Try 1234)');
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-800 w-full max-w-sm space-y-4 sm:space-y-6 text-center">
        <Lock size={40} className="sm:size-12 mx-auto text-blue-400" />
        <h2 className="text-xl sm:text-2xl font-bold">App Locked</h2>
        <input 
          type="password" 
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          placeholder="Enter PIN (1234)" 
          className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-center text-lg sm:text-xl tracking-widest text-sm"
          maxLength={4}
        />
        <button onClick={handleUnlock} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-bold transition-colors text-sm sm:text-base">Unlock</button>
      </div>
    </div>
  );
}
