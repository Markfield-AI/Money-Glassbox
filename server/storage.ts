// Glass Box MVP - All state is client-side with localStorage
// No backend storage needed

export interface IStorage {}

export class MemStorage implements IStorage {
  constructor() {
    // No server-side storage needed for Glass Box MVP
  }
}

export const storage = new MemStorage();
