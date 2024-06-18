import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { IntroComponent } from './intro/intro.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    IntroComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
  ]
})
export class AppComponent {
  title = 'angular-avi-page';
}
