import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Scroll reveal: the host starts hidden and rises into place the first time it enters the viewport.
 * Set `--i` on the host for a stagger. Respects prefers-reduced-motion by revealing immediately.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: number | string = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    host.classList.add('reveal');
    const index = Number(this.appReveal) || 0;
    if (index) {
      host.style.setProperty('--i', String(index));
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      host.classList.add('in');
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          host.classList.add('in');
          this.observer?.disconnect();
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
