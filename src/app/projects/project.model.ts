export interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  languages: string[];
}

export interface PersonalProject {
  id: string;
  title: string;
  shortDescription: string;
  logo: string;
  image: string;
  technologies: string[];
  inspiration: string;
  goals: string;
  detailedDescription: string;
  architecture: string;
  technicalDetails?: string;
  mockupType?: 'mobile' | 'desktop';
  sourceCodeUrl: string;
  liveDemoUrl: string;
  locked?: boolean;
}