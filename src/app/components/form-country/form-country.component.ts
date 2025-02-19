import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-country',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-country.component.html',
})
export class FormCountryComponent {

  private countryService = inject(CountryService);

  countryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.countryForm = this.fb.group({
      id: ['', [Validators.required]],
      countryName: ['', [Validators.required]],
      population: ['', Validators.required],
      capital: ['', Validators.required],
      img: ['', Validators.required],
      continentName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave() {
    console.log("data country ", this.countryForm.value);
    if (this.countryForm.valid) {
      console.log("entro creacion");
      const data: Country = {
        id: this.countryForm.get('id')?.value,
        capital: this.countryForm.get('capital')?.value,
        population: this.countryForm.get('population')?.value,
        countryName: this.countryForm.get('countryName')?.value,
        img: this.countryForm.get('img')?.value,
        continentName: this.countryForm.get('continentName')?.value,
        description: this.countryForm.get('description')?.value
      };
      console.log(this.countryForm.value);
      this.countryService.saveCountry(data).subscribe({
        next: (res) => {
          console.log("Operacion exitosa");
          this.router.navigateByUrl('/countries');
          Swal.fire({
            title: "Operacion exitosa",
            icon: "success",
            draggable: true
          });
        },
        error: (err) => {
  
          console.log("Ocurrio un error al crear pais");
        }
      });
    }else{
      Swal.fire({
        title: "Formulario invalido",
        icon: "error",
        draggable: true
      });
      console.log("No entro creacion");
    }
  }

}
