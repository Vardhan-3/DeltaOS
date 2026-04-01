import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    DollarSign,
    ClipboardList,
    TicketCheck,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from 'lucide-react';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/recruitment', icon: Briefcase, label: 'Recruitment' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
    { to: '/tasks', icon: ClipboardList, label: 'Tasks' },
    { to: '/tickets', icon: TicketCheck, label: 'Tickets' },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const location = useLocation();

    return (
        <aside
            className={`gradient-sidebar fixed top-0 left-0 h-screen z-40 transition-all duration-300 flex flex-col ${collapsed ? 'w-[72px]' : 'w-[260px]'
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <div className="animate-slide-in">
                        <h1 className="text-white font-bold text-lg leading-tight">HR Nexus</h1>
                        <p className="text-primary-300 text-[0.65rem] font-medium tracking-wider uppercase">AI-Powered</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive =
                        item.to === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(item.to);
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary-600/30 text-white shadow-lg shadow-primary-900/20'
                                    : 'text-surface-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon
                                className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-primary-300' : 'text-surface-500 group-hover:text-primary-400'
                                    }`}
                            />
                            {!collapsed && (
                                <span className="font-medium text-sm animate-slide-in">{item.label}</span>
                            )}
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 animate-scale-in" />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Collapse toggle */}
            <button
                onClick={onToggle}
                className="mx-3 mb-4 p-2.5 rounded-xl text-surface-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </aside>
    );
}
