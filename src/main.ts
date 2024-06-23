import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';
import { StaticProvider } from '@angular/core';

platformBrowserDynamic()
  .bootstrapModule(AppModule, { providers: appConfig.providers as StaticProvider[] })
  .catch(err => console.error(err));
