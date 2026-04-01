import { useState } from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getTasks, addTask, updateTask, getEmployees } from '../../data/store';
import type { Task } from '../../types';

const PRIORITY_COLORS: Record<string, string> = {
    low: '#94a3b8',
    medium: '#3b82f6',
    high: '#f59e0b',
    urgent: '#ef4444',
};

export default function TaskBoard() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', assigneeId: '', priority: 'medium' as Task['priority'], dueDate: '',
    });

    const tasks = getTasks();
    const employees = getEmployees().filter(e => e.status === 'active');

    const getEmpName = (id: string) => {
        const emp = employees.find(e => e.id === id);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unassigned';
    };

    // Workload data: tasks per employee
    const workloadMap = tasks.reduce<Record<string, number>>((acc, t) => {
        const name = getEmpName(t.assigneeId);
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});
    const workloadData = Object.entries(workloadMap)
        .map(([name, count]) => ({ name: name.split(' ')[0], tasks: count }))
        .sort((a, b) => b.tasks - a.tasks)
        .slice(0, 10);

    const handleAdd = () => {
        if (!formData.title || !formData.assigneeId || !formData.dueDate) return;
        addTask({
            title: formData.title,
            description: formData.description,
            assigneeId: formData.assigneeId,
            priority: formData.priority,
            status: 'todo',
            dueDate: formData.dueDate,
            createdDate: new Date().toISOString().split('T')[0],
        });
        setFormData({ title: '', description: '', assigneeId: '', priority: 'medium', dueDate: '' });
        setShowForm(false);
    };

    const cycleStatus = (taskId: string, current: Task['status']) => {
        const next: Record<string, Task['status']> = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };
        updateTask(taskId, { status: next[current] });
    };

    const statusIcon = (s: string) => {
        if (s === 'done') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        if (s === 'in-progress') return <Clock className="w-5 h-5 text-amber-500" />;
        return <AlertCircle className="w-5 h-5 text-surface-400" />;
    };

    const columns = [
        { id: 'todo' as const, label: 'To Do', color: 'border-surface-300' },
        { id: 'in-progress' as const, label: 'In Progress', color: 'border-amber-400' },
        { id: 'done' as const, label: 'Done', color: 'border-green-400' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-surface-900">Workload & Task Management</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(true)} id="add-task-btn">
                    <Plus className="w-4 h-4" /> New Task
                </button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map(col => (
                    <div key={col.id} className={`bg-surface-50 rounded-2xl p-4 border-t-4 ${col.color}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-surface-700 text-sm">{col.label}</h3>
                            <span className="badge bg-surface-200 text-surface-600">{tasks.filter(t => t.status === col.id).length}</span>
                        </div>
                        <div className="space-y-3">
                            {tasks.filter(t => t.status === col.id).map(task => (
                                <div
                                    key={task.id}
                                    className="glass-card p-4 cursor-pointer"
                                    onClick={() => cycleStatus(task.id, task.status)}
                                >
                                    <div className="flex items-start gap-2 mb-2">
                                        {statusIcon(task.status)}
                                        <h4 className="font-medium text-surface-900 text-sm flex-1">{task.title}</h4>
                                    </div>
                                    {task.description && (
                                        <p className="text-xs text-surface-500 mb-3 line-clamp-2 ml-7">{task.description}</p>
                                    )}
                                    <div className="flex items-center justify-between ml-7">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-[0.6rem] font-bold">
                                                {getEmpName(task.assigneeId).split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-xs text-surface-400">{getEmpName(task.assigneeId).split(' ')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ background: PRIORITY_COLORS[task.priority] }} />
                                            <span className="text-[0.65rem] text-surface-400">{task.dueDate}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tasks.filter(t => t.status === col.id).length === 0 && (
                                <p className="text-center text-surface-300 text-sm py-6">No tasks</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Workload Visualization */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-surface-900 mb-4">Workload Distribution</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={workloadData} barSize={32}>
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="tasks" radius={[8, 8, 0, 0]} name="Tasks">
                            {workloadData.map((_, i) => (
                                <Cell key={i} fill={['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'][i % 4]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Add Task Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content p-6" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-surface-900 mb-4">New Task</h3>
                        <div className="space-y-3">
                            <input className="input" placeholder="Task Title *" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} id="task-title" />
                            <textarea className="textarea" placeholder="Description" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} id="task-description" />
                            <select className="select" value={formData.assigneeId} onChange={e => setFormData(p => ({ ...p, assigneeId: e.target.value }))} id="task-assignee">
                                <option value="">Assign to employee *</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} — {emp.role}</option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-3">
                                <select className="select" value={formData.priority} onChange={e => setFormData(p => ({ ...p, priority: e.target.value as Task['priority'] }))} id="task-priority">
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <input className="input" type="date" value={formData.dueDate} onChange={e => setFormData(p => ({ ...p, dueDate: e.target.value }))} id="task-due-date" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd} id="save-task-btn">Create Task</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
