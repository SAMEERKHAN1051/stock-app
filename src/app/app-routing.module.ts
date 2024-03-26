import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search/home',
    pathMatch: 'full',
  }, {
    path: '',
    component: MainLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layout/main-layout/main-layout.module').then(x => x.MainLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'search/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
