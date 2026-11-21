
import Resume from "../models/resume.js";
import cloudinary from "../config/cloudinary.js";

const uploadResume = async (req, res) => {
  try {
    const { name, position } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    const fileType = req.file.mimetype === "application/pdf"
      ? "pdf"
      : "docx";

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "trackora/resumes",
          public_id: `${Date.now()}-${req.file.originalname}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const resume = await Resume.create({
      name,
      position,
      originalName: req.file.originalname,
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileType,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.log("RESUME UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};




const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.log("GET RESUMES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    // Delete resume from MongoDB
    await Resume.findByIdAndDelete(resume._id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.log("DELETE RESUME ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};


export { uploadResume ,getResumes , deleteResume };


