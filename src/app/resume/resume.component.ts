import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Timeline } from './timeline.model'; // Adjust path as necessary
import { TIMELINE_DATA } from './timeline-data'; // Adjust path as necessary

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements AfterViewInit {
  timelineData: Timeline[] = TIMELINE_DATA;
  @ViewChildren('timeline') timelines!: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    this.timelines.forEach(timeline => {
      observer.observe(timeline.nativeElement);
    });
  }
}
