import { Users, Briefcase, TicketCheck, DollarSign, Bell, Search } from 'lucide-react';
import { getEmployees, getJobPostings, getTickets, getPayroll } from '../../data/store';

export default function TopHeader() {
    const employees = getEmployees();
    const activeEmps = employees.filter(e => e.status === 'active').length;
    const openPositions = getJobPostings().filter(j => j.status === 'open').length;
    const openTickets = getTickets().filter(t => t.status === 'open' || t.status === 'in-progress').length;
    const monthlyPayroll = getPayroll().reduce((sum, p) => sum + p.netPay, 0);

    const kpis = [
        { label: 'Active Employees', value: activeEmps, icon: Users, gradient: 'gradient-primary' },
        { label: 'Open Positions', value: openPositions, icon: Briefcase, gradient: 'gradient-info' },
        { label: 'Pending Tickets', value: openTickets, icon: TicketCheck, gradient: 'gradient-warning' },
        { label: 'Monthly Payroll', value: `$${(monthlyPayroll / 1000).toFixed(0)}K`, icon: DollarSign, gradient: 'gradient-success' },
    ];

    return (
        <header className="mb-6">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-2xl font-bold text-surface-900">Welcome back 👋</h2>
                    <p className="text-surface-500 text-sm mt-0.5">Here's what's happening with your team today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input pl-10 w-56"
                            id="global-search"
                        />
                    </div>
                    <button className="relative p-2.5 rounded-xl bg-white border border-surface-200 hover:bg-surface-50 transition-all" id="notifications-btn">
                        <Bell className="w-5 h-5 text-surface-600" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger text-white text-[0.65rem] font-bold flex items-center justify-center">3</span>
                    </button>
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-lg hover:shadow-primary-500/30 transition-all" id="user-avatar">
                        AV
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                {kpis.map((kpi) => (
                    <div key={kpi.label} className={`kpi-card ${kpi.gradient}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{kpi.label}</p>
                                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                                <kpi.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </header>
    );
}
