import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, description: 'This is a detailed description for Product 1. It includes all the features and benefits of the product.', imageUrl: 'IMG_2448.jpg' },
    { id: 2, name: 'Product 2', price: 200, description: 'This is a detailed description for Product 2. It includes all the features and benefits of the product.', imageUrl: 'IMG_2456.jpg' },
    { id: 3, name: 'Product 3', price: 300, description: 'This is a detailed description for Product 3. It includes all the features and benefits of the product.', imageUrl: 'IMG_2442.jpg' },
    { id: 4, name: 'Product 4', price: 400, description: 'This is a detailed description for Product 4. It includes all the features and benefits of the product.', imageUrl: 'IMG_2448.jpg' },
    { id: 5, name: 'Product 5', price: 500, description: 'This is a detailed description for Product 5. It includes all the features and benefits of the product.', imageUrl: 'IMG_2456.jpg' },
    { id: 6, name: 'Product 6', price: 600, description: 'This is a detailed description for Product 6. It includes all the features and benefits of the product.', imageUrl: 'IMG_2448.jpg' },
    { id: 7, name: 'Product 7', price: 700, description: 'This is a detailed description for Product 7. It includes all the features and benefits of the product.', imageUrl: 'IMG_2461.jpg' },
    { id: 8, name: 'Product 8', price: 800, description: 'This is a detailed description for Product 8. It includes all the features and benefits of the product.', imageUrl: 'IMG_2456.jpg' },
    { id: 9, name: 'Product 9', price: 900, description: 'This is a detailed description for Product 9. It includes all the features and benefits of the product.', imageUrl: 'IMG_2442.jpg' },
    { id: 10, name: 'Product 10', price: 1000, description: 'This is a detailed description for Product 10. It includes all the features and benefits of the product.', imageUrl: 'IMG_2461.jpg' },
  ];

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  getProducts(): Observable<Product[]> {
    return new Observable(observer => {
      observer.next(this.products);
      observer.complete();
    });
  }

  getProductById(id: number): Observable<Product> {
    return new Observable(observer => {
      const product = this.products.find(p => p.id === id);
      observer.next(product);
      observer.complete();
    });
  }

  postProduct(product: Product): Observable<Product> {
    return new Observable(observer => {
      this.products.push(product);
      observer.next(product);
      observer.complete();
    });
  }

  putProduct(id: number, updatedProduct: Product): Observable<Product> {
    return new Observable(observer => {
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
        observer.next(updatedProduct);
      } else {
        observer.error('Product not found');
      }
      observer.complete();
    });
  }

  deleteProduct(id: number): Observable<void> {
    return new Observable(observer => {
      this.products = this.products.filter(p => p.id !== id);
      observer.next();
      observer.complete();
    });
  }
}
