import Job from '../models/jobModel.js';

// Create a new job
export const createJob = async (req, res, next) => {
    
  try {
    const { company, position, workType, status, workLocation } = req.body;
    if(!company ||!position){
        res.status(400).send({
            message:"field should not be empty"
        })
    }
    const createdBy = req.user.userId;

    const job = await Job.create({
      company,
      position,
      workType,
      status,
      workLocation,
      createdBy,
    });

    res.status(201).json({
      status: true,
      message: 'Job created successfully',
      job,
    });
  } catch (err) {
    next(err);
  }
};

// Get all jobs with total count
export const getJobs = async (req, res, next) => {
    try {
      const jobs = await Job.find().populate('createdBy', '_id name email -password');
  
      const totalJobs = await Job.countDocuments();
  
      res.status(200).json({
        status: true,
        totalJobs,
        jobs,
      });
    } catch (err) {
      next(err);
    }
  };
  

// Get a specific job by ID
export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId).populate('createdBy', 'name email ');

    if (!job) {
      return res.status(404).json({
        status: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      status: true,
      job,
    });
  } catch (err) {
    next(err);
  }
};

// Update a job
export const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const { company, position, workType, status, workLocation } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        status: false,
        message: 'Job not found',
      });
    }

    // Check if the user updating the job is the creator
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        status: false,
        message: 'You are not authorized to update this job',
      });
    }

    // Update job fields
    job.company = company || job.company;
    job.position = position || job.position;
    job.workType = workType || job.workType;
    job.status = status || job.status;
    job.workLocation = workLocation || job.workLocation;

    await job.save();
    res.status(200).json({
      status: true,
      message: 'Job updated successfully',
      job,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
    try {
      const jobId = req.params.jobId;
  
      // Check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ status: false, message: 'Job not found' });
      }
  
      // Delete the job
      await Job.findByIdAndDelete(jobId);
  
      res.status(200).json({ status: true, message: 'Job deleted successfully' });
    } catch (err) {
      next(err);
    }
  };


  
export const jobStatsController = async (req, res) => {
    try {
     
      const stats = await Job.aggregate([
        // search by user jobs
    
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(req.user.userId),
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({
        message: "Fetched successfully",
        totalJobs: stats.length,
        stats,
      });
    } catch (err) {
     next(err)
    }
  };
