import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReloadRouteReuseStrategy } from './shared/reload-route-reuse.strategy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  scrolled = false;

  /** Route-change loader: the wordmark with its dot bouncing, shown between pages. */
  loading = false;

  private static readonly MIN_LOADER_MS = 700;
  private loaderShownAt = 0;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private firstNavigationDone = false;
  private routerSub?: Subscription;

  private forceLoader = false;

  constructor(private router: Router, private reuse: ReloadRouteReuseStrategy) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Shown when the page changes (not for tab or query changes within a page), and never
        // for the first navigation: that is the page itself loading and the home intro owns it.
        const nextPath = event.url.split(/[?#]/)[0];
        const currentPath = this.router.url.split(/[?#]/)[0];
        if (this.firstNavigationDone && (nextPath !== currentPath || this.forceLoader)) {
          this.showLoader();
        }
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.firstNavigationDone = true;
        this.hideLoader();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    clearTimeout(this.hideTimer);
  }

  /** The wordmark: from another page it goes home; on the home page it reloads it, intro included. */
  onBrandClick(event: MouseEvent): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return; // let the browser open it in a new tab or window
    }
    event.preventDefault();
    const onHome = this.router.url.split(/[?#]/)[0] === '/home';
    if (!onHome) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.forceLoader = true;
    this.reuse.forceReload = true;
    this.router.navigateByUrl('/home').finally(() => {
      this.reuse.forceReload = false;
      this.forceLoader = false;
    });
  }

  private showLoader(): void {
    clearTimeout(this.hideTimer);
    this.loading = true;
    this.loaderShownAt = performance.now();
  }

  /** Keep the loader up for a minimum beat so it never flickers on a fast route. */
  private hideLoader(): void {
    if (!this.loading) {
      return;
    }
    const elapsed = performance.now() - this.loaderShownAt;
    const wait = Math.max(0, AppComponent.MIN_LOADER_MS - elapsed);
    this.hideTimer = setTimeout(() => { this.loading = false; }, wait);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }
}
