import { Component, OnInit } from '@angular/core';
import { Product } from '../../Interfaces/product';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { CartItem } from '../../Interfaces/cart-item';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productsService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addToCart(): void {
    const quantity = 1; // Set the desired quantity
    const cartItem: CartItem = {
      id: new Date().getTime(), // Generate a unique ID for the cart item
      userId: 1, // Assuming a static user ID for simplicity
      productId: this.product.id,
      quantity: quantity,
      price: this.product.price
    };

    this.cartService.addCartItem(cartItem).subscribe({
      next: () => {
        this.router.navigate(['/cart']);
        console.log('Item added to cart', cartItem);
      },
      error: (error) => {
        console.error('Error adding item to cart', error);
      }
    });
  }
}
