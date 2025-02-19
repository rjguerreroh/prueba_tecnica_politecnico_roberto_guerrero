import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { FormCountryComponent } from './components/form-country/form-country.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'country-detail/:id', component: CountryDetailComponent },
  { path: 'country-new', component: FormCountryComponent },
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
