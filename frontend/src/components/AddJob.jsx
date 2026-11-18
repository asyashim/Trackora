import { useState } from "react";
import { createJob } from "../api/jobApi";

const AddJob = ({onJobAdded}) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [message, setMessage] = useState("");
const [error, setError] = useState("");

 
  const handleSubmit = async (e) => {
  e.preventDefault();

  setMessage("");
  setError("");

  try {
    const jobData = {
      company,
      position,
      status,
    };

    const data = await createJob(jobData);

    onJobAdded(data.job);

    setMessage(data.message);

    setCompany("");
    setPosition("");
    setStatus("Applied");

  } catch (error) {
    setError(error.message);
  }
};

  return (

    <div className="add-job-section">
  <h2>Add Job Application</h2>

{message && <p className="add-job-message">{message}</p>}
{error && <p className="add-job-error">{error}</p>}

  <form className="add-job-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Company Name"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
    />

    <input
      type="text"
      placeholder="Job Position"
      value={position}
      onChange={(e) => setPosition(e.target.value)}
    />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Rejected">Rejected</option>
    </select>

    <button type="submit">Add Application</button>
  </form>
</div>
   
  );
};

export default AddJob;