import type { Employee, JobPosting, Candidate, PayrollRecord, Task, Ticket } from '../types';
import { mockEmployees, mockJobPostings, mockCandidates, mockPayroll, mockTasks, mockTickets } from './mockData';

const STORAGE_KEYS = {
    employees: 'hr_employees',
    jobPostings: 'hr_jobPostings',
    candidates: 'hr_candidates',
    payroll: 'hr_payroll',
    tasks: 'hr_tasks',
    tickets: 'hr_tickets',
};

function load<T>(key: string, fallback: T[]): T[] {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
}

function save<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

type Listener = () => void;
const listeners: Set<Listener> = new Set();
export function subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}
function notify() {
    listeners.forEach(fn => fn());
}

// === EMPLOYEES ===
export function getEmployees(): Employee[] {
    return load<Employee>(STORAGE_KEYS.employees, mockEmployees);
}
export function getEmployee(id: string): Employee | undefined {
    return getEmployees().find(e => e.id === id);
}
export function addEmployee(data: Omit<Employee, 'id'>): Employee {
    const employees = getEmployees();
    const emp: Employee = { ...data, id: generateId() };
    employees.push(emp);
    save(STORAGE_KEYS.employees, employees);
    notify();
    return emp;
}
export function updateEmployee(id: string, data: Partial<Employee>): Employee | undefined {
    const employees = getEmployees();
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return undefined;
    employees[idx] = { ...employees[idx], ...data };
    save(STORAGE_KEYS.employees, employees);
    notify();
    return employees[idx];
}
export function deleteEmployee(id: string): boolean {
    const employees = getEmployees();
    const filtered = employees.filter(e => e.id !== id);
    if (filtered.length === employees.length) return false;
    save(STORAGE_KEYS.employees, filtered);
    notify();
    return true;
}

// === JOB POSTINGS ===
export function getJobPostings(): JobPosting[] {
    return load<JobPosting>(STORAGE_KEYS.jobPostings, mockJobPostings);
}
export function getJobPosting(id: string): JobPosting | undefined {
    return getJobPostings().find(j => j.id === id);
}
export function addJobPosting(data: Omit<JobPosting, 'id'>): JobPosting {
    const postings = getJobPostings();
    const posting: JobPosting = { ...data, id: generateId() };
    postings.push(posting);
    save(STORAGE_KEYS.jobPostings, postings);
    notify();
    return posting;
}
export function updateJobPosting(id: string, data: Partial<JobPosting>): void {
    const postings = getJobPostings();
    const idx = postings.findIndex(j => j.id === id);
    if (idx !== -1) { postings[idx] = { ...postings[idx], ...data }; save(STORAGE_KEYS.jobPostings, postings); notify(); }
}

// === CANDIDATES ===
export function getCandidates(): Candidate[] {
    return load<Candidate>(STORAGE_KEYS.candidates, mockCandidates);
}
export function addCandidate(data: Omit<Candidate, 'id'>): Candidate {
    const candidates = getCandidates();
    const candidate: Candidate = { ...data, id: generateId() };
    candidates.push(candidate);
    save(STORAGE_KEYS.candidates, candidates);
    notify();
    return candidate;
}
export function updateCandidate(id: string, data: Partial<Candidate>): void {
    const candidates = getCandidates();
    const idx = candidates.findIndex(c => c.id === id);
    if (idx !== -1) { candidates[idx] = { ...candidates[idx], ...data }; save(STORAGE_KEYS.candidates, candidates); notify(); }
}

// === PAYROLL ===
export function getPayroll(): PayrollRecord[] {
    return load<PayrollRecord>(STORAGE_KEYS.payroll, mockPayroll);
}
export function addPayrollRecord(data: Omit<PayrollRecord, 'id'>): PayrollRecord {
    const records = getPayroll();
    const record: PayrollRecord = { ...data, id: generateId() };
    records.push(record);
    save(STORAGE_KEYS.payroll, records);
    notify();
    return record;
}
export function updatePayrollRecord(id: string, data: Partial<PayrollRecord>): void {
    const records = getPayroll();
    const idx = records.findIndex(r => r.id === id);
    if (idx !== -1) { records[idx] = { ...records[idx], ...data }; save(STORAGE_KEYS.payroll, records); notify(); }
}

// === TASKS ===
export function getTasks(): Task[] {
    return load<Task>(STORAGE_KEYS.tasks, mockTasks);
}
export function addTask(data: Omit<Task, 'id'>): Task {
    const tasks = getTasks();
    const task: Task = { ...data, id: generateId() };
    tasks.push(task);
    save(STORAGE_KEYS.tasks, tasks);
    notify();
    return task;
}
export function updateTask(id: string, data: Partial<Task>): void {
    const tasks = getTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) { tasks[idx] = { ...tasks[idx], ...data }; save(STORAGE_KEYS.tasks, tasks); notify(); }
}
export function deleteTask(id: string): void {
    const tasks = getTasks().filter(t => t.id !== id);
    save(STORAGE_KEYS.tasks, tasks);
    notify();
}

// === TICKETS ===
export function getTickets(): Ticket[] {
    return load<Ticket>(STORAGE_KEYS.tickets, mockTickets);
}
export function addTicket(data: Omit<Ticket, 'id'>): Ticket {
    const tickets = getTickets();
    const ticket: Ticket = { ...data, id: generateId() };
    tickets.push(ticket);
    save(STORAGE_KEYS.tickets, tickets);
    notify();
    return ticket;
}
export function updateTicket(id: string, data: Partial<Ticket>): void {
    const tickets = getTickets();
    const idx = tickets.findIndex(t => t.id === id);
    if (idx !== -1) { tickets[idx] = { ...tickets[idx], ...data }; save(STORAGE_KEYS.tickets, tickets); notify(); }
}

// === AI RESUME SCREENING ===
export function screenResume(resumeText: string, jobPostingId: string): { matchScore: number; matchedSkills: string[] } {
    const posting = getJobPosting(jobPostingId);
    if (!posting) return { matchScore: 0, matchedSkills: [] };

    const resumeLower = resumeText.toLowerCase();
    const matchedSkills = posting.requiredSkills.filter(skill =>
        resumeLower.includes(skill.toLowerCase())
    );
    const matchScore = Math.round((matchedSkills.length / posting.requiredSkills.length) * 100);
    return { matchScore, matchedSkills };
}
