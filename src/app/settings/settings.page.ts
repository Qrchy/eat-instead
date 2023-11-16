import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }


    themeToggle = false;
  
    ngOnInit() {
      // Use matchMedia to check the user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
      // Initialize the dark theme based on the initial
      // value of the prefers-color-scheme media query
      this.initializeDarkTheme(prefersDark.matches);
  
      // Listen for changes to the prefers-color-scheme media query
      prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
    }
  
    // Check/uncheck the toggle and update the theme based on isDark
    initializeDarkTheme(isDark:any) {
      this.themeToggle = isDark;
      this.toggleDarkTheme(isDark);
    }
  
    // Listen for the toggle check/uncheck to toggle the dark theme
    toggleChange(ev:any) {
      this.toggleDarkTheme(ev.detail.checked);
    }
  
    // Add or remove the "dark" class on the document body
    toggleDarkTheme(shouldAdd:any) {
      document.body.classList.toggle('dark', shouldAdd);
    }
  

}
