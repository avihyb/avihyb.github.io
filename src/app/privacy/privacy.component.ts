import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  /** Shown as the notice's revision date; bump it whenever the text changes. */
  readonly updated = '11 September 2026';
}
