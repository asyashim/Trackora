
import {useState} from "react"
import { deleteJob,updateJob } from "../api/jobApi";

const ApplicationsTable = ({ jobs, loading, error, onJobDeleted,onJobUpdated }) => {

  const [editingJob , setEditingJob] =useState(null);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [searchTerm , setSearchTerm] =useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
  const matchesSearch = job.company
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || job.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const handleDelete = async (id) => {
  try {
    await deleteJob(id);

    onJobDeleted(id);

  } catch (error) {
    console.log(error.message);
  }
};

const handleUpdate = async () => {
  try {
    const jobData = {
      company,
      position,
      status,
    };

    await updateJob(editingJob._id, jobData);

    onJobUpdated(editingJob._id, jobData);

    setEditingJob(null);

  } catch (error) {
    console.log(error.message);
  }
};
  return (
    <section className="applications-section">
      

<div className="search-filter-container">

  <div className="search-box">
    <input
      type="text"
      placeholder="Search by company name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="filter-box">
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Rejected">Rejected</option>
    </select>
  </div>

</div>
      <div className="section-heading">
        

        <span className="application-count">
          {jobs.length} applications
        </span>
      </div>

      {loading && <p className="message">Loading applications...</p>}

      {error && <p className="error-message">{error}</p>}

   {editingJob && (
  <div className="edit-job-form">
    <h3>Edit Job Application</h3>

    <input
      type="text"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
      placeholder="Company Name"
    />

    <input
      type="text"
      value={position}
      onChange={(e) => setPosition(e.target.value)}
      placeholder="Job Position"
    />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Rejected">Rejected</option>
    </select>

    <button
  type="button"
  className="save-btn"
  onClick={handleUpdate}
>
  Save Changes
</button>

<button
  type="button"
  className="cancel-btn"
  onClick={() => setEditingJob(null)}
>
  Cancel
</button>

  </div>
)}

      {!loading && !error && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>COMPANY</th>
                <th>POSITION</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
                
              </tr>
            </thead>

            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <tr key={job.id || index}>
                    <td>
                      <strong className="company-name">
                        {job.company}
                      </strong>
                    </td>

                    <td>{job.position}</td>

                    <td>
                      <span
                        className={`status-badge ${job.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td>{job.date || "—"}</td>

                    <td>
  <button className="delete-btn"
  onClick={()=>handleDelete(job._id)}>
    Delete
  </button>

  
  
  <button
  className="edit-btn"
  onClick={() => {
    setEditingJob(job);
    setCompany(job.company);
    setPosition(job.position);
    setStatus(job.status);
  }}
>
  Edit
</button>

</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No applications yet. Add your first job application!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ApplicationsTable;
