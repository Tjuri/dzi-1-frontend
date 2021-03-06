import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CreateEditConfigComponent} from "./components/create-edit-config/create-edit-config.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'new-config',
    component: CreateEditConfigComponent,
  },

  {
    path: 'edit-config/:id',
    component: CreateEditConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
