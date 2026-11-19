

import { deleteJob } from "../api/jobApi";

const ApplicationsTable = ({ jobs, loading, error, onJobDeleted }) => {

  const handleDelete = async (id) => {
  try {
    await deleteJob(id);

    onJobDeleted(id);

  } catch (error) {
    console.log(error.message);
  }
};
  return (
    <section className="applications-section">
      <div className="section-heading">
        <div>
          <h2>Recent Applications</h2>
          <p>Keep track of your latest job applications.</p>
        </div>

        <span className="application-count">
          {jobs.length} applications
        </span>
      </div>

      {loading && <p className="message">Loading applications...</p>}

      {error && <p className="error-message">{error}</p>}

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
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
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
