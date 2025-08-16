import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: [true, 'Form type is required'],
    enum: ['ScheduleCall', 'JoinProjects', 'Recommendation', 'EnterpriseSolutions', 'EnterpriseDemo']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  experienceLevel: {
    type: String,
    required: false,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: ''
  },
  interests: [{
    type: String,
    trim: true
  }],
  goal: {
    type: String,
    trim: true,
    default: ''
  },
  availability: {
    type: String,
    trim: true,
    default: ''
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  preferredTime: {
    type: String,
    trim: true,
    default: ''
  },
  metadata: {
    ip: String,
    referrer: String,
    userAgent: String,
    submittedAt: String
  }
}, {
  timestamps: true
});

// Create indexes for performance
leadSchema.index({ email: 1 });
leadSchema.index({ formType: 1 });
leadSchema.index({ createdAt: -1 });

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;
