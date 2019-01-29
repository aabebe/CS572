import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<button (click)="decreament()">-</button> {{count}}<button (click)="increament()">+</button>`,
  styles: []
})
export class CounterComponent implements OnInit {
  @Input() count: number;
  constructor() {
    this.count = 0;
  }
  @Output() counterChange = new EventEmitter();
  ngOnInit() {
  }
  decreament() {
    this.count--;
    this.counterChange.emit(this.count);
  }
  increament() {
    this.count++;
    this.counterChange.emit(this.count);
  }

}
