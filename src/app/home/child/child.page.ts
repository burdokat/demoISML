import { Component, OnInit, OnDestroy } from '@angular/core';

import { IonicSelectableComponent } from 'ionic-selectable';

import { Subscription } from 'rxjs';

import { CountriesData, LocationService } from '../../providers/location.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.page.html',
  styleUrls: ['./child.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ChildPage implements OnInit, OnDestroy {

  public countries: CountriesData[];
  public countryPage: number;
  public limitNumFetchItem = 15;

  public form: FormGroup;

  private locationSub: Subscription;

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      nationality: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(32)]
      })
    });
  }

  onSearchCountry(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = event.text.trim()
                            .toLowerCase()
                            .replace('á', 'a')
                            .replace('é', 'e')
                            .replace('í', 'i')
                            .replace('ó', 'o')
                            .replace('ú', 'u')
                            .replace(/[ç]/g, 'c')
                            .replace(/[ -]/g, '');

    event.component.startSearch();

    if (this.locationSub) {
      this.locationSub.unsubscribe();
    }

    if (!text) {
      event.component.items = this.locationService.getCountries(1, this.limitNumFetchItem);
      this.countryPage = 2;
      event.component.endSearch();
      // event.component.enableInfiniteScroll();
      return;
    } else {

      // Commented on purpose

      // this.locationSub = this.locationService.getCountriesAsync().subscribe(nations => {
      //   event.component.items =  [...this.filterNations(nations, text, 10)];
        event.component.endSearch();
      //   event.component.disableInfiniteScroll();
      // });
    }

  }

  // Uncomment below if the ionic-selectable infinity scroll is enabled.
  onGetMoreCountries(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    // if (this.locationSub) {
    //   this.locationSub.unsubscribe();
    // }

    // this.locationSub = this.locationService.getCountriesAsync(
    //   this.countryPage,
    //   this.limitNumFetchItem
    // ).subscribe(nations => {
    //   console.log(this.countryPage);
    //   if (nations.length === 0) {
    //     event.component.disableInfiniteScroll();
    //   } else {
    //     nations = event.component.items.concat(nations);
    //     event.component.items = nations;
    //     event.component.endInfiniteScroll();
    //     this.countryPage++;
    //   }
    // });
  }

  // Generator
  *filterNations(nations: CountriesData[], text: string, maxSize?: number) {
    // tslint:disable-next-line: one-variable-per-declaration
    let count = 0, i = 0, stext: number, ctext: number;

    while ( count < maxSize && i < nations.length ) {
      stext = nations[i].name.trim().toLowerCase()
                               .replace('á', 'a')
                               .replace('é', 'e')
                               .replace('í', 'i')
                               .replace('ó', 'o')
                               .replace('ú', 'u')
                               .replace(/[ç]/g, 'c')
                               .replace(/[ -]/g, '').indexOf(text);
      ctext = nations[i].code.toLowerCase().indexOf(text);

      if (stext !== -1 || ctext !== -1) {
        yield nations[i];
        count++;
      }
      i++;
    }
  }

  ngOnDestroy() {
    if (this.locationSub) {
      this.locationSub.unsubscribe();
    }
  }
}
