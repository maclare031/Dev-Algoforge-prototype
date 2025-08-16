import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  subtitle: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  longDescription: {
    type: String
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  mode: {
    type: String,
    enum: ['Online', 'Hybrid', 'Weekend', 'Evening', 'Executive', 'Weekend Executive', 'Hybrid Executive', 'Executive Online'],
  },
  students: {
    type: String
  },
  rating: {
    type: Number
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate', 'Intermediate to Advanced', 'All Levels', 'Executive Level', 'Senior Management', 'Management Level']
  },
  skills: {
    type: [String],
    default: []
  },
  price: {
    type: String
  },
  originalPrice: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    enum: ['students', 'professionals', 'corporates'],
    required: [true, 'Category is required']
  },
  courseCategory: {
    type: String,
    enum: [
      'Data Science',
      'Machine Learning', 
      'Generative AI (Gen AI)',
      'Data Analytics & Business Intelligence'
    ]
  },  
  instructor: {
    type: String
  },
  lessons: {
    type: Number
  },
  projects: {
    type: Number
  },
  certificate: {
    type: Boolean,
    default: false
  },
  language: {
    type: String
  },
  prerequisites: {
    type: String
  },
  curriculum: [{
    _id: false,
    module: String,
    lessons: Number,
    duration: String,
    description: String
  }],
  syllabus: {
    type: [{
      module: {
        type: String,
        required: [true, 'Syllabus module title is required']
      },
      topics: {
        type: [String],
        default: []
      }
    }],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  iconName: {
    type: String,
    default: 'Code'
  },
}, {
  timestamps: true
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
