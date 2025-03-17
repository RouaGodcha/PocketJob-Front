import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   /* Partie admin avec dashboard et ses enfants */
   {
    path: 'admin',
    loadChildren: () => import('./backadmin/backadmin.module').then(m => m.BackadminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
