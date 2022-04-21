import { Directive, ElementRef} from '@angular/core';
@Directive({
  selector: '[passwordToggle]'
 
})
export class ShowHidePassword {
 private _shown = false;
constructor(private el: ElementRef) {
    this.setup();
  }
toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
     // span.innerHTML = 'Hide password';
      span.classList.remove("fa-eye");
      span.classList.add("fa-eye-slash");
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
    //  span.innerHTML = 'Show password';
      span.classList.remove("fa-eye-slash");
      span.classList.add("fa-eye");
    }
  }
setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.style.cursor="pointer";
  //  span.innerHTML = `Show password`;
    span.classList.add('password-hide-show');
    span.classList.add("fa");
    span.classList.add("fa-eye");
    
    
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}