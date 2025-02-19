import { Component, inject, Inject, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [RouterModule, DecimalPipe],
  templateUrl: './country-detail.component.html',
})
export class CountryDetailComponent {
    country!: Country;
    private countryService = inject(CountryService);

    constructor(
      private router: Router,
      private route: ActivatedRoute,
    ){

    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = (params.get('id') || '0');
        this.countryService.getCountryById(id).subscribe({
          next: (res) => {
            this.country = res;
          },
          error: () => {
            console.log("Ocurrio un error al consultar pais por id");
          }
        })
        console.log("id :   ", id)
      });
    }
    
}
