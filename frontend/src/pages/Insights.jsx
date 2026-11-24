
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import { useState, useEffect } from "react";
import { getJobs } from "../api/jobApi";

const Insights = () => {

  const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
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

       <div className="insights-page">
  <h1>Insights</h1>
  <p>Track your job search progress and application activity.</p>

  {loading ? (
    <p>Loading insights...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <section className="stats-grid">
      <StatCard
        title="Total Applications"
        count={totalJobs}
      />

      <StatCard
        title="Applied"
        count={appliedJobs}
      />

      <StatCard
        title="Interviews"
        count={interviewJobs}
      />

      <StatCard
        title="Rejected"
        count={rejectedJobs}
      />
    </section>
  )}
</div>
      </main>
    </div>
  );
};

export default Insights;
