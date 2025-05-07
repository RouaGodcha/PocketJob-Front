import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/acceuil',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./front-user/front-user.module').then(m => m.FrontUserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./backadmin/backadmin.module').then(m => m.BackadminModule)
  },
  {
    path: 'Frontemployer',
    loadChildren: () => import('./front-user/front-employer/front-employer.module').then(m => m.FrontEmployerModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
