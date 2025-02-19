import { Component, Input, input, inject } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-item',
  standalone: true,
  imports: [RouterModule, DecimalPipe],
  templateUrl: './country-item.component.html',
})
export class CountryItemComponent {
  @Input() country!: Country;
  private countryService = inject(CountryService);
  
  onDelete(): void{
    this.countryService.eliminar(this.country.id).subscribe({
      next: (res) => {
        console.log("Eliminado existosamente");
      },
      error: (err) => {
        console.log("Ocurrio un error");
        console.log(err);
      } 
    });
  }
}
