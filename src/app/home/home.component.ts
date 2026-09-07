import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevealDirective } from '../shared/reveal.directive';
import { SpotlightDirective } from '../shared/spotlight.directive';
import { MagnetDirective } from '../shared/magnet.directive';

interface Tool { name: string; icon: string; }
interface ToolSet { label: string; items: Tool[]; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RevealDirective, SpotlightDirective, MagnetDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  /** Portrait tilt follows the pointer on hover-capable devices that allow motion. */
  portraitTransform = '';

  /** Two sets of marks take turns in the tools row: the stack first, then the tooling. */
  readonly toolSets: ToolSet[] = [
    {
      label: 'Stack',
      items: [
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Next.js', icon: 'nextdotjs' },
        { name: 'React', icon: 'react' },
        { name: 'Angular', icon: 'angular' },
        { name: 'Flutter', icon: 'flutter' },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'Supabase', icon: 'supabase' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'Stripe', icon: 'stripe' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
        { name: 'AWS', icon: 'aws' },
        { name: 'Python', icon: 'python' },
        { name: 'C++', icon: 'cplusplus' },
        { name: 'Java', icon: 'openjdk' },
        { name: 'GitHub', icon: 'github' }
      ]
    },
    {
      label: 'Tools',
      items: [
        { name: 'Claude Code', icon: 'claude' },
        { name: 'Cursor', icon: 'cursor' },
        { name: 'Codex', icon: 'openai' },
        { name: 'GitHub Copilot', icon: 'githubcopilot' },
        { name: 'Gemini', icon: 'googlegemini' },
        { name: 'Perplexity', icon: 'perplexity' },
        { name: 'v0', icon: 'v0' },
        { name: 'Figma', icon: 'figma' },
        { name: 'n8n', icon: 'n8n' }
      ]
    }
  ];
  activeSet = 0;
  swapping = false;

  private timer?: ReturnType<typeof setInterval>;
  private swapTimeout?: ReturnType<typeof setTimeout>;
  private paused = false;

  private readonly canTilt =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;

  ngOnInit(): void {
    this.timer = setInterval(() => this.rotateTools(), 7000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearTimeout(this.swapTimeout);
  }

  /** Flip the current marks out, then mount the other set so its marks flip in. */
  rotateTools(): void {
    if (this.paused || this.swapping) {
      return;
    }
    this.swapping = true;
    this.swapTimeout = setTimeout(() => {
      this.activeSet = (this.activeSet + 1) % this.toolSets.length;
      this.swapping = false;
    }, 650);
  }

  /** Hold the current set while the pointer is over it so the names can be read. */
  pauseTools(): void { this.paused = true; }
  resumeTools(): void { this.paused = false; }

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
}
