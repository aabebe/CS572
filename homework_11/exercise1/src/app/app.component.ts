import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-counter (counterChange) = 'showoutput($event)' > </app-counter>
<p> Component Counter Value= {{counter}}</p>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() counter: number;
  title = 'exercise1';
  constructor() {
    this.counter = 0;
  }
  showoutput(data) {
    console.log(data);
    this.counter = data;
  }


}
