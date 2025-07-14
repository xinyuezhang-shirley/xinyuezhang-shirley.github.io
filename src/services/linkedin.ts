// Resume Data Service
// This service provides profile information from resume data only

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  profilePicture: string;
  publicProfileUrl: string;
  connections: number;
  industry: string;
  email?: string;
}

export interface LinkedInExperience {
  id: string;
  title: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
}

export interface LinkedInEducation {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  activities?: string;
}

export interface LinkedInSkill {
  id: string;
  name: string;
  endorsements: number;
}

export interface LinkedInProject {
  id: string;
  name: string;
  description: string;
  url?: string;
  startDate: string;
  endDate?: string;
}

class ResumeAPI {
  // Return profile data from resume
  async getProfile(): Promise<LinkedInProfile> {
    return {
      id: 'shirley-zhang',
      firstName: 'Xinyue',
      lastName: 'Zhang',
      headline: 'MS in Computer Science at Stanford University | Ex Tesla | Ex PwC',
      summary: 'Passionate software engineer with experience in full-stack development, specializing in React, TypeScript, and modern web technologies. I enjoy creating user-centric applications and solving complex technical challenges.',
      location: 'San Francisco Bay Area, CA',
      profilePicture: 'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=SZ',
      publicProfileUrl: 'https://www.linkedin.com/in/xinyue-zhang-2292b225b/',
      connections: 0,
      industry: '',
      email: 'xinyuezhang.shirley@gmail.com',
    };
  }

  // These methods will be handled by the resume parser
  async getExperience() { return []; }
  async getEducation() { return []; }
  async getSkills() { return []; }
  async getProjects() { return []; }
}

export const linkedinAPI = new ResumeAPI(); 