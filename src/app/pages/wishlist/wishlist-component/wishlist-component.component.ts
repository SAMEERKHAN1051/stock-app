import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-wishlist-component',
  templateUrl: './wishlist-component.component.html',
  styleUrls: ['./wishlist-component.component.scss'],
})
export class WishlistComponentComponent implements OnInit{
  wishList: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.userService.getWishlist().subscribe((resp) => {
      this.wishList = resp;
    });
  }
}
