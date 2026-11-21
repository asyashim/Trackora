
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import AddJob from "../components/AddJob";
import { getJobs } from "../api/jobApi";
import ApplicationsTable from "../components/ApplicationsTable";
import './Dashboard.css'

const Dashboard = () => {
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

        <AddJob
  onJobAdded={(newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  }}
/>

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

        <section id="applications" className="applications-section">
  <ApplicationsTable
    jobs={jobs}
    loading={loading}
    error={error}
    onJobDeleted={(id) => {
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );
    }}
    onJobUpdated={(id, updatedJob) => {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === id ? { ...job, ...updatedJob } : job
        )
      );
    }}
  />
</section>

  </main>
    </div>
  );
};

export default Dashboard;      

 
