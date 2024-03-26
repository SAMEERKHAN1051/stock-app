import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { WishlistComponentComponent } from 'src/app/pages/wishlist/wishlist-component/wishlist-component.component';

export const mainLayoutRoutes: Routes = [
  { path: 'search/home', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponentComponent },
  // { path: 'portfolio',          component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(mainLayoutRoutes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
