import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Professor from './src/models/professor.model.js';
import Admin from './src/models/admin.model.js';
import Blog from './src/models/blog.model.js';
import Publication from './src/models/publication.model.js';

dotenv.config();

const professorData = {
  name: "Dr. Ambairam Muthu Sivakrishna",
  title: "Dr.",
  designation: "Assistant Professor",
  department: "School of Advanced Computing",
  institution: "Alliance University, Bengaluru",
  address: "4A, Indira Nagar, Judge Road, Kannakurichi, Salem-636008, Tamil Nadu, India",
  phone: "+91-9791541949",
  email: "amskrishna240@gmail.com",
  orcid: "0000-0002-0984-9890",
  profileImage: "",
  bio: "Dr. Ambairam Muthu Sivakrishna is an Assistant Professor at the School of Advanced Computing, Alliance University, Bengaluru. He received his Ph.D. in Computer Science & Engineering from the National Institute of Technology Tiruchirappalli (NIT Trichy), M.Tech in Software Engineering from IIIT Tiruchirappalli, and B.Tech in Information Technology from MITS Madanapalle (JNTU Anantapur). His research focuses on Confidential Computing, Trustworthy AI, Insider Threat Detection, and Quantum-Inspired Learning Models. He is a Gold Medalist in both M.Tech and B.Tech, a GATE and UGC-NET qualified researcher, and an active reviewer for top-tier journals and conferences.",

  researchInterests: [
    "Confidential Computing",
    "Trustworthy AI",
    "Theoretical Analysis of Neural Networks",
    "Robust and Causality-Driven AI",
    "Formal Specification and Verification of AI",
    "Neuro-Symbolic & Quantum-Inspired Learning Models"
  ],

  education: [
    { program: "Ph.D. (Computer Science & Engg.)", institution: "National Institute of Technology Tiruchirappalli", score: "9.5 CGPA", year: "Mar. 2026" },
    { program: "M.Tech. (Software Engg.)", institution: "Indian Institute of Information Technology Tiruchirappalli", score: "9.24 CGPA", year: "2017" },
    { program: "B.Tech. (Information Technology)", institution: "MITS Madanapalle (JNTU Anantapur)", score: "79.92%", year: "2015" },
    { program: "XII (MPC)", institution: "Narayana Junior College", score: "93.8%", year: "2008" },
    { program: "X", institution: "Royal English Medium High School", score: "89.16%", year: "2006" }
  ],

  experience: [
    {
      role: "Assistant Professor",
      department: "School of Advanced Computing",
      period: "June 2026 – Present",
      institution: "Alliance University, Bengaluru",
      courses: ["Cryptography and Network Security", "Applied Artificial Intelligence", "Information Retrieval", "Software Engineering"]
    },
    {
      role: "HTRA-MHRD",
      department: "Department of Computer Science & Engineering",
      period: "2022 – 2025",
      institution: "National Institute of Technology Tiruchirappalli",
      courses: ["Artificial Intelligence", "Software Engineering", "Software Project Management"]
    },
    {
      role: "Temporary Faculty",
      department: "Department of Computer Science & Engineering",
      period: "2017 – 2019",
      institution: "Indian Institute of Information Technology Tiruchirappalli",
      courses: ["Programming with C", "Software Engineering", "Software Project Management", "Randomized Algorithms", "Cloud Computing"]
    }
  ],

  theses: [
    {
      degree: "Ph.D.",
      period: "2020 – 2026",
      title: "Confidential Computing",
      description: "Insider Threat Detection Through Multi-Granular Behavioral Analysis: A Comprehensive Neural Network Approach."
    },
    {
      degree: "M.Tech.",
      period: "2017 – 2019",
      title: "Software Engineering",
      description: "Designed a framework for refining metamorphic relations to enhance reliability and fault detection in software testing."
    },
    {
      degree: "B.Tech.",
      period: "2011 – 2015",
      title: "Android Application",
      description: "Developed an android application for Govt. of Andhra Pradesh to monitor health of pregnant women."
    }
  ],

  journalPublications: [
    {
      id: "J1",
      title: "An Adaptive Insider Threat Detection Framework Using Causal Analysis and Liquid Neural Networks",
      journal: "Security and Privacy, 9(1)",
      year: "2026",
      doi: "10.1002/spy2.70157",
      indexing: "ESCI",
      impactFactor: "2.1",
      quartile: "Q2"
    },
    {
      id: "J2",
      title: "An Efficient Insider Threat Detection Framework Using Bayesian-Optimized XGBoost",
      journal: "Security and Privacy, 8(6)",
      year: "2025",
      doi: "10.1002/spy2.70122",
      indexing: "ESCI",
      impactFactor: "2.1",
      quartile: "Q2"
    },
    {
      id: "J3",
      title: "Cyber Insights: Exploring Image-Based and Vector-Based Feature Representations in Insider Threat Detection",
      journal: "International Journal of Data Science and Analytics, Vol. 21",
      year: "2025",
      doi: "10.1007/s41060-025-00960-3",
      indexing: "ESCI & Scopus",
      impactFactor: "2.8",
      quartile: "Q2"
    },
    {
      id: "J4",
      title: "An Efficient Pattern-Based Approach for Insider Threat Classification Using Image-Based Feature Representation",
      journal: "Journal of Information Security and Applications, 73, 103434",
      year: "2023",
      doi: "10.1016/j.jisa.2023.103434",
      indexing: "SCIE",
      impactFactor: "3.7",
      quartile: "Q1"
    }
  ],

  underReview: {
    total: 6,
    underRevision: 2,
    underReview: 4,
    description: "6 manuscripts currently in the review pipeline at SCIE-indexed journals (Q1/Q2). 2 manuscripts under revision and 4 manuscripts under review/submission in SCIE-indexed journals."
  },

  conferencePublications: [
    {
      id: "C1",
      title: "QUANT-IT: Quantum Embeddings with NGBoost for Insider Threat Detection",
      conference: "9th IEEE International Conference on Information and Communication Technology (CICT 2025 - IIITDM Kancheepuram)",
      role: "First & Corresponding author",
      status: "Published"
    },
    {
      id: "C2",
      title: "Temporal Quantum Neural Networks for Insider Threat Detection",
      conference: "6th International Conference on Recent Advances in Information Technology (RAIT 2025 - IIT Dhanbad)",
      role: "First & Corresponding author",
      status: "Published"
    },
    {
      id: "C3",
      title: "Insider Threat Detection on CERT Data Using Pre-trained ResNet",
      conference: "2nd Global Conference on Information Technologies and Communications (GCITC 2024 - REVA University)",
      role: "Second author",
      status: "Published"
    },
    {
      id: "C4",
      title: "AUBIT: An Adaptive User Behaviour Based Insider Threat Detection Technique Using LSTM-Autoencoder",
      conference: "International Conference on Recent Trends in Information Technology and Applications (ICRTITA 2022 - VelTech University)",
      role: "First & Corresponding author",
      status: "Published"
    }
  ],

  professionalService: [
    { role: "Reviewer", venue: "Engineering Applications of Artificial Intelligence", details: "Elsevier, SCIE, Q1, Impact Factor: 8.0" },
    { role: "Reviewer", venue: "BioData Mining", details: "Springer Nature, SCIE, Q1, Impact Factor: 6.1" },
    { role: "Reviewer", venue: "Scientific Reports", details: "Springer Nature, SCIE, Q1, Impact Factor: 3.9" },
    { role: "Reviewer", venue: "Multimedia Tools and Applications", details: "Springer Nature, Scopus-indexed" },
    { role: "Reviewer", venue: "RECCAP 2026", details: "International Conference, IIT Palakkad" },
    { role: "Reviewer", venue: "CICT 2025", details: "International Conference, IIITDM Kancheepuram" },
    { role: "Technical Committee Member & Reviewer", venue: "SPELL 2025", details: "International Conference, IIIT Kottayam" },
    { role: "Reviewer", venue: "ICETCS 2024", details: "IEEE Bangalore Section" }
  ],

  professionalMembership: [
    { organization: "IEEE", id: "98196084", details: "Society Memberships: PAMI, Quantum Technical Community, Security & Privacy, Software Engineering" },
    { organization: "ACM", id: "3333784", details: "Association for Computing Machinery" },
    { organization: "CSI", id: "7111250006", details: "Computer Society of India" }
  ],

  technicalSkills: [
    { category: "Programming", skills: ["C", "C++", "Java", "Python"] },
    { category: "ML & Deep Learning", skills: ["DoWhy", "PennyLane", "PyTorch", "Scikit-learn", "TensorFlow"] },
    { category: "Cybersecurity", skills: ["Anomaly Detection", "Insider Threat Analytics"] },
    { category: "Tools", skills: ["Anaconda", "Git", "Jupyter", "LaTeX"] },
    { category: "Platforms", skills: ["Linux", "Windows"] }
  ],

  workshops: [
    { title: "QT-09 Engineering Foundations of Quantum Technologies", organizer: "Electronics & ICT Academies, MNIT Jaipur / IIT Kanpur / IIT Roorkee / IIT Guwahati / IIITDM Jabalpur", period: "April–May 2026", role: "Participant", details: "44-hour Online FDP, funded by MeitY, endorsed by AICTE / NQM / UGC. Performance: Excellent" },
    { title: "Application of AI, ML and Blockchain for FinTECH Cyber Security", organizer: "IIT Ropar", period: "March 2026", role: "Participant", details: "Online FUP" },
    { title: "Generative AI", organizer: "IBM SkillsBuild", period: "December 2025", role: "Participant", details: "Online FDP" },
    { title: "Quantum Computing with Machine Learning & AI", organizer: "IIT Madras", period: "April 2025", role: "Participant", details: "Five-day Online FDP" },
    { title: "ML & DL Demystified: A Hands-on, Theory-Driven Workshop", organizer: "NIT Tiruchirappalli", period: "April 2024", role: "Organizer & Resource Person", details: "Five-day Online FDP" },
    { title: "Deep Learning Algorithms and its Implementation", organizer: "SRM Institute of Science & Technology", period: "December 2023", role: "Resource Person", details: "Winter Seminar Series" },
    { title: "Deep Learning Principles and its Applications for DRDO Scientists", organizer: "NIT Tiruchirappalli", period: "December 2022", role: "Organizer & Resource Person", details: "Five-day Online Workshop" },
    { title: "Bio-inspired Optimization Algorithms using MATLAB", organizer: "IEEE & IEEE Computer Society, NIT Tiruchirappalli", period: "January 2022", role: "Participant", details: "Workshop" },
    { title: "Detecting Deceit Information from Brain Activity", organizer: "IEEE & IEEE Computer Society, NIT Tiruchirappalli", period: "June 2021", role: "Participant", details: "Workshop" }
  ],

  administrativeActivities: [
    { role: "Department Library In-Charge", institution: "Sona College of Technology", description: "Management of departmental library operations and resource organization." },
    { role: "UG Dissertation Supervisor", institution: "IIIT Tiruchirappalli", description: "Guided three undergraduate dissertation projects in the Department of Computer Science." },
    { role: "CPWD Coordinator", institution: "IIIT Tiruchirappalli", description: "Assisted in coordinating activities related to campus construction." },
    { role: "Hostel Warden", institution: "IIIT Tiruchirappalli", description: "Oversaw hostel administration, student welfare, and residential discipline." },
    { role: "Faculty In-Charge (Sports & Photography Clubs)", institution: "IIIT Tiruchirappalli", description: "Coordinated institute sports activities, tournaments, team logistics, led event photography and maintained media archives." }
  ],

  awards: [
    { title: "Institute Gold Medal", description: "Academic performance in M.Tech (Software Engineering), IIIT Tiruchirappalli" },
    { title: "University Gold Medal", description: "Secured First Rank in B.Tech (Information Technology) from JNTU Anantapur" },
    { title: "Pratibha Award", description: "Conferred by the Government of Andhra Pradesh for academic excellence in B.Tech" },
    { title: "Best Paper Award", description: "ICRTITA 2022 — AUBIT: An Adaptive User Behaviour Based Insider Threat Detection Technique Using LSTM-Autoencoder" },
    { title: "GATE Qualified (2015)", description: "Computer Science & Information Technology" },
    { title: "UGC-NET Qualified", description: "Computer Science & Applications (2018 & 2020)" }
  ],

  informals: [
    { title: "Captain", description: "U.G and P.G Institute Volleyball Teams" },
    { title: "Silver Medalist (Volleyball)", description: "All India Inter-NIT Sports Meet held at NIT Warangal (2025)" },
    { title: "Two-time Bronze Medalist (Volleyball)", description: "Sportsfete Intramural Competition, NIT Tiruchirappalli (2023 & 2024)" },
    { title: "Participant (Volleyball)", description: "Inter Collegiate Games Meet, JNTU Anantapur (2014 & 2015)" }
  ],

  languages: ["English", "Telugu", "Tamil", "Hindi"]
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed professor data
    await Professor.deleteMany({});
    console.log('Cleared existing professor data');
    const doc = await Professor.create(professorData);
    console.log('✅ Seeded professor data. ID:', doc._id);

    // Seed admin user
    await Admin.deleteMany({});
    const passwordHash = await Admin.hashPassword('admin123');
    const admin = await Admin.create({
      username: 'admin',
      passwordHash
    });
    console.log('✅ Seeded admin user. Username: admin, Password: admin123');

    // Seed sample blog
    await Blog.deleteMany({});
    await Blog.create({
      title: 'Welcome to My Academic Portfolio',
      content: 'I am excited to launch my professional portfolio website. Here, you will find information about my research in Confidential Computing, Trustworthy AI, and Insider Threat Detection. I will be sharing insights from my ongoing research, publications, and academic activities through this blog. Stay tuned for updates on my latest work in Quantum-Inspired Learning Models and Neural Network Analysis.',
      excerpt: 'Welcome to my professional portfolio website. Stay tuned for updates on research in Confidential Computing, Trustworthy AI, and more.',
      author: 'Dr. Ambairam Muthu Sivakrishna',
      tags: ['Welcome', 'Research', 'Academic'],
      published: true
    });
    console.log('✅ Seeded sample blog post');

    // Seed publications from professor data into standalone collection
    await Publication.deleteMany({});
    const pubs = [];
    for (const j of professorData.journalPublications) {
      pubs.push({
        title: j.title,
        type: 'journal',
        venue: j.journal,
        year: j.year,
        doi: j.doi,
        indexing: j.indexing,
        impactFactor: j.impactFactor,
        quartile: j.quartile,
        status: 'Published',
        role: 'First & Corresponding author'
      });
    }
    for (const c of professorData.conferencePublications) {
      pubs.push({
        title: c.title,
        type: 'conference',
        venue: c.conference,
        year: c.conference.match(/\d{4}/)?.[0] || '',
        role: c.role,
        status: c.status
      });
    }
    await Publication.insertMany(pubs);
    console.log(`✅ Seeded ${pubs.length} publications`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
