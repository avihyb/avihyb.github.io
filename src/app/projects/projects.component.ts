// src/app/projects/projects.component.ts
import { Component, OnInit } from '@angular/core';
import { PROJECTS } from './project-data';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = PROJECTS;
  expandedDescriptions: { [key: string]: boolean } = {};

  constructor() {}

  ngOnInit(): void {}

  getLanguageIconClass(language: string): string {
    const icons: { [key: string]: string } = {
      'JavaScript': 'devicon-javascript-plain',
      'HTML': 'devicon-html5-plain',
      'CSS': 'devicon-css3-plain',
      'Java': 'devicon-java-plain',
      'Spring': 'devicon-spring-plain',
      'TypeScript': 'devicon-typescript-plain',
      'Angular': 'devicon-angularjs-plain',
      'Python': 'devicon-python-plain',
      'C++': 'devicon-cplusplus-plain',
      'C': 'devicon-c-plain',
      'SQL': 'devicon-mysql-plain',
      'NoSQL': 'devicon-mongodb-plain',
      'Node.js': 'devicon-nodejs-plain',
      
      // Add more languages and their corresponding Devicon classes as needed
    };
    return icons[language] || 'devicon-devicon-plain'; // Default icon
  }

  toggleDescription(event: Event, project: Project): void {
    event.preventDefault();
    this.expandedDescriptions[project.title] = !this.expandedDescriptions[project.title];
  }

  isDescriptionExpanded(project: Project): boolean {
    return this.expandedDescriptions[project.title];
  }
}
