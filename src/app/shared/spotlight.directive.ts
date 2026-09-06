import { Directive, ElementRef, HostListener } from '@angular/core';

/** Tracks the pointer as `--mx` / `--my` on the host so CSS can paint a spotlight under it. */
@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
