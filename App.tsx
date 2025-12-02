import React, { useState } from 'react';
import { MpcPlayer } from './components/MpcPlayer';
import { LayoutGrid, Music, Settings, Disc3, LogOut, Cpu, Activity } from 'lucide-react';

type Tab = 'dashboard' | 'mpc' | 'studio' | 'library' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('mpc');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'studio', label: 'Neural Synth', icon: Cpu },
    { id: 'mpc', label: 'MPC-8', icon: Disc3 },
    { id: 'library', label: 'Sample Library', icon: Music },
    { id: 'settings', label: 'System Config', icon: Settings },
  ];

  const activeItem = navItems.find(item => item.id === activeTab);
  const ActiveIcon = activeItem?.icon;

  return (
    <div className="flex h-screen w-screen bg-mpc-bg text-white overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-mpc-panel border-r-2 border-mpc-border flex flex-col shadow-panel z-50">
        {/* Branding */}
        <div className="h-20 flex items-center px-6 border-b-2 border-mpc-border bg-mpc-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          <Activity className="text-mpc-primary mr-3 animate-pulse" size={24} />
          <h1 className="font-black text-xl italic tracking-wider">
            AUDIO<span className="text-mpc-primary">MANCER</span>.AI
          </h1>
        </div>

        {/* User Profile Stub */}
        <div className="p-6 border-b-2 border-mpc-border">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-mpc-primary to-mpc-secondary flex items-center justify-center font-bold text-black border-2 border-white shadow-glow">
                 A
              </div>
              <div>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operator</div>
                 <div className="text-sm font-bold text-white">ADMIN_USER</div>
              </div>
           </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
           {navItems.map((item) => (
             <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 border-l-4
                  ${activeTab === item.id 
                    ? 'bg-mpc-surfaceHighlight border-mpc-primary text-white shadow-[inset_0_0_10px_rgba(0,243,255,0.1)]' 
                    : 'border-transparent text-gray-500 hover:text-white hover:bg-mpc-surfaceHighlight/50'}
                `}
             >
                <item.icon size={18} className={activeTab === item.id ? 'text-mpc-primary' : ''} />
                <span className="text-sm font-bold tracking-wide uppercase">{item.label}</span>
             </button>
           ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-mpc-border bg-mpc-screen">
           <button className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-mpc-danger transition-colors w-full uppercase tracking-wider">
              <LogOut size={14} /> Disconnect Session
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mpc-surface via-mpc-bg to-black">
        
        {/* Header */}
        <header className="h-16 border-b-2 border-mpc-border bg-mpc-panel/50 backdrop-blur-md flex items-center justify-between px-8 z-40">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-mpc-success rounded-full shadow-neon-green"></div>
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                 System Status: <span className="text-mpc-success">ONLINE</span>
              </span>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-gray-500 uppercase">Latency: 12ms</div>
              <div className="w-[1px] h-4 bg-mpc-border"></div>
              <div className="text-xs font-mono text-gray-500 uppercase">CPU: 14%</div>
           </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
           {activeTab === 'mpc' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <MpcPlayer />
             </div>
           )}

           {activeTab !== 'mpc' && ActiveIcon && (
             <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <ActiveIcon size={64} className="text-mpc-border mb-4" />
                <h2 className="text-2xl font-black uppercase tracking-widest text-gray-600">Module Locked</h2>
                <p className="font-mono text-xs text-gray-500 mt-2">Please upgrade your Audiomancer plan to access this feature.</p>
             </div>
           )}
        </div>
      </main>
    </div>
  );
}