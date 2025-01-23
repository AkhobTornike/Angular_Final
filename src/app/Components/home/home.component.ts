import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../Interfaces/product';
import { ProductsService } from '../../Services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products.map((prod) => {
          return {
            ...prod
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  seeDetails(id: number): void {
    this.router.navigate([`/products/product-details/${id}`]);
  }
}
