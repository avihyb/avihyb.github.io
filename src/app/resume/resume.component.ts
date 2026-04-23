import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Timeline } from './timeline.model';
import { TIMELINE_DATA } from './timeline-data';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  timelineData: Timeline[] = TIMELINE_DATA;

  currentTab: 'timeline' | 'stack' = 'timeline';

  stackData = {
    languages: [
      { name: 'TypeScript', icon: 'fab fa-js' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'C++', icon: 'fas fa-code' },
      { name: 'SQL', icon: 'fas fa-database' }
    ],
    frameworks: [
      { name: 'Angular', icon: 'fab fa-angular' },
      { name: 'Flutter', icon: 'fas fa-mobile-alt' },
      { name: 'Node.js', icon: 'fab fa-node-js' }
    ],
    tools: [
      { name: 'Cursor IDE', icon: 'fas fa-magic' },
      { name: 'Claude', icon: 'fas fa-brain' },
      { name: 'ChatGPT', icon: 'fas fa-robot' },
      { name: 'Figma', icon: 'fab fa-figma' },
      { name: 'v0.dev', icon: 'fas fa-laptop-code' }
    ]
  };

  @ViewChildren('timelineNode') timelineNodes!: QueryList<ElementRef>;

  setTab(tab: 'timeline' | 'stack') {
    this.currentTab = tab;
  }

  jumpToToday() {
    if (this.timelineNodes && this.timelineNodes.length > 0) {
      const lastNode = this.timelineNodes.last.nativeElement;
      lastNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
