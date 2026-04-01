import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getEmployee, updateEmployee } from '../../data/store';
import type { Employee } from '../../types';

export default function EmployeeForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        department: 'Engineering', role: '', salary: '',
        status: 'active' as Employee['status'],
    });

    useEffect(() => {
        if (id) {
            const emp = getEmployee(id);
            if (emp) {
                setFormData({
                    firstName: emp.firstName, lastName: emp.lastName,
                    email: emp.email, phone: emp.phone,
                    department: emp.department, role: emp.role,
                    salary: emp.salary.toString(), status: emp.status,
                });
            }
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        updateEmployee(id, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            role: formData.role,
            salary: Number(formData.salary) || 0,
            status: formData.status,
        });
        navigate(`/employees/${id}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link to={id ? `/employees/${id}` : '/employees'} className="inline-flex items-center gap-2 text-surface-500 hover:text-primary-600 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-surface-900 mb-6">Edit Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-surface-600 mb-1 block">First Name</label>
                            <input className="input" value={formData.firstName} onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))} required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-surface-600 mb-1 block">Last Name</label>
                            <input className="input" value={formData.lastName} onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))} required />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-surface-600 mb-1 block">Email</label>
                        <input className="input" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-surface-600 mb-1 block">Phone</label>
                        <input className="input" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-surface-600 mb-1 block">Department</label>
                            <select className="select" value={formData.department} onChange={e => setFormData(p => ({ ...p, department: e.target.value }))}>
                                {['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Product'].map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-surface-600 mb-1 block">Role</label>
                            <input className="input" value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-surface-600 mb-1 block">Annual Salary</label>
                            <input className="input" type="number" value={formData.salary} onChange={e => setFormData(p => ({ ...p, salary: e.target.value }))} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-surface-600 mb-1 block">Status</label>
                            <select className="select" value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value as Employee['status'] }))}>
                                <option value="active">Active</option>
                                <option value="onboarding">Onboarding</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Link to={id ? `/employees/${id}` : '/employees'} className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
