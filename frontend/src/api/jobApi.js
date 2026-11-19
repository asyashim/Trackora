import { apiRequest } from "./apiClient";

export const getJobs = async () => {
  return await apiRequest("/jobs");
};

export const createJob = async (jobData) => {
  return await apiRequest("/jobs", {
    method: "POST",
    body: JSON.stringify(jobData),
  });
};

export const deleteJob = async (id) => {
  return await apiRequest(`/jobs/${id}`, {
    method: "DELETE",
  });
};