import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevealDirective } from '../shared/reveal.directive';
import { SpotlightDirective } from '../shared/spotlight.directive';
import { MagnetDirective } from '../shared/magnet.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RevealDirective, SpotlightDirective, MagnetDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /** Portrait tilt follows the pointer on hover-capable devices that allow motion. */
  portraitTransform = '';

  private readonly canTilt =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  onStageMove(event: MouseEvent): void {
    if (!this.canTilt) {
      return;
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = (x * 10).toFixed(2);
    const rotateX = (-y * 10).toFixed(2);
    this.portraitTransform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onStageLeave(): void {
    this.portraitTransform = '';
  }

  scrollToWork(event: Event): void {
    event.preventDefault();
    const target = document.getElementById('work');
    if (!target) {
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
