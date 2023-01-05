import "./styles.css";
import { Route, Routes } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import AdminDashboard from "./AdminDashboard";

export default function App() {
  return (
    <div className="App">
      <h1>User Job Application</h1>
      <Routes>
        <Route path="/" element={<ApplicationForm />} exact={true} />
        <Route path="/Admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
