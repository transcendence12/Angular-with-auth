import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
  loadComponent: () => import('./pages/login/login.component').then((mod) => mod.LoginComponent)
  },
  {
    path: 'dashbord',
    loadComponent: () => import('./pages/dashbord/dashbord.component').then((mod) => mod.DashbordComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
