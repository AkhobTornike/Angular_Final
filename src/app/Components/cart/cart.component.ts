import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductsService } from '../../Services/products.service';
import { CartItem } from '../../Interfaces/cart-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  isCartOpen = false;
  cartItems: { cartItemId: number, productName: string, productPrice: number, cartItemQuantity: number, imageUrl: string }[] = [];
  userId: string = 'defaultUserId';

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '1';
    this.cartService.getCart(this.userId).subscribe({
      next: (cartItems: CartItem[]) => {
        cartItems.map((item: CartItem) => {
          this.productService.getProductById(item.productId).subscribe({
            next: (product) => {
              this.cartItems.push({
                cartItemId: item.id,
                productName: product.name,
                productPrice: product.price,
                cartItemQuantity: item.quantity,
                imageUrl: product.imageUrl
              });
            },
            error: (error) => {
              console.error(error);
            }
          });
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
    console.log('Cart component initialized', this.cartItems);
    this.showCart();
  }

  showCart(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (cartItems: CartItem[]) => {
        cartItems.map((item: CartItem) => {
          this.productService.getProductById(item.productId).subscribe({
            next: (product) => {
              this.cartItems.push({
                cartItemId: item.id,
                productName: product.name,
                productPrice: product.price,
                cartItemQuantity: item.quantity,
                imageUrl: product.imageUrl
              });
            },
            error: (error) => {
              console.error(error);
            }
          });
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Open the cart
  openCart() {
    this.isCartOpen = true;
  }

  // Close the cart
  closeCart() {
    this.isCartOpen = false;
  }

  removeItem(cartItemId: number) {}

  // Calculate the total price
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.productPrice * item.cartItemQuantity, 0);
  }
}
