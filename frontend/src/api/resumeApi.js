
import { apiRequest } from "./apiClient";

// Get all resumes
export const getResumes = async () => {
  return await apiRequest("/resumes");
};

// Upload a resume
export const uploadResume = async (formData) => {
  return await apiRequest("/resumes/upload", {
    method: "POST",
    body: formData,
  });
};

// Delete a resume
export const deleteResume = async (id) => {
  return await apiRequest(`/resumes/${id}`, {
    method: "DELETE",
  });
};
