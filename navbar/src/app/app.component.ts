import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    // Listen for events from footer
    (window as any).eventBus.on('footerEvent', (data: any) => {
      console.log('Navbar received event from footer:', data);
    });
  }
  sendMessage() {
    // Emit an event to be received by footer
    (window as any).eventBus.emit('navbarEvent', {
      message: 'Hello from navbar!',
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
