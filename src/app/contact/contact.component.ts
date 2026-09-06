import { Component } from '@angular/core';

const EMAIL = 'avihyb@gmail.com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  copied = false;
  private copiedTimer?: ReturnType<typeof setTimeout>;

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(EMAIL);
      this.copied = true;
      clearTimeout(this.copiedTimer);
      this.copiedTimer = setTimeout(() => (this.copied = false), 2000);
    } catch {
      // Clipboard unavailable: fall back to the mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  }
}
