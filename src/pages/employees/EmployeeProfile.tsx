import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building2, Calendar, DollarSign, CheckCircle2, Circle } from 'lucide-react';
import { getEmployee, updateEmployee, getTasks } from '../../data/store';

export default function EmployeeProfile() {
    const { id } = useParams<{ id: string }>();
    const employee = getEmployee(id || '');
    const tasks = getTasks().filter(t => t.assigneeId === id);

    if (!employee) {
        return (
            <div className="text-center py-20">
                <p className="text-surface-400 text-lg">Employee not found</p>
                <Link to="/employees" className="btn btn-primary mt-4">Back to list</Link>
            </div>
        );
    }

    const toggleOnboarding = (itemId: string) => {
        const updated = employee.onboarding?.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        updateEmployee(employee.id, { onboarding: updated });
    };

    const completedSteps = employee.onboarding?.filter(o => o.completed).length || 0;
    const totalSteps = employee.onboarding?.length || 0;

    const statusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: 'bg-green-100 text-green-700',
            inactive: 'bg-surface-100 text-surface-600',
            onboarding: 'bg-blue-100 text-blue-700',
        };
        return <span className={`badge text-sm ${styles[status] || ''}`}>{status}</span>;
    };

    const priorityColor = (p: string) => {
        const c: Record<string, string> = { low: 'text-surface-400', medium: 'text-blue-500', high: 'text-amber-500', urgent: 'text-red-500' };
        return c[p] || '';
    };
    const taskStatusBadge = (s: string) => {
        const c: Record<string, string> = { 'todo': 'bg-surface-100 text-surface-600', 'in-progress': 'bg-amber-100 text-amber-700', 'done': 'bg-green-100 text-green-700' };
        return <span className={`badge ${c[s] || ''}`}>{s}</span>;
    };

    return (
        <div className="space-y-6">
            <Link to="/employees" className="inline-flex items-center gap-2 text-surface-500 hover:text-primary-600 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Employees
            </Link>

            {/* Profile Header */}
            <div className="glass-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary-500/20">
                        {employee.firstName[0]}{employee.lastName[0]}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-bold text-surface-900">{employee.firstName} {employee.lastName}</h2>
                            {statusBadge(employee.status)}
                        </div>
                        <p className="text-surface-500">{employee.role}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-surface-600">
                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-surface-400" /> {employee.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-surface-400" /> {employee.phone}</span>
                            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-surface-400" /> {employee.department}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-surface-400" /> Started {employee.startDate}</span>
                            <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-surface-400" /> ${employee.salary.toLocaleString()}/yr</span>
                        </div>
                    </div>
                    <Link to={`/employees/${employee.id}/edit`} className="btn btn-primary">Edit Profile</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Assigned Tasks */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-surface-900 mb-4">Assigned Tasks ({tasks.length})</h3>
                    {tasks.length === 0 ? (
                        <p className="text-surface-400 text-sm">No tasks assigned</p>
                    ) : (
                        <div className="space-y-3">
                            {tasks.map(task => (
                                <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-50 border border-surface-100">
                                    <div className="flex-1">
                                        <p className="font-medium text-surface-800 text-sm">{task.title}</p>
                                        <p className="text-xs text-surface-400 mt-0.5">Due: {task.dueDate}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-semibold ${priorityColor(task.priority)}`}>{task.priority}</span>
                                        {taskStatusBadge(task.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Onboarding Checklist */}
                {employee.onboarding && employee.onboarding.length > 0 && (
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-surface-900 mb-2">Onboarding Checklist</h3>
                        <p className="text-sm text-surface-500 mb-4">{completedSteps} / {totalSteps} completed</p>
                        <div className="w-full bg-surface-200 rounded-full h-2 mb-5">
                            <div className="gradient-success h-2 rounded-full transition-all" style={{ width: `${totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0}%` }} />
                        </div>
                        <div className="space-y-3">
                            {employee.onboarding.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => toggleOnboarding(item.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${item.completed
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-white border-surface-200 hover:border-primary-300'
                                        }`}
                                >
                                    {item.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-surface-300 flex-shrink-0" />
                                    )}
                                    <span className={`text-sm ${item.completed ? 'text-green-700 line-through' : 'text-surface-700'}`}>
                                        {item.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
