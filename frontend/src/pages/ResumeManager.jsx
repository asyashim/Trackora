
import { useEffect, useState, useRef } from "react";
import {
  getResumes,
  uploadResume,
  deleteResume,
} from "../api/resumeApi";
import "./ResumeManager.css";

const ResumeManager = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Upload form states
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
const [selectedResumeId, setSelectedResumeId] = useState(null);
const [toast, setToast] = useState("");

  // Reference to file input
  const fileInputRef = useRef(null);

  // Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data.resumes);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // Upload resume
 const handleUpload = async (e) => {
  e.preventDefault();

  if (!file) {
    setToast("Please select a resume file.");

    setTimeout(() => {
      setToast("");
    }, 3000);

    return;
  }

  const formData = new FormData();

  formData.append("name", name);
  formData.append("position", position);
  formData.append("resume", file);

  try {
    setUploading(true);

    await uploadResume(formData);

    setName("");
    setPosition("");
    setFile(null);

    fileInputRef.current.value = "";

    const data = await getResumes();
    setResumes(data.resumes);

    setToast("Resume uploaded successfully!");

    setTimeout(() => {
      setToast("");
    }, 3000);

  } catch (error) {
    setToast(error.message || "Failed to upload resume.");

    setTimeout(() => {
      setToast("");
    }, 3000);

  } finally {
    setUploading(false);
  }
};

    
     

 const handleDelete = (id) => {
  setSelectedResumeId(id);
  setShowConfirm(true);
};

const confirmDelete = async () => {
  try {
    await deleteResume(selectedResumeId);

    setResumes((prevResumes) =>
      prevResumes.filter(
        (resume) => resume._id !== selectedResumeId
      )
    );

    setShowConfirm(false);
    setSelectedResumeId(null);
    setToast("Resume deleted successfully!");

    setTimeout(() => {
      setToast("");
    }, 3000);
  } catch (error) {
    setShowConfirm(false);
    setToast("Failed to delete resume.");

    setTimeout(() => {
      setToast("");
    }, 3000);
  }
};

 

  return (
    <div className="resume-manager">

      {/* Page Header */}
      <div className="resume-header">
        <div>
          <h1>Resume Manager</h1>
          <p>Manage all your resumes in one place.</p>
        </div>
      </div>

      {/* Upload Form */}
      <form
        className="resume-upload-form"
        onSubmit={handleUpload}
      >
        <h2>Upload New Resume</h2>

        <div>
          <label>Resume Name</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer Resume"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Target Position</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Select Resume</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>

      {/* Resume List */}
      <div className="resume-section">
        <h2>My Resumes</h2>

        {loading ? (
          <p>Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <p>No resumes uploaded yet.</p>
        ) : (
          <div className="resume-list">
            {resumes.map((resume) => (
              <div className="resume-card" key={resume._id}>
                <h3>{resume.name}</h3>

                <p>Position: {resume.position}</p>

                <p>File: {resume.originalName}</p>

                <p>Type: {resume.fileType.toUpperCase()}</p>

                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>

                <button
  type="button"
  onClick={() => handleDelete(resume._id)}
>
  Delete Resume
</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Success / Error Toast */}
{toast && (
  <div className={`toast-message ${toast.includes("successfully") ? "success" : "error"}`}>
    {toast}
  </div>
)}

{/* Delete Confirmation Popup */}
{showConfirm && (
  <div className="modal-overlay">
    <div className="confirm-modal">
      <h2>Delete Resume?</h2>
      <p>Are you sure you want to delete this resume? This action cannot be undone.</p>

      <div className="modal-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            setShowConfirm(false);
            setSelectedResumeId(null);
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          className="confirm-delete-btn"
          onClick={confirmDelete}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ResumeManager;
