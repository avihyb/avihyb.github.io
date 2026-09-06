import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { RevealDirective } from './shared/reveal.directive';
import { SpotlightDirective } from './shared/spotlight.directive';
import { MagnetDirective } from './shared/magnet.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HomeComponent,
    RevealDirective,
    SpotlightDirective,
    MagnetDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
