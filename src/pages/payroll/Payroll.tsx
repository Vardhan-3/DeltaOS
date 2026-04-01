import { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Brain, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getPayroll, getEmployees, updatePayrollRecord } from '../../data/store';

export default function Payroll() {
    const [activeTab, setActiveTab] = useState<'summary' | 'process' | 'predictive'>('summary');
    const payroll = getPayroll();
    const employees = getEmployees();

    const getEmpName = (id: string) => {
        const emp = employees.find(e => e.id === id);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
    };

    const totalNet = payroll.reduce((s, p) => s + p.netPay, 0);
    const totalBonus = payroll.reduce((s, p) => s + p.bonus, 0);
    const totalDeductions = payroll.reduce((s, p) => s + p.deductions, 0);
    const pendingCount = payroll.filter(p => p.status === 'pending').length;

    const statusBadge = (status: string) => {
        const s: Record<string, string> = { pending: 'bg-amber-100 text-amber-700', processed: 'bg-blue-100 text-blue-700', paid: 'bg-green-100 text-green-700' };
        return <span className={`badge ${s[status] || ''}`}>{status}</span>;
    };

    const processPayroll = (id: string) => {
        updatePayrollRecord(id, { status: 'processed', processedDate: new Date().toISOString().split('T')[0] });
    };

    // Chart data for payroll distribution
    const chartData = payroll.slice(0, 8).map(p => ({
        name: getEmpName(p.employeeId).split(' ')[0],
        netPay: p.netPay,
        bonus: p.bonus,
    }));

    const tabs = [
        { id: 'summary' as const, label: 'Payroll Summary' },
        { id: 'process' as const, label: 'Process Payroll' },
        { id: 'predictive' as const, label: 'Predictive Payroll' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-surface-900">Payroll Management</h2>

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-100 p-1 rounded-xl w-fit">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
                    >{tab.label}</button>
                ))}
            </div>

            {/* Summary Stats */}
            {activeTab === 'summary' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">Total Net Pay</p>
                                <p className="font-bold text-surface-900">${totalNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">Total Bonuses</p>
                                <p className="font-bold text-surface-900">${totalBonus.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">Total Deductions</p>
                                <p className="font-bold text-surface-900">${totalDeductions.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="glass-card p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-surface-500">Pending</p>
                                <p className="font-bold text-surface-900">{pendingCount} records</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Period</th>
                                        <th>Base Salary</th>
                                        <th>Bonus</th>
                                        <th>Deductions</th>
                                        <th>Net Pay</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payroll.map(record => (
                                        <tr key={record.id}>
                                            <td className="font-medium text-surface-800">{getEmpName(record.employeeId)}</td>
                                            <td className="text-surface-500">{record.period}</td>
                                            <td>${record.baseSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                            <td className="text-green-600">${record.bonus.toLocaleString()}</td>
                                            <td className="text-red-500">${record.deductions.toLocaleString()}</td>
                                            <td className="font-semibold">${record.netPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                            <td>{statusBadge(record.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-surface-900 mb-4">Pay Distribution</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={chartData} layout="vertical" barSize={16}>
                                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={60} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="netPay" fill="#6366f1" radius={[0, 6, 6, 0]} name="Net Pay" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Process Payroll */}
            {activeTab === 'process' && (
                <div className="space-y-4">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-surface-900 mb-4">Pending Payroll Records</h3>
                        <p className="text-sm text-surface-500 mb-4">Click "Process" to move records from pending to processed status.</p>
                        {payroll.filter(p => p.status === 'pending').length === 0 ? (
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <p className="text-green-700 font-medium">All payroll records have been processed!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {payroll.filter(p => p.status === 'pending').map(record => (
                                    <div key={record.id} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl border border-surface-100">
                                        <div>
                                            <p className="font-medium text-surface-900">{getEmpName(record.employeeId)}</p>
                                            <p className="text-sm text-surface-400">Period: {record.period} | Net: ${record.netPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                        </div>
                                        <button className="btn btn-primary btn-sm" onClick={() => processPayroll(record.id)}>
                                            <CheckCircle className="w-4 h-4" /> Process
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Predictive Payroll */}
            {activeTab === 'predictive' && (
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-surface-900">Predictive Payroll Analytics</h3>
                        <span className="badge bg-primary-100 text-primary-700 ml-2">Coming Soon</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-surface-50 rounded-xl border border-surface-200">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-5 h-5 text-primary-500" />
                                <h4 className="font-semibold text-surface-900">AI Forecasting Architecture</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-surface-600">
                                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">■</span> Analyze 12+ months of historical payroll data</li>
                                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">■</span> Predict net payroll for upcoming months</li>
                                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">■</span> Flag unusual deductions or bonus patterns</li>
                                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">■</span> Budget forecasting with confidence intervals</li>
                            </ul>
                        </div>
                        <div className="p-5 bg-surface-50 rounded-xl border border-surface-200">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                <h4 className="font-semibold text-surface-900">Anomaly Detection</h4>
                            </div>
                            <ul className="space-y-2 text-sm text-surface-600">
                                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">■</span> Auto-detect duplicate payroll entries</li>
                                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">■</span> Flag salaries outside department ranges</li>
                                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">■</span> Alert on sudden deduction changes</li>
                                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">■</span> Compliance checks against tax regulations</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                        <p className="text-sm text-primary-700">
                            <strong>Integration Note:</strong> This feature will use Google Gemini to analyze payroll patterns and generate predictive insights.
                            The AI model will be trained on anonymized payroll data using Vertex AI for production deployment.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
