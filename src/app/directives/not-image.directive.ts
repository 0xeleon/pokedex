import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNotImage]'
})
export class NotImageDirective {

  constructor(private elementImg : ElementRef) { }
  @HostListener('error')
  onError() : void {
    console.log('here')
    this.elementImg.nativeElement.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Ferror-document-icon-vector-id1060550172%3Fk%3D6%26m%3D1060550172%26s%3D612x612%26w%3D0%26h%3DgdWxz8H1C8PaxEKF_ItZfo_S-cbQsxC415_n5v9irvs%3D&f=1&nofb=1'
  }
}
