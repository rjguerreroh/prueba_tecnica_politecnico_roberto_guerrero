import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  countries: Country[] = [];
  presentation: any;

  private countryService = inject(CountryService);


  ngOnInit(): void {
    this.countryService.loadCountries().pipe(
      switchMap(() => this.countryService.countries$)
    ).subscribe({
      next: (data) => {
      this.countries = data;
      },
      error: (error) => {
      console.log(error);
      }
    });

  }

}
