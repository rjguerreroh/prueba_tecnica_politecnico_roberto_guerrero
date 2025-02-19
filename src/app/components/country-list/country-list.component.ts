import { Component, inject, Inject, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { delay, of, switchMap } from 'rxjs';
import { CountryItemComponent } from '../country-item/country-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CountryItemComponent, RouterModule],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent implements OnInit {

  private countryService = inject(CountryService);
  countries: Country[] = [];
   
  

  ngOnInit(): void {
    this.getContries();
  }

  getContries() {
    this.countryService.loadCountries().pipe(
      switchMap(() => this.countryService.countries$)
    ).subscribe({
      next: (data) => {
        console.log("data", data);
        this.countries = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
