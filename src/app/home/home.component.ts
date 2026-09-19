import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PERSONAL_PROJECTS } from '../projects/project-data';

interface Tool { name: string; icon: string; }

/** A tool mark on the halo: where it starts on the ring, how far off the ring it sits, and its own drift clock. */
interface OrbitNode extends Tool {
  angle: number;
  wobble: number;
  phase: number;
  /** how much of the stir this mark takes: under 1 it lags, over 1 it runs ahead */
  lag: number;
  /** where it comes in from: how far outside the ring, how far round it, and when it sets off */
  spread: number;
  swirl: number;
  enter: number;
}

/** One edge of the web, as a pair of marks. */
interface OrbitLink {
  a: number;
  b: number;
  far: boolean;
}

/** One product in the band under the hero: its mark and its wordmark. */
interface Partner {
  name: string;
  logo: string;
  params: { tab: string; project: string };
}

/** Ring radii, in percent of the halo box. The box itself is kept as close to square as the
    screen and the name allow (see the stylesheet), so these two together read as a circle. */
const RADIUS_X = 46;
const RADIUS_Y = 42;
/** One turn of the ring, in seconds. */
const PERIOD = 190;
/** How far a mark wanders off its point on the ring, in percent of the box. */
const DRIFT_X = 0.7;
const DRIFT_Y = 1.1;

/** Scrolling stirs the ring. These set how hard, and how it settles afterwards. */
/** radians of roll per pixel scrolled, over the first screenful */
const SCROLL_TURN = 0.008;
const SCROLL_REACH = 420;
/** a wheel flick pushes the ring directly, so it still stirs once the page has no scroll left */
const WHEEL_KICK = 0.012;
/** however hard the flick, the ring never spins faster than this (radians per second) */
const MAX_STIR_SPEED = 6;
/** an under-damped spring: the ring overruns the scroll and swings back into place */
const SPRING = 22;
const DAMPING = 4.6;

