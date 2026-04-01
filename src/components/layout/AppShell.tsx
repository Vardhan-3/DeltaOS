import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { useStoreRefresh } from '../../hooks/useStoreRefresh';

export default function AppShell() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    useStoreRefresh();

    return (
        <div className="min-h-screen bg-surface-50">
            <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
            <main
                className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
                    }`}
            >
                <div className="p-6 max-w-[1400px] mx-auto">
                    <TopHeader />
                    <div className="animate-fade-in">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
