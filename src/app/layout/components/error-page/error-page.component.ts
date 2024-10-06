import {Location} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {

  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
