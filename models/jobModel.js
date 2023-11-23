import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  workType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
    required: [true, 'Work type is required'],
    default:'Full-time'
  },
  status: {
    type: String,
    enum: ['reject', 'interview', 'pending'],
    default: 'Pending',
  },
  workLocation: {
    type: String,
    default:'India',
    required: [true, 'Work location is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
