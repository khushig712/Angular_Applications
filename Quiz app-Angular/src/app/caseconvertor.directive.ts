import { Directive, ElementRef,HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCaseconvertor]'
})
export class CaseconvertorDirective {

  @Input("appCaseconvertor") format;
  constructor(private el:ElementRef) { }

  @HostListener('blur')
  convert(){
     if(this.format === 'upper')
     this.el.nativeElement.value = (this.el.nativeElement.value as string).toUpperCase();
     else
     this.el.nativeElement.value = (this.el.nativeElement.value as string).toLowerCase();
  }

  @HostListener('mouseover')
  style(){
      this.el.nativeElement.style.color = "black";
      this.el.nativeElement.style.backgroundColor = "lightgray";
  }

  @HostListener('mouseout')
  nostyle(){
      this.el.nativeElement.style.color = '';
      this.el.nativeElement.style.backgroundColor = '';
  }

}
