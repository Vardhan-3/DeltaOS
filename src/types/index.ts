export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    status: 'active' | 'inactive' | 'onboarding';
    startDate: string;
    salary: number;
    avatar?: string;
    onboarding?: OnboardingItem[];
}

export interface OnboardingItem {
    id: string;
    title: string;
    completed: boolean;
}

export interface JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract';
    description: string;
    requiredSkills: string[];
    salary: { min: number; max: number };
    status: 'open' | 'closed' | 'draft';
    postedDate: string;
}

export interface Candidate {
    id: string;
    name: string;
    email: string;
    jobPostingId: string;
    resumeText: string;
    matchScore: number;
    matchedSkills: string[];
    status: 'new' | 'screening' | 'interview' | 'offered' | 'rejected';
    appliedDate: string;
}

export interface PayrollRecord {
    id: string;
    employeeId: string;
    period: string;
    baseSalary: number;
    bonus: number;
    deductions: number;
    netPay: number;
    status: 'pending' | 'processed' | 'paid';
    processedDate?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    assigneeId: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'todo' | 'in-progress' | 'done';
    dueDate: string;
    createdDate: string;
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    submittedBy: string;
    category: 'leave' | 'payroll' | 'benefits' | 'workplace' | 'other';
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    createdDate: string;
    resolvedDate?: string;
}
