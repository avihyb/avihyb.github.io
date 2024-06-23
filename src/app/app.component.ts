import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Ensure styleUrls is correctly spelled
})
export class AppComponent {
  isSmallScreen: boolean = false;
  isMenuOpen: boolean = false;

  constructor() {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false; // Ensure menu closes when a menu item is clicked
  }

  private checkScreenWidth() {
    this.isSmallScreen = window.innerWidth < 768;
    if (!this.isSmallScreen) {
      // Reset menu open state on larger screens
      this.isMenuOpen = false;
    }
  }
}
