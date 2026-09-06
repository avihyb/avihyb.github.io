import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Timeline } from './timeline.model';
import { TIMELINE_DATA } from './timeline-data';

interface StackItem { name: string; icon: string; }
interface StackGroup { id: string; title: string; icon: string; items: StackItem[]; }

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy {
  timelineData: Timeline[] = TIMELINE_DATA;

  private paramsSub?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  currentTab: 'timeline' | 'stack' = 'timeline';

  stackGroups: StackGroup[] = [
    {
      id: 'stack-languages',
      title: 'Core Languages',
      icon: 'fas fa-code',
      items: [
        { name: 'TypeScript', icon: 'devicon-typescript-plain' },
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'Java', icon: 'devicon-java-plain' },
        { name: 'C++', icon: 'devicon-cplusplus-plain' },
        { name: 'SQL', icon: 'devicon-postgresql-plain' }
      ]
    },
    {
      id: 'stack-frameworks',
      title: 'Frameworks',
      icon: 'fas fa-layer-group',
      items: [
        { name: 'Angular', icon: 'devicon-angularjs-plain' },
        { name: 'Next.js', icon: 'devicon-nextjs-original' },
        { name: 'Flutter', icon: 'devicon-flutter-plain' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain' }
      ]
    },
    {
      id: 'stack-tools',
      title: 'AI & Design Tools',
      icon: 'fas fa-microchip',
      items: [
        { name: 'Claude Code', icon: 'fas fa-terminal' },
        { name: 'Cursor', icon: 'fas fa-mouse-pointer' },
        { name: 'Codex', icon: 'fas fa-code' },
        { name: 'Copilot', icon: 'fab fa-github' },
        { name: 'Figma', icon: 'devicon-figma-plain' },
        { name: 'n8n', icon: 'fas fa-project-diagram' }
      ]
    }
  ];

  ngOnInit(): void {
    // The URL is the source of truth for the tab, so the header menu and sharing work.
    this.paramsSub = this.route.queryParams.subscribe(params => {
      this.currentTab = params['tab'] === 'stack' ? 'stack' : 'timeline';
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  setTab(tab: 'timeline' | 'stack') {
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab }, queryParamsHandling: 'merge' });
  }
}
