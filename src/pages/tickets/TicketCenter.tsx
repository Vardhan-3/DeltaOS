import { useState } from 'react';
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { getTickets, addTicket, updateTicket, getEmployees } from '../../data/store';
import type { Ticket } from '../../types';

export default function TicketCenter() {
    const [showForm, setShowForm] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [formData, setFormData] = useState({
        title: '', description: '', submittedBy: '',
        category: 'other' as Ticket['category'],
        priority: 'medium' as Ticket['priority'],
    });

    const tickets = getTickets();
    const employees = getEmployees();

    const getEmpName = (id: string) => {
        const emp = employees.find(e => e.id === id);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
    };

    const filtered = statusFilter === 'all' ? tickets : tickets.filter(t => t.status === statusFilter);

    const handleAdd = () => {
        if (!formData.title || !formData.description || !formData.submittedBy) return;
        addTicket({
            title: formData.title,
            description: formData.description,
            submittedBy: formData.submittedBy,
            category: formData.category,
            priority: formData.priority,
            status: 'open',
            createdDate: new Date().toISOString().split('T')[0],
        });
        setFormData({ title: '', description: '', submittedBy: '', category: 'other', priority: 'medium' });
        setShowForm(false);
    };

    const resolveTicket = (id: string) => {
        updateTicket(id, { status: 'resolved', resolvedDate: new Date().toISOString().split('T')[0] });
    };

    const statusIcon = (status: string) => {
        const icons: Record<string, React.ReactNode> = {
            'open': <AlertCircle className="w-4 h-4 text-blue-500" />,
            'in-progress': <Clock className="w-4 h-4 text-amber-500" />,
            'resolved': <CheckCircle className="w-4 h-4 text-green-500" />,
            'closed': <CheckCircle className="w-4 h-4 text-surface-400" />,
        };
        return icons[status] || null;
    };

    const statusBadge = (status: string) => {
        const s: Record<string, string> = {
            'open': 'bg-blue-100 text-blue-700',
            'in-progress': 'bg-amber-100 text-amber-700',
            'resolved': 'bg-green-100 text-green-700',
            'closed': 'bg-surface-100 text-surface-600',
        };
        return <span className={`badge ${s[status] || ''}`}>{status}</span>;
    };

    const priorityDot = (p: string) => {
        const c: Record<string, string> = { low: 'bg-surface-300', medium: 'bg-blue-400', high: 'bg-red-500' };
        return <span className={`w-2 h-2 rounded-full inline-block ${c[p] || ''}`} />;
    };

    const categoryBadge = (cat: string) => {
        const s: Record<string, string> = {
            leave: 'bg-purple-100 text-purple-700',
            payroll: 'bg-green-100 text-green-700',
            benefits: 'bg-blue-100 text-blue-700',
            workplace: 'bg-amber-100 text-amber-700',
            other: 'bg-surface-100 text-surface-600',
        };
        return <span className={`badge ${s[cat] || ''}`}>{cat}</span>;
    };

    const statusCounts = {
        open: tickets.filter(t => t.status === 'open').length,
        'in-progress': tickets.filter(t => t.status === 'in-progress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length,
        closed: tickets.filter(t => t.status === 'closed').length,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-surface-900">Ticket & Issue Management</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(true)} id="submit-ticket-btn">
                    <Plus className="w-4 h-4" /> Submit Ticket
                </button>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
                {Object.entries(statusCounts).map(([status, count]) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                        className={`glass-card p-4 text-center transition-all ${statusFilter === status ? 'ring-2 ring-primary-400' : ''}`}
                    >
                        <div className="flex items-center justify-center gap-2 mb-1">
                            {statusIcon(status)}
                            <span className="text-sm font-medium text-surface-600 capitalize">{status}</span>
                        </div>
                        <p className="text-2xl font-bold text-surface-900">{count}</p>
                    </button>
                ))}
            </div>

            {/* Tickets List */}
            <div className="space-y-3">
                {filtered.map(ticket => (
                    <div key={ticket.id} className="glass-card p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="mt-1">
                                    <MessageSquare className="w-5 h-5 text-surface-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h4 className="font-medium text-surface-900">{ticket.title}</h4>
                                        {categoryBadge(ticket.category)}
                                        <div className="flex items-center gap-1">
                                            {priorityDot(ticket.priority)}
                                            <span className="text-xs text-surface-400">{ticket.priority}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-surface-600 mb-2">{ticket.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-surface-400">
                                        <span>Submitted by <strong className="text-surface-600">{getEmpName(ticket.submittedBy)}</strong></span>
                                        <span>{ticket.createdDate}</span>
                                        {ticket.resolvedDate && <span className="text-green-600">Resolved: {ticket.resolvedDate}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {statusBadge(ticket.status)}
                                {(ticket.status === 'open' || ticket.status === 'in-progress') && (
                                    <button className="btn btn-sm btn-secondary" onClick={() => resolveTicket(ticket.id)}>
                                        <CheckCircle className="w-3.5 h-3.5" /> Resolve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-surface-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-surface-300" />
                        <p>No tickets matching the selected filter.</p>
                    </div>
                )}
            </div>

            {/* Submit Ticket Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content p-6" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-surface-900 mb-4">Submit HR Ticket</h3>
                        <div className="space-y-3">
                            <input className="input" placeholder="Ticket Title *" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} id="ticket-title" />
                            <textarea className="textarea" placeholder="Describe your issue or request *" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} id="ticket-description" />
                            <select className="select" value={formData.submittedBy} onChange={e => setFormData(p => ({ ...p, submittedBy: e.target.value }))} id="ticket-submitted-by">
                                <option value="">Select Employee *</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 gap-3">
                                <select className="select" value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value as Ticket['category'] }))} id="ticket-category">
                                    <option value="leave">Leave</option>
                                    <option value="payroll">Payroll</option>
                                    <option value="benefits">Benefits</option>
                                    <option value="workplace">Workplace</option>
                                    <option value="other">Other</option>
                                </select>
                                <select className="select" value={formData.priority} onChange={e => setFormData(p => ({ ...p, priority: e.target.value as Ticket['priority'] }))} id="ticket-priority">
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd} id="save-ticket-btn">Submit Ticket</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
