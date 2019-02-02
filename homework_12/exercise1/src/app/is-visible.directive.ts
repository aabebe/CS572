import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appIsVisible]'
})
export class IsVisibleDirective implements OnInit {
  @Input() appIsVisible: boolean;
  constructor(private elem: ElementRef, private rend2: Renderer2) {}
  ngOnInit(): void {
    console.log(this.appIsVisible);
    if (!this.appIsVisible) {
      console.log('is it working');
      this.rend2.setStyle(this.elem.nativeElement, 'display', 'none');
    }
  }
}
