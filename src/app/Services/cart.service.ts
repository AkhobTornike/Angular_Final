import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { Cart } from '../Interfaces/cart';
import { CartItem } from '../Interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: { [userId: string]: CartItem[] } = {};

  constructor() {}

  getCart(userId: string): Observable<CartItem[]> {
    return new Observable(observer => {
      const cart = this.carts[userId] || [];
      observer.next(cart);
      observer.complete();
    });
  }

  addToCart(userId: string, item: CartItem): Observable<CartItem> {
    return new Observable(observer => {
      if (!this.carts[userId]) {
        this.carts[userId] = [];
      }
      this.carts[userId].push(item);
      observer.next(item);
      observer.complete();
    });
  }

  updateCartItem(userId: string, itemId: number, updatedItem: CartItem): Observable<CartItem> {
    return new Observable(observer => {
      const cart = this.carts[userId];
      if (cart) {
        const index = cart.findIndex(item => item.id === itemId);
        if (index !== -1) {
          cart[index] = updatedItem;
          observer.next(updatedItem);
        } else {
          observer.error('Item not found in cart');
        }
      } else {
        observer.error('Cart not found for user');
      }
      observer.complete();
    });
  }

  removeCartItem(userId: string, itemId: number): Observable<void> {
    return new Observable(observer => {
      const cart = this.carts[userId];
      if (cart) {
        this.carts[userId] = cart.filter(item => item.id !== itemId);
        observer.next();
      } else {
        observer.error('Cart not found for user');
      }
      observer.complete();
    });
  }

  clearCart(userId: string): Observable<void> {
    return new Observable(observer => {
      this.carts[userId] = [];
      observer.next();
      observer.complete();
    });
  }
}
