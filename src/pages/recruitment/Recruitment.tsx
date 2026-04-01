import { useState } from 'react';
import { Plus, MapPin, Clock, DollarSign, FileText, Upload, Sparkles } from 'lucide-react';
import { getJobPostings, addJobPosting, getCandidates, addCandidate, screenResume } from '../../data/store';
import type { JobPosting } from '../../types';

export default function Recruitment() {
    const [activeTab, setActiveTab] = useState<'postings' | 'screening' | 'candidates'>('postings');
    const [showJobForm, setShowJobForm] = useState(false);
    const [jobForm, setJobForm] = useState({ title: '', department: 'Engineering', location: 'Remote', type: 'full-time' as JobPosting['type'], description: '', skills: '', salaryMin: '', salaryMax: '' });

    // Screening state
    const [selectedJob, setSelectedJob] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [screeningResult, setScreeningResult] = useState<{ matchScore: number; matchedSkills: string[] } | null>(null);
    const [isScreening, setIsScreening] = useState(false);

    const jobPostings = getJobPostings();
    const candidates = getCandidates();

    const handleAddJob = () => {
        if (!jobForm.title || !jobForm.description) return;
        addJobPosting({
            title: jobForm.title, department: jobForm.department, location: jobForm.location,
            type: jobForm.type, description: jobForm.description,
            requiredSkills: jobForm.skills.split(',').map(s => s.trim()).filter(Boolean),
            salary: { min: Number(jobForm.salaryMin) || 0, max: Number(jobForm.salaryMax) || 0 },
            status: 'open', postedDate: new Date().toISOString().split('T')[0],
        });
        setJobForm({ title: '', department: 'Engineering', location: 'Remote', type: 'full-time', description: '', skills: '', salaryMin: '', salaryMax: '' });
        setShowJobForm(false);
    };

    const handleScreen = () => {
        if (!selectedJob || !resumeText) return;
        setIsScreening(true);
        // Simulate AI processing delay
        setTimeout(() => {
            const result = screenResume(resumeText, selectedJob);
            setScreeningResult(result);
            // Save as candidate
            const posting = jobPostings.find(j => j.id === selectedJob);
            if (posting) {
                addCandidate({
                    name: 'New Candidate',
                    email: 'candidate@example.com',
                    jobPostingId: selectedJob,
                    resumeText,
                    matchScore: result.matchScore,
                    matchedSkills: result.matchedSkills,
                    status: result.matchScore >= 70 ? 'screening' : 'new',
                    appliedDate: new Date().toISOString().split('T')[0],
                });
            }
            setIsScreening(false);
        }, 1500);
    };

    const statusBadge = (status: string) => {
        const s: Record<string, string> = { open: 'bg-green-100 text-green-700', closed: 'bg-surface-100 text-surface-600', draft: 'bg-amber-100 text-amber-700' };
        return <span className={`badge ${s[status] || ''}`}>{status}</span>;
    };

    const candidateStatusBadge = (status: string) => {
        const s: Record<string, string> = { 'new': 'bg-blue-100 text-blue-700', 'screening': 'bg-amber-100 text-amber-700', 'interview': 'bg-purple-100 text-purple-700', 'offered': 'bg-green-100 text-green-700', 'rejected': 'bg-red-100 text-red-700' };
        return <span className={`badge ${s[status] || ''}`}>{status}</span>;
    };

    const scoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-100 border-green-300';
        if (score >= 60) return 'text-amber-600 bg-amber-100 border-amber-300';
        return 'text-red-600 bg-red-100 border-red-300';
    };

    const tabs = [
        { id: 'postings' as const, label: 'Job Postings' },
        { id: 'screening' as const, label: 'AI Resume Screening' },
        { id: 'candidates' as const, label: 'Candidates' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-surface-900">Recruitment & Hiring</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-100 p-1 rounded-xl w-fit">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? 'bg-white text-surface-900 shadow-sm'
                            : 'text-surface-500 hover:text-surface-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Job Postings Tab */}
            {activeTab === 'postings' && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button className="btn btn-primary" onClick={() => setShowJobForm(true)} id="add-job-btn">
                            <Plus className="w-4 h-4" /> New Job Posting
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
                        {jobPostings.map(job => (
                            <div key={job.id} className="glass-card p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-surface-900">{job.title}</h3>
                                        <p className="text-sm text-surface-500">{job.department}</p>
                                    </div>
                                    {statusBadge(job.status)}
                                </div>
                                <p className="text-sm text-surface-600 mb-4 line-clamp-2">{job.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {job.requiredSkills.map(skill => (
                                        <span key={skill} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-md text-xs font-medium">{skill}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-surface-400">
                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> ${(job.salary.min / 1000).toFixed(0)}K-${(job.salary.max / 1000).toFixed(0)}K</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-surface-100 flex justify-between items-center">
                                    <span className="text-xs text-surface-400">Posted {job.postedDate}</span>
                                    <span className="text-xs font-medium text-primary-600">
                                        {candidates.filter(c => c.jobPostingId === job.id).length} applicants
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Screening Tab */}
            {activeTab === 'screening' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Sparkles className="w-5 h-5 text-primary-500" />
                            <h3 className="text-lg font-bold text-surface-900">AI Resume Screening</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-surface-600 mb-1 block">Select Job Posting</label>
                                <select className="select" value={selectedJob} onChange={e => setSelectedJob(e.target.value)} id="screening-job-select">
                                    <option value="">Choose a job posting...</option>
                                    {jobPostings.filter(j => j.status === 'open').map(j => (
                                        <option key={j.id} value={j.id}>{j.title}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedJob && (
                                <div className="p-3 bg-primary-50 rounded-xl">
                                    <p className="text-xs font-medium text-primary-700 mb-1">Required Skills:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {jobPostings.find(j => j.id === selectedJob)?.requiredSkills.map(s => (
                                            <span key={s} className="px-2 py-0.5 bg-white text-primary-700 rounded-md text-xs font-medium">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-surface-600 mb-1 block">Resume Text</label>
                                <textarea
                                    className="textarea"
                                    rows={8}
                                    placeholder="Paste resume content here for AI screening..."
                                    value={resumeText}
                                    onChange={e => setResumeText(e.target.value)}
                                    id="resume-text-input"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button className="btn btn-primary flex-1" onClick={handleScreen} disabled={!selectedJob || !resumeText || isScreening} id="screen-resume-btn">
                                    {isScreening ? (
                                        <><span className="animate-spin">⏳</span> Analyzing with AI...</>
                                    ) : (
                                        <><Upload className="w-4 h-4" /> Screen Resume</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Screening Result */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-surface-900 mb-5">Screening Results</h3>
                        {screeningResult ? (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-4">
                                    <div className={`score-ring border-2 ${scoreColor(screeningResult.matchScore)}`}>
                                        {screeningResult.matchScore}%
                                    </div>
                                    <div>
                                        <p className="font-bold text-surface-900">Match Score</p>
                                        <p className="text-sm text-surface-500">
                                            {screeningResult.matchScore >= 80 ? 'Strong match!' : screeningResult.matchScore >= 60 ? 'Moderate match' : 'Low match'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-surface-600 mb-2">Matched Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {jobPostings.find(j => j.id === selectedJob)?.requiredSkills.map(skill => {
                                            const matched = screeningResult.matchedSkills.includes(skill);
                                            return (
                                                <span key={skill} className={`px-3 py-1 rounded-lg text-xs font-medium ${matched ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500 line-through'
                                                    }`}>
                                                    {skill}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="p-4 bg-surface-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-primary-500" />
                                        <p className="text-sm font-semibold text-surface-900">AI Recommendation</p>
                                    </div>
                                    <p className="text-sm text-surface-600">
                                        {screeningResult.matchScore >= 80
                                            ? 'This candidate is an excellent match. Recommend moving to interview stage immediately.'
                                            : screeningResult.matchScore >= 60
                                                ? 'This candidate shows potential. Consider a screening call to evaluate gaps in skill coverage.'
                                                : 'This candidate does not meet the minimum threshold. Consider for other open positions or archive.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <FileText className="w-12 h-12 text-surface-300 mb-3" />
                                <p className="text-surface-400">Upload a resume and select a job posting to see AI screening results.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Candidates Tab */}
            {activeTab === 'candidates' && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Candidate</th>
                                <th>Position</th>
                                <th>Match Score</th>
                                <th>Matched Skills</th>
                                <th>Status</th>
                                <th>Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.sort((a, b) => b.matchScore - a.matchScore).map(candidate => {
                                const job = jobPostings.find(j => j.id === candidate.jobPostingId);
                                return (
                                    <tr key={candidate.id}>
                                        <td>
                                            <div>
                                                <p className="font-medium text-surface-900">{candidate.name}</p>
                                                <p className="text-xs text-surface-400">{candidate.email}</p>
                                            </div>
                                        </td>
                                        <td className="text-surface-600 text-sm">{job?.title || 'Unknown'}</td>
                                        <td>
                                            <div className={`score-ring text-xs w-12 h-12 border ${scoreColor(candidate.matchScore)}`}>
                                                {candidate.matchScore}%
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {candidate.matchedSkills.map(s => (
                                                    <span key={s} className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[0.65rem]">{s}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{candidateStatusBadge(candidate.status)}</td>
                                        <td className="text-surface-500 text-sm">{candidate.appliedDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {candidates.length === 0 && (
                        <div className="py-12 text-center text-surface-400">No candidates yet.</div>
                    )}
                </div>
            )}

            {/* Add Job Modal */}
            {showJobForm && (
                <div className="modal-overlay" onClick={() => setShowJobForm(false)}>
                    <div className="modal-content p-6" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-surface-900 mb-4">New Job Posting</h3>
                        <div className="space-y-3">
                            <input className="input" placeholder="Job Title *" value={jobForm.title} onChange={e => setJobForm(p => ({ ...p, title: e.target.value }))} id="job-title" />
                            <div className="grid grid-cols-2 gap-3">
                                <select className="select" value={jobForm.department} onChange={e => setJobForm(p => ({ ...p, department: e.target.value }))} id="job-department">
                                    {['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Product'].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <select className="select" value={jobForm.type} onChange={e => setJobForm(p => ({ ...p, type: e.target.value as JobPosting['type'] }))} id="job-type">
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                </select>
                            </div>
                            <input className="input" placeholder="Location" value={jobForm.location} onChange={e => setJobForm(p => ({ ...p, location: e.target.value }))} id="job-location" />
                            <textarea className="textarea" placeholder="Job Description *" value={jobForm.description} onChange={e => setJobForm(p => ({ ...p, description: e.target.value }))} id="job-description" />
                            <input className="input" placeholder="Required Skills (comma-separated) *" value={jobForm.skills} onChange={e => setJobForm(p => ({ ...p, skills: e.target.value }))} id="job-skills" />
                            <div className="grid grid-cols-2 gap-3">
                                <input className="input" placeholder="Min Salary" type="number" value={jobForm.salaryMin} onChange={e => setJobForm(p => ({ ...p, salaryMin: e.target.value }))} id="job-salary-min" />
                                <input className="input" placeholder="Max Salary" type="number" value={jobForm.salaryMax} onChange={e => setJobForm(p => ({ ...p, salaryMax: e.target.value }))} id="job-salary-max" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button className="btn btn-secondary" onClick={() => setShowJobForm(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddJob} id="save-job-btn">Create Posting</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
