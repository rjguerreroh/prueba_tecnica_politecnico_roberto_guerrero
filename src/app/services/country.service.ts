import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _url: string = 'http://localhost:3000';
  private _countries$ = new BehaviorSubject<Country[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  test: String[] = [
    "ddd",
    "dkfkd"
  ]

  get countries$(): Observable<Country[]> {
    return this._countries$.asObservable();
  }

  getCountryById(id: string): Observable<Country> {
    return this.http.get<Country>(`${this._url}/paises/${id}`);
  }

  loadCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this._url}/paises`).pipe(
      tap(
        res => {
          this._countries$.next(res);
        }
      )
    );
  }

  saveCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this._url}/paises`, country).pipe(
      tap((newCountry: Country) => {
        const countries = this._countries$.getValue();
        countries.push(newCountry);
        this._countries$.next(countries);
      })
    );
  }

  eliminar(id: String): Observable<void> {
    return this.http.delete<any>(`${this._url}/paises/${id}`).pipe(
      tap(() => {
        const countries = this._countries$.getValue().filter((e: Country) => e.id !== id);
        this._countries$.next(countries);
      })
    );
  }

}
