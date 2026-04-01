import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeProfile from './pages/employees/EmployeeProfile';
import EmployeeForm from './pages/employees/EmployeeForm';
import Recruitment from './pages/recruitment/Recruitment';
import Payroll from './pages/payroll/Payroll';
import TaskBoard from './pages/tasks/TaskBoard';
import TicketCenter from './pages/tickets/TicketCenter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/employees/:id/edit" element={<EmployeeForm />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/tickets" element={<TicketCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
