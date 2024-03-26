import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponentComponent } from './wishlist-component.component';

describe('WishlistComponentComponent', () => {
  let component: WishlistComponentComponent;
  let fixture: ComponentFixture<WishlistComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistComponentComponent]
    });
    fixture = TestBed.createComponent(WishlistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
