import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PROJECTS, PERSONAL_PROJECTS } from './project-data';
import { Project, PersonalProject } from './project.model';

/** Tags that describe the kind of work rather than a language. */
const TYPE_TAGS = ['Research', 'Experiment', 'Game'];

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  activeTab: 'academic' | 'personal' = 'personal';

  // Academic
  projects: Project[] = PROJECTS;
  filteredProjects: Project[] = PROJECTS;
  searchQuery = '';
  selectedType = 'All';
  selectedLanguage = 'All';
  availableTypes: string[] = ['All'];
  availableLanguages: string[] = ['All'];

  // Personal
  personalProjects: PersonalProject[] = PERSONAL_PROJECTS;
  selectedPersonalProject: PersonalProject | null = null;

  private paramsSub?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const types = new Set<string>();
    const languages = new Set<string>();
    this.projects.forEach(p => (p.languages || []).forEach(tag => (TYPE_TAGS.includes(tag) ? types : languages).add(tag)));
    this.availableTypes = ['All', ...Array.from(types).sort()];
    this.availableLanguages = ['All', ...Array.from(languages).sort()];

    // The URL is the source of truth for the tab and the open project, so Back and sharing work.
    this.paramsSub = this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] === 'academic' ? 'academic' : 'personal';
      const id = params['project'];
      this.selectedPersonalProject = id ? (this.personalProjects.find(p => p.id === id) ?? null) : null;
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  /* ====== Tabs ====== */
  switchTab(tab: 'academic' | 'personal'): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab, project: null },
      queryParamsHandling: 'merge'
    });
  }

  /* ====== Personal ====== */
  selectPersonalProject(project: PersonalProject | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: 'personal', project: project ? project.id : null },
      queryParamsHandling: 'merge'
    });
  }

  /* ====== Academic filters ====== */
  get hasActiveFilters(): boolean {
    return this.searchQuery.trim() !== '' || this.selectedType !== 'All' || this.selectedLanguage !== 'All';
  }

  filterProjects(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredProjects = this.projects.filter(project => {
      const tags = project.languages || [];
      const matchesSearch = !q || project.title.toLowerCase().includes(q) || project.description.toLowerCase().includes(q);
      const matchesType = this.selectedType === 'All' || tags.includes(this.selectedType);
      const matchesLang = this.selectedLanguage === 'All' || tags.includes(this.selectedLanguage);
      return matchesSearch && matchesType && matchesLang;
    });
  }

  onSearchChange(): void {
    this.filterProjects();
  }

  onTypeSelect(type: string): void {
    this.selectedType = type;
    this.filterProjects();
  }

  onLanguageSelect(lang: string): void {
    this.selectedLanguage = lang;
    this.filterProjects();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedType = 'All';
    this.selectedLanguage = 'All';
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
      'Next.js': 'devicon-nextjs-original',
      'React': 'devicon-react-original',
      'Tailwind CSS': 'devicon-tailwindcss-plain',
      'Framer Motion': 'fas fa-film',
      'D3': 'devicon-d3js-plain',
      'Nodemailer': 'fas fa-envelope',
      'Supabase': 'fas fa-database',
      'Research': 'fas fa-microscope',
      'Experiment': 'fas fa-flask',
      'Game': 'fas fa-gamepad'
    };
    return icons[language] || 'devicon-devicon-plain';
  }
}
