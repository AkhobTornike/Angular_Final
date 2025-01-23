import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.isLoggedIn = true;
    }
  }
  
  logout() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  openCart() {
    console.log('Cart opened');
    this.router.navigate(['/cart']);
  }
}
