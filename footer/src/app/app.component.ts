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
  private eventBusService: any;

  constructor() {}

  ngOnInit(): void {
   // Listen for events from navbar
   (window as any).eventBus.on('navbarEvent', (data:any) => {
    console.log('Footer received event from navbar:', data);
  });
  }
  sendMessage() {
    // Emit an event to be received by navbar
    (window as any).eventBus.emit('footerEvent', { message: 'Hello from footer!' });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
