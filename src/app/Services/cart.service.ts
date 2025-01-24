import { Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../Interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private static cartItems: CartItem[] = [];

  getCartItems(): Observable<CartItem[]> {
    return new Observable(observer => {
      observer.next(CartService.cartItems);
      observer.complete();
    });
  }

  addCartItem(item: CartItem): Observable<void> {
    return new Observable(observer => {
      CartService.cartItems.push(item);
      observer.next();
      observer.complete();
    });
  }

  deleteCartItem(itemId: number): Observable<void> {
    return new Observable(observer => {
      CartService.cartItems = CartService.cartItems.filter(item => item.id !== itemId);
      observer.next();
      observer.complete();
    });
  }

  changeQuantity(itemId: number, quantity: number): Observable<void> {
    return new Observable(observer => {
      const item = CartService.cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
      observer.next();
      observer.complete();
    });
  }
}
