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
  /** Short label shown on the website pill, e.g. www.example.com */
  displayUrl?: string;
  /** True when projects.component.html has a bespoke section for this id */
  customLayout?: boolean;
  locked?: boolean;
}