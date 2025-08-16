import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    enum: ['senior-ml-engineer', 'ai-researcher', 'data-instructor', 'backend-dev', 'frontend-dev', 'other'],
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior'],
  },
  resumeFilename: {
    type: String,
    required: true,
  },
  resumePath: {
    type: String,
    required: true,
  },
  resumeOriginalName: {
    type: String,
    required: true,
  },
  resumeSize: {
    type: Number,
    required: true,
  },
  resumeMimeType: {
    type: String,
    required: true,
  },
  portfolioUrl: {
    type: String,
    trim: true,
  },
  coverLetter: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'],
    default: 'pending',
  },
  metadata: {
    ip: String,
    userAgent: String,
    referrer: String,
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
CareerSchema.index({ email: 1 });
CareerSchema.index({ position: 1 });
CareerSchema.index({ status: 1 });
CareerSchema.index({ createdAt: -1 });

// Virtual for full name
CareerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
CareerSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
