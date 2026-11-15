
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ApplicationsTable from "../components/ApplicationsTable";
import './Dashboard.css'

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <Header />

        <section className="stats-grid">
          <StatCard
            title="Total Applications"
            count={totalJobs}
            description="All applications"
            icon="▤"
            color="blue"
          />

          <StatCard
            title="Applied"
            count={appliedJobs}
            description="Applications submitted"
            icon="➤"
            color="purple"
          />

          <StatCard
            title="Interviews"
            count={interviewJobs}
            description="Interview stage"
            icon="◷"
            color="orange"
          />

          <StatCard
            title="Rejected"
            count={rejectedJobs}
            description="Unsuccessful applications"
            icon="×"
            color="red"
          />
        </section>

        <ApplicationsTable
          jobs={jobs}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
};

export default Dashboard;
