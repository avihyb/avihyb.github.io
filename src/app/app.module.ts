import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TruncatePipe,
    ResumeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, // Add FormsModule
    ReactiveFormsModule, // Add ReactiveFormsModule
    HttpClientModule, // Add HttpClientModule
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  bootstrap: [AppComponent],
  exports: [TruncatePipe]
})
export class AppModule { }

export class SharedModule { }
