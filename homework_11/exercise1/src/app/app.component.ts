import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-counter (counterChange) = "showoutput($event)" > </app-counter>
<p> Component Counter Value= {{counter}}</p>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() counter: number;
  title = 'exercise1';
  showoutput(data) {
    console.log(data);
    this.counter = data;
  }


}
