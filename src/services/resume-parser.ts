// Resume Parser Service
// This service provides structured resume data to complement LinkedIn API data

import { LinkedInExperience, LinkedInEducation, LinkedInSkill, LinkedInProject } from './linkedin';

export interface ResumeData {
  experiences: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: LinkedInSkill[];
  projects: LinkedInProject[];
  summary: string;
}

class ResumeParser {
  // Parse resume data from PDF (for now, using structured data)
  async parseResume(): Promise<ResumeData> {
    // Real data for Xinyue (Shirley) Zhang
    const experiences: LinkedInExperience[] = [
      {
        id: 'exp-1',
        title: 'Software Engineer Intern',
        companyName: 'PwC',
        location: 'Chicago, Illinois, United States (Hybrid)',
        startDate: '2025-06-15',
        endDate: null,
        description: 'Contributed front-end development Multi-agent AI testing for internal tool.',
        achievements: [
          'Actively contribute to PwC’s internal AI initiatives by conducting prompt engineering, curating ground truth data, and evaluating model outputs to assess the performance of next-generation AI systems.',
          'Support the front-end development team by learning and contributing in React.js and JavaScript, helping resolve UI bugs and ensure platform stability.',
          'Assist with testing and implementation for an upcoming product release, contributing to feature verification and functionality improvements across the platform.'
        ]
      },
      {
        id: 'exp-2',
        title: 'Data Analyst Intern (ML & Data Engineering Focus)',
        companyName: 'Tesla',
        location: 'Palo Alto, California, United States',
        startDate: '2025-03-01',
        endDate: '2025-06-01',
        description: 'Worked on cross-functional data analysis tickets and machine learning pipeline implementation for the Model 3 fleet.',
        achievements: [
          'Resolved 15+ cross-functional data tickets and collaborated with firmware, chassis, and thermal teams.',
          'Developed and deployed a machine learning model to predict brake system deterioration, integrating it into a production pipeline.',
          'Led a time-series ML project to detect regressional differences across car populations, accelerating root cause investigations.'
        ]
      },
      {
        id: 'exp-3',
        title: 'Undergraduate Researcher',
        companyName: 'Delta Lab, Northwestern University',
        location: 'Evanston, Illinois, United States',
        startDate: '2023-12-01',
        endDate: '2025-06-01',
        description: 'Co-led research and system development for Differ, a Human-AI experience design platform.',
        achievements: [
          'Second author on submitted publication.',
          'Built core system components using Python and Pandas; analyzed locational datasets and integrated industry feedback.',
          'Conducted and synthesized interviews with 10+ participants, iterating on system functionality and paper positioning.'
        ]
      },
      {
        id: 'exp-4',
        title: 'Research Assistant (Undergraduate Research Assistant Program)',
        companyName: 'IMEC Lab, Northwestern University',
        location: 'Evanston, Illinois, United States',
        startDate: '2023-11-01',
        endDate: '2024-06-01',
        description: 'Designed autonomous convertible quadcopter drones and implemented multi-camera motion trackers.',
        achievements: [
          'Designed drones with sprawling capabilities.',
          'Implemented multi-camera motion trackers using open-source libraries.'
        ]
      },
      {
        id: 'exp-5',
        title: 'Teaching Assistant (Fundamentals of Computer Programming I)',
        companyName: 'ECE Department, Northwestern University',
        location: 'Evanston, Illinois, United States',
        startDate: '2023-09-01',
        endDate: '2023-12-31',
        description: 'Helped students with no prior programming experience grasp the fundamentals of Computer Science.',
        achievements: [
          'Hosted office hours and led coding exercises and discussions.',
          'Managed a cohort of 10 students, providing personalized support.'
        ]
      },
      {
        id: 'exp-6',
        title: 'Software Team Lead',
        companyName: 'Northwestern Solar Car Team - NU Solar',
        location: 'Evanston, Illinois, United States',
        startDate: '2023-01-01',
        endDate: '2025-06-01',
        description: 'Led a team to develop and maintain vehicle software systems for real-time data collection and display.',
        achievements: [
          'Maintained end-to-end telemetry pipeline and cloud storage infrastructure.',
          'Developed UI display and managed AWS S3 backups.'
        ]
      }
    ];

    const education: LinkedInEducation[] = [
      {
        id: 'edu-1',
        schoolName: 'Stanford University',
        degree: 'Master of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2025-07-01',
        endDate: null,
        grade: '',
        activities: ''
      },
      {
        id: 'edu-2',
        schoolName: 'Northwestern University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2022-09-01',
        endDate: '2025-06-01',
        grade: '3.99',
        activities: 'NU Robotics (Social Chair, UROV Electrical Team), NU Solar (Software Team Lead), Typhoon Dance Troupe'
      }
    ];

    const skills: LinkedInSkill[] = [
      { id: 'skill-1', name: 'C++', endorsements: 20 },
      { id: 'skill-2', name: 'Python', endorsements: 30 },
      { id: 'skill-3', name: 'PySpark', endorsements: 10 },
      { id: 'skill-4', name: 'Pandas', endorsements: 15 },
      { id: 'skill-5', name: 'JavaScript', endorsements: 18 },
      { id: 'skill-6', name: 'React.js', endorsements: 12 },
      { id: 'skill-7', name: 'Quality Assurance', endorsements: 8 },
      { id: 'skill-8', name: 'Data Analysis', endorsements: 14 },
      { id: 'skill-9', name: 'Machine Learning', endorsements: 10 },
      { id: 'skill-10', name: 'SQL', endorsements: 10 }
    ];

    const projects: LinkedInProject[] = [
      {
        id: 'proj-1',
        name: 'Differ (Delta Lab, Northwestern University)',
        description: 'A human-centered platform bridging gaps between human concept expression and machine interpretation. Second author on publication.',
        url: '',
        startDate: '2023-12-01',
        endDate: '2025-06-01'
      },
      {
        id: 'proj-2',
        name: 'Tesla ML Pipeline',
        description: 'Developed and deployed a machine learning model to predict brake system deterioration for the global Model 3 fleet.',
        url: '',
        startDate: '2025-03-01',
        endDate: '2025-06-01'
      },
      {
        id: 'proj-3',
        name: 'NU Solar Telemetry System',
        description: 'Led development of real-time data collection, display, and cloud storage for Northwestern’s solar car team.',
        url: '',
        startDate: '2023-01-01',
        endDate: '2025-06-01'
      }
    ];

    const summary = `I’m an incoming MSCS student at Stanford University and a recent graduate from Northwestern University, where I earned my B.S. in Computer Science, graduating summa cum laude. I’m passionate about building solutions that are impactful, creative, and fun, especially at the intersection of human experience and intelligent systems.\n\nI have experience with Python, C++, and JavaScript, and have worked on end-to-end data systems using tools like Pandas, Apache Spark, and Airflow to transform raw data into actionable dashboards. I am open to work and open to learn anything I can get my hands on!`;

    return {
      experiences,
      education,
      skills,
      projects,
      summary
    };
  }

  // Get resume PDF URL
  getResumeUrl(): string {
    return '/Xinyue_Zhang_Resume.pdf';
  }
}

export const resumeParser = new ResumeParser(); 