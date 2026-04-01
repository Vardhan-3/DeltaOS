import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, User, Filter } from 'lucide-react';
import { getEmployees, addEmployee, deleteEmployee } from '../../data/store';
import type { Employee } from '../../types';

const defaultOnboarding = [
    { id: 'o1', title: 'Complete personal information form', completed: false },
    { id: 'o2', title: 'Sign employment contract', completed: false },
    { id: 'o3', title: 'Set up company email', completed: false },
    { id: 'o4', title: 'Complete IT security training', completed: false },
    { id: 'o5', title: 'Meet with team lead', completed: false },
    { id: 'o6', title: 'Review employee handbook', completed: false },
];

export default function EmployeeList() {
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', department: 'Engineering',
        role: '', salary: '', status: 'active' as Employee['status'],
    });

    const employees = getEmployees();
    const departments = [...new Set(employees.map(e => e.department))];

    const filtered = employees.filter(e => {
        const matchSearch = `${e.firstName} ${e.lastName} ${e.email} ${e.role}`.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === 'all' || e.department === deptFilter;
        const matchStatus = statusFilter === 'all' || e.status === statusFilter;
        return matchSearch && matchDept && matchStatus;
    });

    const handleAdd = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.role) return;
        addEmployee({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            role: formData.role,
            salary: Number(formData.salary) || 0,
            status: formData.status,
            startDate: new Date().toISOString().split('T')[0],
            onboarding: formData.status === 'onboarding' ? defaultOnboarding : [],
        });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', department: 'Engineering', role: '', salary: '', status: 'active' });
        setShowForm(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this employee?')) deleteEmployee(id);
    };

    const statusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: 'bg-green-100 text-green-700',
            inactive: 'bg-surface-100 text-surface-600',
            onboarding: 'bg-blue-100 text-blue-700',
        };
        return <span className={`badge ${styles[status] || ''}`}>{status}</span>;
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-surface-900">Employee Management</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(true)} id="add-employee-btn">
                    <Plus className="w-4 h-4" /> Add Employee
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input className="input pl-10" placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} id="employee-search" />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-surface-400" />
                    <select className="select w-auto" value={deptFilter} onChange={e => setDeptFilter(e.target.value)} id="dept-filter">
                        <option value="all">All Departments</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <select className="select w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} id="status-filter">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="onboarding">Onboarding</option>
                </select>
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(emp => (
                            <tr key={emp.id}>
                                <td>
                                    <Link to={`/employees/${emp.id}`} className="flex items-center gap-3 group">
                                        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                                            {emp.firstName[0]}{emp.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-surface-900 group-hover:text-primary-600 transition-colors">{emp.firstName} {emp.lastName}</p>
                                            <p className="text-xs text-surface-400">{emp.email}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td><span className="badge bg-surface-100 text-surface-600">{emp.department}</span></td>
                                <td className="text-surface-700">{emp.role}</td>
                                <td>{statusBadge(emp.status)}</td>
                                <td className="text-surface-500 text-sm">{emp.startDate}</td>
                                <td>
                                    <div className="flex gap-1">
                                        <Link to={`/employees/${emp.id}`} className="btn btn-secondary btn-sm"><User className="w-3.5 h-3.5" /></Link>
                                        <Link to={`/employees/${emp.id}/edit`} className="btn btn-secondary btn-sm"><Edit2 className="w-3.5 h-3.5" /></Link>
                                        <button onClick={() => handleDelete(emp.id)} className="btn btn-secondary btn-sm text-danger hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="py-12 text-center text-surface-400">No employees found matching your criteria.</div>
                )}
            </div>

            {/* Add Employee Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content p-6" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-surface-900 mb-4">Add New Employee</h3>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <input className="input" placeholder="First Name *" value={formData.firstName} onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))} id="emp-first-name" />
                                <input className="input" placeholder="Last Name *" value={formData.lastName} onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))} id="emp-last-name" />
                            </div>
                            <input className="input" placeholder="Email *" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} id="emp-email" />
                            <input className="input" placeholder="Phone" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} id="emp-phone" />
                            <div className="grid grid-cols-2 gap-3">
                                <select className="select" value={formData.department} onChange={e => setFormData(p => ({ ...p, department: e.target.value }))} id="emp-department">
                                    {['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Product'].map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                <input className="input" placeholder="Role *" value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} id="emp-role" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input className="input" placeholder="Annual Salary" type="number" value={formData.salary} onChange={e => setFormData(p => ({ ...p, salary: e.target.value }))} id="emp-salary" />
                                <select className="select" value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value as Employee['status'] }))} id="emp-status">
                                    <option value="active">Active</option>
                                    <option value="onboarding">Onboarding</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd} id="save-employee-btn">Save Employee</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
