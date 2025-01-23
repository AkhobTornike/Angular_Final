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
export class ProductDetailComponent implements OnInit{
    product!: Product;
    constructor(
      private productsService: ProductsService,
      private cartService: CartService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      const carId = +this.route.snapshot.paramMap.get('id')!;
      this.productsService.getProductById(carId).subscribe({
        next: (product: Product) => {
          this.product = {
            ...product
          }
        },
        error: (error) => {
          console.error(error);
        }
      })
    }

    addToCart(): void {
      const quantity = 1; // Set the desired quantity
      this.cartService.addToCart('1', {
        id: new Date().getTime(), // Generate a unique ID for the cart item
        productId: this.product.id,
        quantity: quantity,
        price: this.product.price // Include the price property
      }).subscribe({
        next: (item: CartItem) => {
          console.log('Item added to cart', item);
        },
        error: (error) => {
          console.error('Error adding item to cart', error);
        }
      });
    }
}
