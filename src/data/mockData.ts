import type { Employee, JobPosting, Candidate, PayrollRecord, Task, Ticket } from '../types';

export const mockEmployees: Employee[] = [
    { id: 'e1', firstName: 'Sarah', lastName: 'Chen', email: 'sarah.chen@company.com', phone: '+1-555-0101', department: 'Engineering', role: 'Senior Developer', status: 'active', startDate: '2023-03-15', salary: 125000, onboarding: [] },
    { id: 'e2', firstName: 'James', lastName: 'Wilson', email: 'james.wilson@company.com', phone: '+1-555-0102', department: 'Engineering', role: 'Frontend Developer', status: 'active', startDate: '2023-06-01', salary: 105000, onboarding: [] },
    { id: 'e3', firstName: 'Maya', lastName: 'Patel', email: 'maya.patel@company.com', phone: '+1-555-0103', department: 'Design', role: 'UX Designer', status: 'active', startDate: '2023-01-10', salary: 98000, onboarding: [] },
    { id: 'e4', firstName: 'David', lastName: 'Kim', email: 'david.kim@company.com', phone: '+1-555-0104', department: 'Marketing', role: 'Marketing Manager', status: 'active', startDate: '2022-11-01', salary: 110000, onboarding: [] },
    { id: 'e5', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.rodriguez@company.com', phone: '+1-555-0105', department: 'HR', role: 'HR Specialist', status: 'active', startDate: '2023-02-20', salary: 85000, onboarding: [] },
    { id: 'e6', firstName: 'Alex', lastName: 'Thompson', email: 'alex.thompson@company.com', phone: '+1-555-0106', department: 'Engineering', role: 'Backend Developer', status: 'active', startDate: '2023-08-15', salary: 115000, onboarding: [] },
    { id: 'e7', firstName: 'Lisa', lastName: 'Wang', email: 'lisa.wang@company.com', phone: '+1-555-0107', department: 'Finance', role: 'Financial Analyst', status: 'active', startDate: '2022-09-01', salary: 95000, onboarding: [] },
    { id: 'e8', firstName: 'Marcus', lastName: 'Johnson', email: 'marcus.johnson@company.com', phone: '+1-555-0108', department: 'Sales', role: 'Sales Representative', status: 'active', startDate: '2023-04-01', salary: 78000, onboarding: [] },
    { id: 'e9', firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@company.com', phone: '+1-555-0109', department: 'Engineering', role: 'DevOps Engineer', status: 'active', startDate: '2023-07-10', salary: 120000, onboarding: [] },
    { id: 'e10', firstName: 'Ryan', lastName: 'O\'Brien', email: 'ryan.obrien@company.com', phone: '+1-555-0110', department: 'Product', role: 'Product Manager', status: 'active', startDate: '2022-12-01', salary: 130000, onboarding: [] },
    { id: 'e11', firstName: 'Sofia', lastName: 'Martinez', email: 'sofia.martinez@company.com', phone: '+1-555-0111', department: 'Design', role: 'Graphic Designer', status: 'active', startDate: '2023-05-15', salary: 82000, onboarding: [] },
    { id: 'e12', firstName: 'Tom', lastName: 'Lee', email: 'tom.lee@company.com', phone: '+1-555-0112', department: 'Engineering', role: 'QA Engineer', status: 'active', startDate: '2023-09-01', salary: 92000, onboarding: [] },
    { id: 'e13', firstName: 'Rachel', lastName: 'Green', email: 'rachel.green@company.com', phone: '+1-555-0113', department: 'Marketing', role: 'Content Strategist', status: 'inactive', startDate: '2022-06-01', salary: 88000, onboarding: [] },
    { id: 'e14', firstName: 'Kevin', lastName: 'Brown', email: 'kevin.brown@company.com', phone: '+1-555-0114', department: 'Sales', role: 'Account Executive', status: 'active', startDate: '2023-10-01', salary: 85000, onboarding: [] },
    {
        id: 'e15', firstName: 'Nina', lastName: 'Foster', email: 'nina.foster@company.com', phone: '+1-555-0115', department: 'HR', role: 'Recruiter', status: 'onboarding', startDate: '2024-01-15', salary: 75000, onboarding: [
            { id: 'o1', title: 'Complete personal information form', completed: true },
            { id: 'o2', title: 'Sign employment contract', completed: true },
            { id: 'o3', title: 'Set up company email', completed: false },
            { id: 'o4', title: 'Complete IT security training', completed: false },
            { id: 'o5', title: 'Meet with team lead', completed: false },
            { id: 'o6', title: 'Review employee handbook', completed: false },
        ]
    },
];

export const mockJobPostings: JobPosting[] = [
    { id: 'j1', title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'full-time', description: 'We are looking for an experienced React developer to join our frontend team.', requiredSkills: ['React', 'TypeScript', 'CSS', 'REST API', 'Git', 'Testing'], salary: { min: 120000, max: 150000 }, status: 'open', postedDate: '2024-01-05' },
    { id: 'j2', title: 'UX/UI Designer', department: 'Design', location: 'Hybrid', type: 'full-time', description: 'Seeking a creative UX/UI designer to design intuitive user experiences.', requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'CSS'], salary: { min: 90000, max: 120000 }, status: 'open', postedDate: '2024-01-08' },
    { id: 'j3', title: 'Data Analyst', department: 'Finance', location: 'On-site', type: 'full-time', description: 'Looking for a data analyst to drive business insights.', requiredSkills: ['SQL', 'Python', 'Tableau', 'Statistics', 'Excel'], salary: { min: 85000, max: 110000 }, status: 'open', postedDate: '2024-01-10' },
    { id: 'j4', title: 'Marketing Coordinator', department: 'Marketing', location: 'Hybrid', type: 'full-time', description: 'Join our marketing team to coordinate campaigns and events.', requiredSkills: ['Social Media', 'Content Writing', 'SEO', 'Analytics', 'Project Management'], salary: { min: 60000, max: 80000 }, status: 'closed', postedDate: '2023-11-15' },
    { id: 'j5', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'contract', description: 'Seeking a DevOps engineer to improve our CI/CD pipelines.', requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux'], salary: { min: 130000, max: 160000 }, status: 'open', postedDate: '2024-01-12' },
];

export const mockCandidates: Candidate[] = [
    { id: 'c1', name: 'Alice Johnson', email: 'alice@example.com', jobPostingId: 'j1', resumeText: 'Experienced React developer with 5 years building TypeScript applications. Proficient in CSS, REST API integration, Git version control, and unit testing with Jest.', matchScore: 92, matchedSkills: ['React', 'TypeScript', 'CSS', 'REST API', 'Git', 'Testing'], status: 'interview', appliedDate: '2024-01-06' },
    { id: 'c2', name: 'Bob Smith', email: 'bob@example.com', jobPostingId: 'j1', resumeText: 'Full-stack developer with React and Node.js experience. Familiar with TypeScript and Git workflows. Built REST APIs.', matchScore: 75, matchedSkills: ['React', 'TypeScript', 'REST API', 'Git'], status: 'screening', appliedDate: '2024-01-07' },
    { id: 'c3', name: 'Carol White', email: 'carol@example.com', jobPostingId: 'j2', resumeText: 'UX designer with 4 years of experience in Figma and user research. Created design systems for multiple SaaS products. Strong prototyping skills.', matchScore: 88, matchedSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'], status: 'screening', appliedDate: '2024-01-09' },
    { id: 'c4', name: 'Dan Lee', email: 'dan@example.com', jobPostingId: 'j3', resumeText: 'Analyst with SQL expertise and Python scripting. Experience with Tableau dashboards and statistical modeling.', matchScore: 80, matchedSkills: ['SQL', 'Python', 'Tableau', 'Statistics'], status: 'new', appliedDate: '2024-01-11' },
    { id: 'c5', name: 'Eve Davis', email: 'eve@example.com', jobPostingId: 'j1', resumeText: 'Junior developer learning React. Strong CSS skills and some TypeScript experience.', matchScore: 45, matchedSkills: ['React', 'CSS', 'TypeScript'], status: 'rejected', appliedDate: '2024-01-06' },
];

export const mockPayroll: PayrollRecord[] = [
    { id: 'p1', employeeId: 'e1', period: '2024-01', baseSalary: 10416.67, bonus: 2000, deductions: 3125, netPay: 9291.67, status: 'paid', processedDate: '2024-01-31' },
    { id: 'p2', employeeId: 'e2', period: '2024-01', baseSalary: 8750, bonus: 0, deductions: 2625, netPay: 6125, status: 'paid', processedDate: '2024-01-31' },
    { id: 'p3', employeeId: 'e3', period: '2024-01', baseSalary: 8166.67, bonus: 500, deductions: 2450, netPay: 6216.67, status: 'paid', processedDate: '2024-01-31' },
    { id: 'p4', employeeId: 'e4', period: '2024-01', baseSalary: 9166.67, bonus: 1500, deductions: 2750, netPay: 7916.67, status: 'paid', processedDate: '2024-01-31' },
    { id: 'p5', employeeId: 'e5', period: '2024-01', baseSalary: 7083.33, bonus: 0, deductions: 2125, netPay: 4958.33, status: 'paid', processedDate: '2024-01-31' },
    { id: 'p6', employeeId: 'e6', period: '2024-01', baseSalary: 9583.33, bonus: 1000, deductions: 2875, netPay: 7708.33, status: 'processed' },
    { id: 'p7', employeeId: 'e7', period: '2024-01', baseSalary: 7916.67, bonus: 0, deductions: 2375, netPay: 5541.67, status: 'processed' },
    { id: 'p8', employeeId: 'e8', period: '2024-01', baseSalary: 6500, bonus: 2500, deductions: 1950, netPay: 7050, status: 'pending' },
    { id: 'p9', employeeId: 'e9', period: '2024-01', baseSalary: 10000, bonus: 0, deductions: 3000, netPay: 7000, status: 'pending' },
    { id: 'p10', employeeId: 'e10', period: '2024-01', baseSalary: 10833.33, bonus: 3000, deductions: 3250, netPay: 10583.33, status: 'pending' },
];

export const mockTasks: Task[] = [
    { id: 't1', title: 'Update employee handbook', description: 'Review and update the 2024 employee handbook with new policies.', assigneeId: 'e5', priority: 'high', status: 'in-progress', dueDate: '2024-02-15', createdDate: '2024-01-10' },
    { id: 't2', title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment.', assigneeId: 'e9', priority: 'urgent', status: 'in-progress', dueDate: '2024-01-31', createdDate: '2024-01-05' },
    { id: 't3', title: 'Design new dashboard', description: 'Create mockups for the new analytics dashboard.', assigneeId: 'e3', priority: 'medium', status: 'todo', dueDate: '2024-02-28', createdDate: '2024-01-12' },
    { id: 't4', title: 'Q1 marketing plan', description: 'Develop comprehensive Q1 marketing strategy and budget.', assigneeId: 'e4', priority: 'high', status: 'done', dueDate: '2024-01-20', createdDate: '2024-01-02' },
    { id: 't5', title: 'Code review: auth module', description: 'Review the authentication module refactoring PR.', assigneeId: 'e1', priority: 'medium', status: 'todo', dueDate: '2024-02-01', createdDate: '2024-01-14' },
    { id: 't6', title: 'Client presentation', description: 'Prepare slides for the big client demo next week.', assigneeId: 'e8', priority: 'urgent', status: 'in-progress', dueDate: '2024-01-25', createdDate: '2024-01-15' },
    { id: 't7', title: 'Database optimization', description: 'Optimize slow queries in the reporting module.', assigneeId: 'e6', priority: 'medium', status: 'todo', dueDate: '2024-02-10', createdDate: '2024-01-13' },
    { id: 't8', title: 'Onboard new recruiter', description: 'Help Nina complete her onboarding process.', assigneeId: 'e5', priority: 'high', status: 'in-progress', dueDate: '2024-02-01', createdDate: '2024-01-15' },
];

export const mockTickets: Ticket[] = [
    { id: 'tk1', title: 'Request for remote work equipment', description: 'I need a monitor and keyboard for my home office setup.', submittedBy: 'e2', category: 'workplace', priority: 'medium', status: 'open', createdDate: '2024-01-14' },
    { id: 'tk2', title: 'Payroll discrepancy - December', description: 'My December paycheck seems to be missing the performance bonus.', submittedBy: 'e8', category: 'payroll', priority: 'high', status: 'in-progress', createdDate: '2024-01-10' },
    { id: 'tk3', title: 'PTO balance inquiry', description: 'I would like to know my remaining PTO balance for this year.', submittedBy: 'e6', category: 'leave', priority: 'low', status: 'resolved', createdDate: '2024-01-08', resolvedDate: '2024-01-09' },
    { id: 'tk4', title: 'Health insurance enrollment', description: 'Need help enrolling in the company health insurance plan.', submittedBy: 'e14', category: 'benefits', priority: 'high', status: 'open', createdDate: '2024-01-15' },
    { id: 'tk5', title: 'Parking pass request', description: 'I need a parking pass for the downtown office.', submittedBy: 'e7', category: 'workplace', priority: 'low', status: 'closed', createdDate: '2024-01-05', resolvedDate: '2024-01-07' },
    { id: 'tk6', title: 'Training reimbursement', description: 'I completed an AWS certification course and would like reimbursement.', submittedBy: 'e9', category: 'other', priority: 'medium', status: 'open', createdDate: '2024-01-13' },
];
