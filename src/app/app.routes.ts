import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Avichai Ben David | Software Developer' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects | Avichai Ben David' },
  { path: 'resume', component: ResumeComponent, title: 'My Story | Avichai Ben David' },
  { path: 'contact', component: ContactComponent, title: 'Contact | Avichai Ben David' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
