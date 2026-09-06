import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/** Pulls the host a few pixels toward the pointer while hovered; snaps back on leave. */
@Directive({
  selector: '[appMagnet]',
  standalone: true
})
export class MagnetDirective {
  @Input() appMagnet: number | string = 6;

  private readonly enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    const strength = Number(this.appMagnet) || 6;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.el.nativeElement.style.setProperty('--magnet-x', `${(x * strength * 2).toFixed(1)}px`);
    this.el.nativeElement.style.setProperty('--magnet-y', `${(y * strength * 2).toFixed(1)}px`);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.el.nativeElement.style.setProperty('--magnet-x', '0px');
    this.el.nativeElement.style.setProperty('--magnet-y', '0px');
  }
}
