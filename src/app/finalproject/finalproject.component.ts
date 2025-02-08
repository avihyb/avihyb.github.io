import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-finalproject',
  standalone: true,
  templateUrl: './finalproject.component.html',
  styleUrls: ['./finalproject.component.scss']
})
export class FinalprojectComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}