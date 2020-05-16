import { Injectable } from '@angular/core';

import * as Countries from './json/countries.json';

import { Observable, of, EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export interface CountriesData {
  id: string;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // tslint:disable-next-line: variable-name
  private _countries: CountriesData[] = (Countries as any).default;

  get countries() {
    return this._countries;
  }

  constructor() { }

  getCountries(page?: number, size ?: number): CountriesData[] {
    const length = this.countries.length;
    let result: CountriesData[] = [];

    this.countries.forEach(country => {
      result.push(country);
    });

    if (page && size) {
      if ((length - ((page - 1) * size)) > 0) {
        const startIndex = (page - 1) * size ;
        const endIndex = (startIndex + size) <= length ? startIndex + size : length ;
        result = result.slice(startIndex, endIndex);
      } else {
        return [];
      }
    }

    return result;
  }

  getCountriesAsync(page?: number, size ?: number): Observable<CountriesData[]> {
    return of(this.getCountries(page, size)).pipe(
      switchMap(c => {
        return c.length < 0 ? EMPTY : of(c) ;
      }),
      take(1)
    );
  }
}
