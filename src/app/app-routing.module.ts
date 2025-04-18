import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Partie admin avec dashboard et ses enfants
  {
    path: 'admin',
    loadChildren: () => import('./backadmin/backadmin.module').then(m => m.BackadminModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./front-user/front-user.module').then(m => m.FrontUserModule),
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
