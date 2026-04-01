import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Brain, Sparkles, Activity, UserCheck } from 'lucide-react';
import { getEmployees, getTasks, getTickets } from '../data/store';

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
    const employees = getEmployees();
    const tasks = getTasks();
    const tickets = getTickets();

    // Department distribution
    const deptMap = employees.reduce<Record<string, number>>((acc, e) => {
        acc[e.department] = (acc[e.department] || 0) + 1;
        return acc;
    }, {});
    const deptData = Object.entries(deptMap).map(([name, value]) => ({ name, value }));

    // Task status distribution
    const taskStatusData = [
        { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
        { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
        { name: 'Done', value: tasks.filter(t => t.status === 'done').length },
    ];

    // Status counts
    const activeCount = employees.filter(e => e.status === 'active').length;
    const onboardingCount = employees.filter(e => e.status === 'onboarding').length;
    const openTickets = tickets.filter(t => t.status === 'open').length;

    // Recent activity feed
    const recentActivity = [
        { icon: UserCheck, text: 'Nina Foster started onboarding', time: '2 hours ago', color: 'text-success' },
        { icon: Activity, text: 'Payroll for January processed', time: '5 hours ago', color: 'text-info' },
        { icon: AlertTriangle, text: 'High priority ticket submitted', time: '1 day ago', color: 'text-warning' },
        { icon: TrendingUp, text: 'Q1 Marketing plan completed', time: '2 days ago', color: 'text-primary-500' },
    ];

    // AI Insights data
    const aiInsights = [
        { icon: AlertTriangle, title: 'Attrition Risk', description: '2 employees in Engineering show signs of disengagement based on task completion patterns.', severity: 'warning' },
        { icon: TrendingUp, title: 'Performance Trend', description: 'Design team productivity increased 18% this quarter. Consider recognizing top performers.', severity: 'success' },
        { icon: Brain, title: 'Hiring Recommendation', description: 'Based on workload analysis, Engineering needs 2 more developers to maintain delivery velocity.', severity: 'info' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
                <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-500">Active / Total</p>
                            <p className="text-xl font-bold text-surface-900">{activeCount} / {employees.length}</p>
                        </div>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                        <div className="gradient-primary h-2 rounded-full transition-all" style={{ width: `${(activeCount / employees.length) * 100}%` }} />
                    </div>
                </div>
                <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-500">Onboarding</p>
                            <p className="text-xl font-bold text-surface-900">{onboardingCount} employees</p>
                        </div>
                    </div>
                    <p className="text-xs text-surface-400">In progress right now</p>
                </div>
                <div className="glass-card p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-500">Open Tickets</p>
                            <p className="text-xl font-bold text-surface-900">{openTickets}</p>
                        </div>
                    </div>
                    <p className="text-xs text-surface-400">Awaiting resolution</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Distribution */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-surface-900 mb-4">Department Distribution</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" strokeWidth={0}>
                                {deptData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 mt-2 justify-center">
                        {deptData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-1.5 text-xs text-surface-600">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                                {d.name} ({d.value})
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task Status */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-surface-900 mb-4">Task Overview</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={taskStatusData} barSize={40}>
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {taskStatusData.map((_, i) => (
                                    <Cell key={i} fill={['#6366f1', '#f59e0b', '#10b981'][i]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Insights + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Insights */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-surface-900">AI-Driven Insights</h3>
                        <span className="badge bg-primary-100 text-primary-700 ml-2">Powered by Gemini</span>
                    </div>
                    <div className="space-y-4 stagger-children">
                        {aiInsights.map((insight, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-xl border-l-4 ${insight.severity === 'warning'
                                        ? 'bg-amber-50 border-amber-400'
                                        : insight.severity === 'success'
                                            ? 'bg-green-50 border-green-400'
                                            : 'bg-blue-50 border-blue-400'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <insight.icon
                                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${insight.severity === 'warning'
                                                ? 'text-amber-500'
                                                : insight.severity === 'success'
                                                    ? 'text-green-500'
                                                    : 'text-blue-500'
                                            }`}
                                    />
                                    <div>
                                        <h4 className="font-semibold text-surface-900 text-sm">{insight.title}</h4>
                                        <p className="text-surface-600 text-sm mt-0.5">{insight.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-surface-900 mb-5">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center flex-shrink-0`}>
                                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-surface-800">{activity.text}</p>
                                    <p className="text-xs text-surface-400 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