/** The landing: the marks start scattered far outside the ring and gather onto it. */
/** how long one mark takes to arrive, in seconds */
const ENTRY_SPAN = 1.2;
/** the spread of start times across the marks */
const ENTRY_STAGGER = 0.55;
const ENTRY_TOTAL = ENTRY_SPAN + ENTRY_STAGGER;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  /** The halo leans with the pointer on hover-capable devices that allow motion. */
  haloTransform = '';

  /** The stack and the tooling, read as one constellation around the hero. */
  private readonly tools: Tool[] = [
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Next.js', icon: 'nextdotjs' },
    { name: 'React', icon: 'react' },
    { name: 'Angular', icon: 'angular' },
    { name: 'Flutter', icon: 'flutter' },
    { name: 'Node.js', icon: 'nodedotjs' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Stripe', icon: 'stripe' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Python', icon: 'python' },
    { name: 'C++', icon: 'cplusplus' },
    { name: 'Java', icon: 'openjdk' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Claude Code', icon: 'claude' },
    { name: 'Cursor', icon: 'cursor' },
    { name: 'Codex', icon: 'openai' },
    { name: 'GitHub Copilot', icon: 'githubcopilot' },
    { name: 'Gemini', icon: 'googlegemini' },
    { name: 'Perplexity', icon: 'perplexity' },
    { name: 'v0', icon: 'v0' },
    { name: 'Figma', icon: 'figma' },
    { name: 'n8n', icon: 'n8n' }
  ];

  readonly nodes: OrbitNode[] = this.tools.map((tool, i) => ({
    ...tool,
    angle: (i / this.tools.length) * Math.PI * 2 - Math.PI / 2,
    /** a gentle in-and-out, so the ring never reads as a mechanical circle of icons */
    wobble: 1 + 0.075 * Math.sin(i * 2.3),
    phase: i * 1.7,
    lag: 0.82 + 0.36 * noise(i),
    spread: 1.2 + 1.9 * noise(i + 37),
    swirl: (noise(i + 91) - 0.5) * 2.6,
    enter: ENTRY_STAGGER * noise(i + 53)
  }));

  readonly links: OrbitLink[] = this.buildLinks();

  /** The products, shown the way a company shows the logos it works with. */
  readonly partners: Partner[] = PERSONAL_PROJECTS.map(p => ({
    name: p.title,
    logo: p.logo,
    params: { tab: 'personal', project: p.id }
  }));

  @ViewChild('halo') private haloRef?: ElementRef<HTMLElement>;
  @ViewChild('web') private webRef?: ElementRef<SVGElement>;
  @ViewChildren('nodeEl') private nodeEls?: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('lineEl') private lineEls?: QueryList<ElementRef<SVGLineElement>>;

  private readonly hasWindow = typeof window !== 'undefined';
  private readonly canLean =
    this.hasWindow && window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;
  private readonly stillness =
    this.hasWindow && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Halo box in pixels; the ring is measured against it. */
  private box = { w: 0, h: 0 };
  /** Orbit clock, in seconds. It only advances while the halo is running, so pausing never jumps. */
  private clock = 0;
  private lastFrame = 0;
  private frame = 0;
  private hovered = false;
  private onScreen = true;
  private observers: { disconnect(): void }[] = [];
  /** The stir: where the scroll wants the ring, where it actually is, and how fast it is going. */
  private stirTarget = 0;
  private stir = 0;
  private stirVelocity = 0;
  /** Seconds into the landing. It starts finished when motion is off. */
  private entry = 0;
  private entryDone = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (!this.hasWindow || !this.haloRef) {
      return;
    }
    const halo = this.haloRef.nativeElement;
    this.entry = this.stillness ? ENTRY_TOTAL : 0;
    this.measure();

    const resize = new ResizeObserver(() => {
      this.measure();
      this.draw();
    });
    resize.observe(halo);
    this.observers.push(resize);

    this.draw();
    if (this.stillness) {
      return; /* motion is off: the web is placed once and left alone */
    }

    /* The loop only runs while the hero is on screen and the tab is in front. */
    const seen = new IntersectionObserver(([entry]) => {
      this.onScreen = entry.isIntersecting;
      this.onScreen ? this.start() : this.stop();
    });
    seen.observe(halo);
    this.observers.push(seen);

    document.addEventListener('visibilitychange', this.onVisibility);
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('wheel', this.onWheel, { passive: true });
    });
    this.onScroll();
    this.stir = this.stirTarget;
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
    this.observers.forEach(o => o.disconnect());
    if (this.hasWindow) {
      document.removeEventListener('visibilitychange', this.onVisibility);
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('wheel', this.onWheel);
    }
  }

  /** Neighbours are wired all the way round; every third mark also reaches across the web. */
  private buildLinks(): OrbitLink[] {
    const count = this.nodes.length;
    const links: OrbitLink[] = [];
    for (let i = 0; i < count; i++) {
      links.push({ a: i, b: (i + 1) % count, far: false });
      if (i % 3 === 0) {
        links.push({ a: i, b: (i + 4) % count, far: true });
      }
      if (i % 4 === 0) {
        links.push({ a: i, b: (i + 7) % count, far: true });
      }
    }
    return links;
  }

  private measure(): void {
    const rect = this.haloRef!.nativeElement.getBoundingClientRect();
    this.box = { w: rect.width, h: rect.height };
  }

  /** The roll the scroll is asking for, over the first screenful and no further. */
  private readonly onScroll = (): void => {
    this.stirTarget = Math.min(window.scrollY, SCROLL_REACH) * SCROLL_TURN;
  };

  /** A flick of the wheel pushes the ring straight away, even where there is nothing left to scroll. */
  private readonly onWheel = (event: WheelEvent): void => {
    this.stirVelocity = clamp(this.stirVelocity + event.deltaY * WHEEL_KICK, -MAX_STIR_SPEED, MAX_STIR_SPEED);
  };

  private readonly onVisibility = (): void => {
    document.hidden || !this.onScreen ? this.stop() : this.start();
  };

  private start(): void {
    if (this.frame || this.stillness || document.hidden || !this.onScreen) {
      return;
    }
    this.lastFrame = 0;
    /* outside Angular: the loop touches nothing the template binds to */
    this.zone.runOutsideAngular(() => {
      this.frame = requestAnimationFrame(this.tick);
    });
  }

  private stop(): void {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private readonly tick = (now: number): void => {
    const delta = this.lastFrame ? Math.min((now - this.lastFrame) / 1000, 0.1) : 0;
    this.lastFrame = now;
    if (!this.hovered) {
      this.clock += delta;
    }
    if (this.entry < ENTRY_TOTAL) {
      this.entry += delta;
    }
    /* the ring chases the scroll on a loose spring, so it arrives late and overruns a little */
    this.stirVelocity += (this.stirTarget - this.stir) * SPRING * delta;
    this.stirVelocity *= Math.exp(-DAMPING * delta);
    this.stirVelocity = clamp(this.stirVelocity, -MAX_STIR_SPEED, MAX_STIR_SPEED);
    this.stir += this.stirVelocity * delta;
    this.draw();
    this.frame = requestAnimationFrame(this.tick);
  };

  /** One frame: every mark placed on the ring, every edge redrawn to follow it. */
  private draw(): void {
    const nodeEls = this.nodeEls?.toArray();
    const lineEls = this.lineEls?.toArray();
    if (!nodeEls || !lineEls || !this.box.w) {
      return;
    }
    const turn = (this.clock / PERIOD) * Math.PI * 2;
    /* while the ring is being stirred the marks swing wider, so the web goes slack and gooey */
    const swell = 1 + Math.min(Math.abs(this.stirVelocity) * 0.55, 1.8);
    const landing = this.entry < ENTRY_TOTAL;
    /* percent of the halo box, so the same numbers drive the marks and the SVG's 0–100 viewBox */
    const xs: number[] = [];
    const ys: number[] = [];

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const el = nodeEls[i].nativeElement;
      /* every mark takes a different share of the stir, so the ring shears instead of turning as one */
      let angle = node.angle + turn + this.stir * node.lag;
      let reach = node.wobble * (1 + 0.05 * Math.sin(this.stir * 1.7 + node.phase));
      if (landing) {
        /* far outside the ring and off to one side, gathering onto its place and settling past it */
        const p = clamp((this.entry - node.enter) / ENTRY_SPAN, 0, 1);
        const eased = easeOutBack(p);
        reach *= 1 + (1 - eased) * node.spread;
        angle += (1 - eased) * node.swirl;
        el.style.opacity = `${clamp(p * 2, 0, 1)}`;
      }
      const x = 50 + RADIUS_X * reach * Math.cos(angle) + swell * DRIFT_X * Math.sin(this.clock * 0.31 + node.phase);
      const y = 50 + RADIUS_Y * reach * Math.sin(angle) + swell * DRIFT_Y * Math.sin(this.clock * 0.23 + node.phase * 1.7);
      xs.push(x);
      ys.push(y);
      el.style.transform = `translate3d(${((x / 100) * this.box.w).toFixed(1)}px, ${((y / 100) * this.box.h).toFixed(1)}px, 0)`;
    }

    /* the web is only drawn once the marks are most of the way home */
    const web = this.webRef?.nativeElement;
    if (web && landing) {
      web.style.opacity = `${clamp((this.entry - 0.5) / 0.9, 0, 1)}`;
    } else if (web && !this.entryDone) {
      this.entryDone = true;
      web.style.opacity = '';
      nodeEls.forEach(ref => (ref.nativeElement.style.opacity = ''));
    }

    for (let i = 0; i < this.links.length; i++) {
      const line = lineEls[i]?.nativeElement;
      const link = this.links[i];
      if (!line) {
        continue;
      }
      line.setAttribute('x1', xs[link.a].toFixed(2));
      line.setAttribute('y1', ys[link.a].toFixed(2));
      line.setAttribute('x2', xs[link.b].toFixed(2));
      line.setAttribute('y2', ys[link.b].toFixed(2));
    }
  }

  /** Hold the ring still while a mark is being read. */
  pauseHalo(): void { this.hovered = true; }
  resumeHalo(): void { this.hovered = false; }

  onStageMove(event: MouseEvent): void {
    if (!this.canLean) {
      return;
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.haloTransform = `translate3d(${(-x * 26).toFixed(1)}px, ${(-y * 20).toFixed(1)}px, 0)`;
  }

  onStageLeave(): void {
    this.haloTransform = '';
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Lands a shade past the mark and eases back, so the ring closes with a small snap. */
function easeOutBack(p: number): number {
  const c = 1.2;
  return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2);
}

/** A fixed scatter in [0, 1): the same marks lag by the same amount on every visit. */
function noise(i: number): number {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}
