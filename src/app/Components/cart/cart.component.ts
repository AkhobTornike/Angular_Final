import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductsService } from '../../Services/products.service';
import { CartItem } from '../../Interfaces/cart-item';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  productTitles: { [key: number]: string } = {};

  constructor(private cartService: CartService, private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.cartItems.forEach(item => this.loadProductTitle(item.productId));
    });
  }

  loadProductTitle(productId: number) {
    this.productService.getProductById(productId).subscribe(product => {
      this.productTitles[productId] = product.name;
    });
  }

  addCartItem(item: CartItem) {
    this.cartService.addCartItem(item).subscribe(() => {
      this.loadCartItems();
    });
  }

  deleteCartItem(itemId: number) {
    this.cartService.deleteCartItem(itemId).subscribe(() => {
      this.loadCartItems();
    });
  }

  changeQuantity(itemId: number, quantity: number) {
    this.cartService.changeQuantity(itemId, quantity).subscribe(() => {
      this.loadCartItems();
    });
  }

  // Calculate the total price
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
