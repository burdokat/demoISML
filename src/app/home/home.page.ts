import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class HomePage {

  constructor(
    private router: Router
  ) {}

  navigateToChild() {
    this.router.navigate(['/home/child']);
  }

}
