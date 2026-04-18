import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, PERSONAL_PROJECTS } from './project-data';
import { Project, PersonalProject } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  // Tabs State
  activeTab: 'academic' | 'personal' = 'academic';
  
  // Academic State
  projects: Project[] = PROJECTS;
  filteredProjects: Project[] = PROJECTS;
  searchQuery: string = '';
  selectedLanguage: string = 'All';
  availableLanguages: string[] = ['All'];
  expandedDescriptions: { [key: string]: boolean } = {};

  // Personal State
  personalProjects: PersonalProject[] = PERSONAL_PROJECTS;
  selectedPersonalProject: PersonalProject | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Parse query params to set initial tab
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'personal' || params['tab'] === 'academic') {
        this.activeTab = params['tab'];
      }
      
      // Load specific personal project if requested
      if (params['project']) {
        const found = this.personalProjects.find(p => p.id === params['project']);
        if (found) {
          this.selectedPersonalProject = found;
          setTimeout(() => window.scrollTo(0, 0), 100);
        }
      }
    });
    const languages = new Set<string>();
    this.projects.forEach(p => {
      if (p.languages) {
        p.languages.forEach(l => languages.add(l));
      }
    });
    this.availableLanguages = ['All', ...Array.from(languages).sort()];
  }

  /* ====== Tab Logic ====== */
  switchTab(tab: 'academic' | 'personal'): void {
    this.activeTab = tab;
    // Reset selections on tab switch
    if (tab === 'personal') {
      this.selectedPersonalProject = null;
    }
  }

  /* ====== Personal Projects Logic ====== */
  selectPersonalProject(project: PersonalProject | null): void {
    this.selectedPersonalProject = project;
    // Scroll to top when opening a sub-page
    if (project) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* ====== Academic Projects Logic ====== */
  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesLang = this.selectedLanguage === 'All' || (project.languages && project.languages.includes(this.selectedLanguage));
      return matchesSearch && matchesLang;
    });
  }

  onSearchChange(): void {
    this.filterProjects();
  }

  onLanguageSelect(lang: string): void {
    this.selectedLanguage = lang;
    this.filterProjects();
  }

  getLanguageIconClass(language: string): string {
    const icons: { [key: string]: string } = {
      'JavaScript': 'devicon-javascript-plain',
      'HTML': 'devicon-html5-plain',
      'CSS': 'devicon-css3-plain',
      'Java': 'devicon-java-plain',
      'JavaFX': 'devicon-java-plain',
      'Spring': 'devicon-spring-plain',
      'TypeScript': 'devicon-typescript-plain',
      'Angular': 'devicon-angularjs-plain',
      'Python': 'devicon-python-plain',
      'C++': 'devicon-cplusplus-plain',
      'C': 'devicon-c-plain',
      'SQL': 'devicon-mysql-plain',
      'NoSQL': 'devicon-mongodb-plain',
      'Node.js': 'devicon-nodejs-plain',
      'Flutter': 'devicon-flutter-plain',
      'PostgreSQL': 'devicon-postgresql-plain',
      'Research': 'fas fa-microscope',
      'Experiment': 'fas fa-flask'
    };
    return icons[language] || 'devicon-devicon-plain';
  }

  toggleDescription(event: Event, project: Project): void {
    event.preventDefault();
    this.expandedDescriptions[project.title] = !this.expandedDescriptions[project.title];
  }

  isDescriptionExpanded(project: Project): boolean {
    return this.expandedDescriptions[project.title];
  }
}
