import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor() { }

  message: string[] = [];

  add(msg: string){
    this.message.push(msg)
  }

  clear() {
    this.message = [];
  }
}
