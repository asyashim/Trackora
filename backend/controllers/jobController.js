
import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch job applications",
    });
  }
};

export const createJob = async(req,res)=>{
    try{
        const {company,position,status} =req.body;

        const newJob= await Job.create({
            company,
            position,
            status,
        })

        res.status(201).json({
            success:true,
            message:"Job application added successfully",
            job:newJob,
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to add job application",
        })

    }
}

export const deleteJob = async(req,res)=>{
    try{

        const {id} = req.params;

        const deletedJob= await Job.findById(id);

        if(!deletedJob){
            return res.status(400).json({
                success:false,
                message:"Job application not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Job application deleted successfully"
        })

    }catch(error){

        res.status(500).json({
            success:false,
            message:"Failed to delete job application"
        })

    }
}

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job application updated successfully",
      job: updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update job application",
    });
  }
};

