
import { useEffect, useState } from "react";
import {
  Users, UserCheck, UserMinus, TrendingUp,
  Search, Bell, LayoutDashboard, UserRound,
  Settings, Plus, X, Trash2, Pencil
} from "lucide-react";
import { getEmployees } from "./services/employeeService";
import "./App.css";

const API_URL = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    status: "Active"
  });

  const loadEmployees = async () => {
    try {
      setError("");
      const result = await getEmployees();
      if (result.success) setEmployees(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const addEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          salary: Number(form.salary)
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to add employee");
      }

      alert("Employee added successfully!");
      setForm({
        name: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        status: "Active"
      });
      setShowAddForm(false);
      await loadEmployees();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Delete failed");
      }

      await loadEmployees();
    } catch (err) {
      alert(err.message);
    }
  };

  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const inactive = employees.filter(e => e.status === "Inactive").length;
  const departments = new Set(employees.map(e => e.department)).size;

  const filteredEmployees = employees.filter(employee =>
    [employee.name, employee.email, employee.department, employee.position]
      .some(value => value.toLowerCase().includes(search.toLowerCase()))
  );

  const departmentCounts = employees.reduce((map, employee) => {
    map[employee.department] = (map[employee.department] || 0) + 1;
    return map;
  }, {});

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>HR Insights<span>Pro</span></h2>
        <p className="menu-label">MAIN MENU</p>
        <div className="menu active"><LayoutDashboard size={19} /> Dashboard</div>
        <div className="menu"><Users size={19} /> Employees</div>
        <div className="menu"><TrendingUp size={19} /> Analytics</div>
        <div className="menu"><Settings size={19} /> Settings</div>
        <div className="sidebar-bottom">HR Management System</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your workforce overview.</p>
          </div>
          <div className="profile">
            <Bell size={21} />
            <div className="avatar">HR</div>
            <span>Admin</span>
          </div>
        </header>

        <section className="welcome">
          <div>
            <h2>HR Analytics Overview</h2>
            <p>Track your workforce performance and insights in one place.</p>
          </div>
          <button onClick={() => setShowAddForm(true)}>
            <Plus size={17} /> Add Employee
          </button>
        </section>

        {error && <p className="muted">{error}</p>}

        {showAddForm && (
          <section className="panel add-form">
            <div className="table-heading">
              <h3>Add New Employee</h3>
              <button onClick={() => setShowAddForm(false)}>
                <X size={18} /> Close
              </button>
            </div>

            <form onSubmit={addEmployee}>
              <div className="form-grid">
                <input
                  placeholder="Employee Name"
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
                <input
                  placeholder="Department"
                  required
                  value={form.department}
                  onChange={e => setForm({...form, department: e.target.value})}
                />
                <input
                  placeholder="Position"
                  required
                  value={form.position}
                  onChange={e => setForm({...form, position: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Salary"
                  min="0"
                  required
                  value={form.salary}
                  onChange={e => setForm({...form, salary: e.target.value})}
                />
                <select
                  value={form.status}
                  onChange={e => setForm({...form, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit">Save Employee</button>
            </form>
          </section>
        )}

        <section className="stats">
          <Stat icon={<Users />} label="Total Employees" value={total} note="Employees in database" />
          <Stat icon={<UserCheck />} label="Active Employees" value={active} note="Currently active" />
          <Stat icon={<UserMinus />} label="Inactive Employees" value={inactive} note="Currently inactive" />
          <Stat icon={<TrendingUp />} label="Departments" value={departments} note="Unique departments" />
        </section>

        <section className="content-grid">
          <div className="panel">
            <h3>Workforce Summary</h3>
            <p className="muted">Employee distribution overview</p>
            <div className="summary">
              <div className="donut">
                <span>{total}<small>Employees</small></span>
              </div>
              <div className="legend">
                <p><i className="dot blue"></i> Active <b>{active}</b></p>
                <p><i className="dot purple"></i> Inactive <b>{inactive}</b></p>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Department Overview</h3>
            <p className="muted">Employees by department</p>
            {Object.entries(departmentCounts).map(([name, value]) => (
              <div className="bar-row" key={name}>
                <div><span>{name}</span><b>{value}</b></div>
                <div className="bar">
                  <span style={{width: `${total ? value / total * 100 : 0}%`}} />
                </div>
              </div>
            ))}
            {total === 0 && <p className="muted">No department data available.</p>}
          </div>
        </section>

        <section className="panel employees">
          <div className="table-heading">
            <div>
              <h3>Recent Employees</h3>
              <p className="muted">Manage your team members</p>
            </div>
            <button onClick={() => setShowAddForm(true)}>
              <Plus size={16} /> Add Employee
            </button>
          </div>

          <div className="search">
            <Search size={17} />
            <input
              placeholder="Search employees..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {loading ? <p>Loading employees...</p> : (
            <table>
              <thead>
                <tr>
                  <th>EMPLOYEE</th>
                  <th>DEPARTMENT</th>
                  <th>POSITION</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee._id}>
                    <td><UserRound size={17} /> {employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>
                      <span className={employee.status === "Active" ? "status" : "inactive"}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteEmployee(employee._id)}
                        title="Delete employee"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr><td colSpan="5">No employees found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

function Stat({ icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <p>{label}</p>
      <h2>{value}</h2>
      <small>{note}</small>
    </div>
  );
}

export default App;
