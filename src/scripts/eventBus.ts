

class EventBus {
    private listeners: { [event: string]: ((data: any) => void)[] } = {};
  
    public on(event: string, callback: (data: any) => void): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  
    public emit(event: string, data: any): void {
      const eventListeners = this.listeners[event];
      if (eventListeners) {
        eventListeners.forEach((listener) => listener(data));
      }
    }
  }
  
  // Create a singleton instance of the EventBus
  export const eventBus = new EventBus();