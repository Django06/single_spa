import { Subject } from "rxjs";

class EventBusService {
  private eventSubject = new Subject<any>();

  emit(event: string, data?: any) {
    this.eventSubject.next({ event, data });
  }

  on(event: string, action: (data?: any) => void) {
    return this.eventSubject.subscribe((e) => {
      if (e.event === event) {
        action(e.data);
      }
    });
  }
}

export const eventBus = new EventBusService();
