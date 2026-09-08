import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { RevealDirective } from './shared/reveal.directive';
import { SpotlightDirective } from './shared/spotlight.directive';
import { MagnetDirective } from './shared/magnet.directive';
import { RouteReuseStrategy } from '@angular/router';
import { ReloadRouteReuseStrategy } from './shared/reload-route-reuse.strategy';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
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
  providers: [{ provide: RouteReuseStrategy, useExisting: ReloadRouteReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
