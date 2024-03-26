import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentComponent } from './component/component.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './component/footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { WishlistComponentComponent } from './pages/wishlist/wishlist-component/wishlist-component.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/home/search/search.component';
import { MainsectionComponent } from './pages/home/mainsection/mainsection.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    WishlistComponentComponent,
    HomeComponent,
    SearchComponent,
    MainsectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
