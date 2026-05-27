import mongoose from 'mongoose';

const professorSchema = new mongoose.Schema({
  name: String,
  title: String,
  designation: String,
  department: String,
  institution: String,
  address: String,
  phone: String,
  email: String,
  orcid: String,
  profileImage: String,
  bio: String,
  researchInterests: [String],

  education: [{
    program: String,
    institution: String,
    score: String,
    year: String
  }],

  experience: [{
    role: String,
    department: String,
    period: String,
    institution: String,
    courses: [String]
  }],

  theses: [{
    degree: String,
    period: String,
    title: String,
    description: String
  }],

  journalPublications: [{
    id: String,
    title: String,
    journal: String,
    year: String,
    doi: String,
    indexing: String,
    impactFactor: String,
    quartile: String
  }],

  underReview: {
    total: Number,
    underRevision: Number,
    underReview: Number,
    description: String
  },

  conferencePublications: [{
    id: String,
    title: String,
    conference: String,
    role: String,
    status: String
  }],

  professionalService: [{
    role: String,
    venue: String,
    details: String
  }],

  professionalMembership: [{
    organization: String,
    id: String,
    details: String
  }],

  technicalSkills: [{
    category: String,
    skills: [String]
  }],

  workshops: [{
    title: String,
    organizer: String,
    period: String,
    role: String,
    details: String
  }],

  administrativeActivities: [{
    role: String,
    institution: String,
    description: String
  }],

  awards: [{
    title: String,
    description: String
  }],

  informals: [{
    title: String,
    description: String
  }],

  languages: [String]
}, { timestamps: true });

export default mongoose.model('Professor', professorSchema);
